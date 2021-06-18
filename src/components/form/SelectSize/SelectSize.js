import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { getSize } from '../../../fetcher';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SelectSize(props) {
  const [size, setSize] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const size = await getSize();

    setSize(size);
  }

  console.log(size)

  const handleChangeSize = (event) => {
    const value = event.target.value;

    props.handleChangeSize(event);

    setSize(size.filter(i => i.size === value));
  }

  return (
    <Fragment>
      <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Size</InputLabel>
          <Select
            labelId="size"
            id="size"
            label="Size"
            onChange={handleChangeSize}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {size.map((row) => <MenuItem key={row.size} value={row.size}>{row.size}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
    </Fragment>
  );
}

export default SelectSize;
