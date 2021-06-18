import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper, Button, TablePagination } from '@material-ui/core';
import { number, date } from '../../../utils/text';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 750,
  },
  root: {
    width: '100%',
    padding: '50px'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  editButton: {
    '&:hover': {
      backgroundColor: 'rgba(24, 51, 88, 0.9)'
    },
    margin: theme.spacing(1),
    marginRight: 0,
    marginLeft: 0,
    backgroundColor: 'rgb(24, 51, 88)',
    textTransform: 'none',
    minWidth: 75
  },
  hapusButton: {
    '&:hover': {
      backgroundColor: 'rgba(255, 0, 0, 0.9)'
    },
    margin: theme.spacing(1),
    backgroundColor: 'rgb(255, 0, 0)',
    textTransform: 'none',
    minWidth: 75
  }
}));

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: 'green',
    color: '#fff',
    fontWeight: 800,
    fontSize: 14
  }
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'komoditas', numeric: false, label: 'Ikan' },
  { id: 'area_provinsi', numeric: false, label: 'Provinsi' },
  { id: 'area_kota', numeric: false, label: 'Kota' },
  { id: 'size', numeric: false, label: 'Ukuran' },
  { id: 'price', numeric: false, label: 'Harga' },
  { id: 'tgl_parsed', numeric: false, label: 'Tanggal' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
        <StyledTableCell>Aksi</StyledTableCell>
      </TableRow>
    </TableHead>
  )
}

function DataTable({ data, setData }) {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (row) => {
    setData(data.filter(i => i.id !== row.id));
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />
          <TableBody>
            {stableSort(data, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <StyledTableRow key={row.id}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                    >
                      {row.komoditas}
                    </TableCell>
                    <TableCell>{row.area_provinsi}</TableCell>
                    <TableCell>{row.area_kota}</TableCell>
                    <TableCell>{row.size}</TableCell>
                    <TableCell>{number(row.price)}</TableCell>
                    <TableCell>{date(row.tgl_parsed)}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.hapusButton}
                        size="small"
                        onClick={() => handleDelete(row)}
                      >
                        Hapus
                      </Button>
                    </TableCell>
                  </StyledTableRow>
                )
              })}
            {emptyRows > 0 && (
              <TableRow>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Per Halaman"
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default (DataTable);
