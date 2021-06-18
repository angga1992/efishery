import React, { Component } from "react";
import moment from "moment";
import {
  Grid,
  TextField,
  Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  Save,
  Cancel
} from '@material-ui/icons';
import SelectArea from '../SelectArea';
import SelectSize from '../SelectSize';
import { v4 as uuidv4 } from 'uuid';

const styles = () => ({
  modal: {
    width: 300
  },
  save: {
    '&:hover': {
      backgroundColor: 'rgba(24, 51, 88, 0.9)'
    },
    marginRight: '10px',
    backgroundColor: 'rgb(24, 51, 88)',
    textTransform: 'none'
  },
  cancel: {
    '&:hover': {
      backgroundColor: 'rgba(255, 0, 0, 0.9)'
    },
    backgroundColor: 'rgb(255, 0, 0)',
    textTransform: 'none'
  }
});

class FormAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      komoditas: '',
      size: '',
      price: '',
      province: '',
      city: ''
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    let localTime = moment().format('YYYY-MM-DD');
    let parsedDate = localTime + "T00:00:00.000Z";

    const {
      komoditas,
      province,
      city,
      size,
      price,
    } = this.state;

    if (!komoditas || !province || !city || !size || !price) {
      alert('Isi form yang lengkap');
      return false;
    }

    const data = {
      id: uuidv4(),
      komoditas: komoditas,
      area_provinsi: province,
      area_kota: city,
      size: size,
      price: price,
      tgl_parsed: parsedDate,
      timestamp: moment().unix(),
      isEdit: false
    };

    this.props.setData([...this.props.data, { ...data }]);
    this.props.handleClose();
  };

  handleChangeKomoditas = (e) => this.setState({ komoditas: e.target.value });
  handleChangeProvince = (e) => this.setState({ province: e.target.value });
  handleChangeCity = (e) => this.setState({ city: e.target.value });
  handleChangePrice = (e) => this.setState({ price: e.target.value });
  handleChangeSize = (e) => this.setState({ size: e.target.value });

  render() {
    const { classes, handleClose } = this.props;

    const propsArea = {
      handleChangeCity: this.handleChangeCity,
      handleChangeProvince: this.handleChangeProvince
    }

    const propsSize = {
      handleChangeSize: this.handleChangeSize
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit} noValidate>
          <Grid className={classes.modal} container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={this.state.komoditas}
                onChange={this.handleChangeKomoditas}
                id="komoditas"
                label="Ikan"
                fullWidth
              />
            </Grid>
            <SelectArea {...propsArea} />
            <SelectSize {...propsSize} />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={this.state.price}
                onChange={this.handleChangePrice}
                id="price"
                label="Harga"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{background: 'green', color:'white'}}
                className={classes.save}
                type="submit"
                variant="contained"
                startIcon={<Save />}
              >
                Simpan
              </Button>
              <Button
                className={classes.cancel}
                type="button"
                variant="contained"
                color="secondary"
                startIcon={<Cancel />}
                onClick={handleClose}
              >
                Kembali
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(FormAdd);
