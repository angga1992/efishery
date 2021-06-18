import React from 'react';
import ModalView from '../ModalView';
import logo from '../../../assets/logo.png'
import {
  makeStyles,
  withStyles
} from '@material-ui/core/styles';
import {
  Grid,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  display: {
    display: 'flex',
    background: 'rgba(40, 183, 150, 0.95)',
    width: 'width: 90%;',
    position: 'sticky',
    top: '0',
    zIndex: '9999'
  },
  title: {
    color: 'rgb(24, 51, 88)',
    margin: '20px'
  },
  button: {
    border: '1px solid rgb(24, 51, 88)',
    height: '35%',
    textTransform: 'none',
    textAlign: 'right',
  },
  rightObject: {
    marginRight: '10px',
    marginLeft: 'auto',
  }
}));

const CssTextField = withStyles({
  root: {
    '& MuiFormControl-root': {
      '& .MuiTextField-root': {
          width: '90%'
      }
    },
    '& .MuiGrid-root': {
      padding: '50px',
      background: 'rgba(40, 183, 150, 0.95)'
    },
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'rgb(24, 51, 88)',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgb(24, 51, 88)',
      },
      '&:hover fieldset': {
        borderColor: 'rgb(24, 51, 88)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgb(24, 51, 88)',
      },
    },
    marginTop: '20px',
    width: '90%',
    background: 'white',
    color: 'black'
  },
})(TextField);

const TopBar = (props) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.display}>
      <img style={{height: '85px'}} src={logo} alt="logo"/>
      <Grid style={{width: '100%'}} className={classes.rightObject}>
        <CssTextField
          label="Nama Ikan"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          onChange={props.handleSearch}
        />
        <ModalView {...props} />
      </Grid>
    </Grid>
  )
}

export default TopBar;