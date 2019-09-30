// src/js/components/Form.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { addColor, editColor, editSelected, removeColor } from "../../../store/actions/colorsActions";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';

import DateAndTimePicker from '../date-time-picker';

import Grid from '@material-ui/core/Grid';




const styles = theme => ({

  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: "30px",
    border: 1,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  input: {
    display: 'none',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});



const mapStateToProps = state => {
  return { colors: state.colors, selected: state.selected, colortypes: state.colortypes };
};


const mapDispatchToProps = dispatch => {
  return {
    addColor1: (title, color, rating, timestamp, colortype) => dispatch(addColor(title, color, rating, timestamp, colortype)),
    editColor333: (id, title, color, rating, timestamp, colortype) => dispatch(editColor(id, title, color, rating, timestamp, colortype)),
    editSelected: (id, title, color, rating, timestamp, colortype) => dispatch(editSelected(id, title, color, rating, timestamp, colortype)),
    removeColor: (id) => dispatch(removeColor(id)),
  };
};



class ColorsForm extends Component {
  constructor() {
    super();

    this.state = {
      colortype: '0',
      spacing: '16',
    };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeColorType = this.handleChangeColorType.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);


    this.idI = React.createRef();
    this.titleI = React.createRef();
    this.colorI = React.createRef();
    this.ratingI = React.createRef();
    this.timestampI = React.createRef();
    this.colortypeI = React.createRef();
  }



  handleClick = (event, id, title, color, rating, timestamp, colortype) => {

    event.preventDefault();
    this.props.editSelected(id, title, color, rating, timestamp, colortype)

    this.idI.current.value = id
    this.titleI.current.value = title
    this.colorI.current.value = color
    this.ratingI.current.value = rating
    //console.log(Date.parse(timestamp));  
    var date2 = new Date(timestamp);
    //console.log(date2.toISOString().substring(0, 16))
    var date3 = date2.toISOString().substring(0, 16)
    //this.timestampI.current.value = date3
    document.getElementById('timestampId').value = date3
    //this.colortypeI.current.value = colortype
    document.getElementById('colortypeId').value = colortype




    //this.props.editColor(id, title, color, rating, timestamp)
  };

  removeColor(event) {

    if (this.props.selected.id !== "") {
      //console.log("SSS "+this.colortypeI.current.value)
      this.idI.current.value = ""
      this.titleI.current.value = ""
      this.colorI.current.value = ""
      this.ratingI.current.value = ""
      document.getElementById('timestampId').value = null
      this.colortypeI.current.value = ""

      this.props.removeColor(this.props.selected.id)
      this.props.editSelected("", "", "", "", "", "")
    }
  }

  addColor1() {
    console.log(document.getElementById('colortypeId').value)
    this.props.addColor(this.titleI.current.value, this.colorI.current.value, this.ratingI.current.value,
      document.getElementById('timestampId').value,
      document.getElementById('colortypeId').value)
    //this.colortypeI.current.value)
    this.idI.current.value = ""
    this.titleI.current.value = ""
    this.colorI.current.value = ""
    this.ratingI.current.value = ""
    document.getElementById('timestampId').value = null
    this.colortypeI.current.value = ""
  }

  clearColor(event) {

    this.idI.current.value = ""
    this.titleI.current.value = ""
    this.colorI.current.value = ""
    this.ratingI.current.value = ""
    document.getElementById('timestampId').value = null
    this.colortypeI.current.value = ""

    this.props.editSelected("", "", "", "", "", "")



  }


  handleSubmit(event) {
    event.preventDefault();
    console.log(document.getElementById('timestampId').value)
    var date2 = new Date(document.getElementById('timestampId').value);
    console.log(date2.toISOString() + ' - ' + date2.getTimezoneOffset() / 60)

    //date.getTimezoneOffset()*60000)

    this.props.selected.id === "" ?
      this.addColor() :
      this.props.editColor333(this.idI.current.value,
        this.titleI.current.value,
        this.colorI.current.value,
        this.ratingI.current.value,
        document.getElementById('timestampId').value,
        document.getElementById('colortypeId').value

      )
  }




  handleChangeColorType = event => {
    this.colortypeI.current.value = event.target.value
    //console.log(this.colortypeI.current.value) 
  };

  handleChangeDate = event => {
    console.log(document.getElementById('timestampId').value)
    //this.timestampI.current.value=event.target.value
  };


  

  render() {

    //console.log(this.props)

    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <div>
        <div id='frm'>
          <form onSubmit={this.handleSubmit}>

            <Grid item xs={12}>
              <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>

                <Grid key={"id"} item>
                  <label htmlFor="id">ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="id"
                    ref={this.idI}
                  />
                </Grid>

                <Grid key={"title"} item>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    ref={this.titleI}
                  />
                </Grid>

                <Grid key={"color"} item>
                  <label htmlFor="color">Color</label>
                  <input
                    type="text"
                    className="form-control"
                    id="color"
                    ref={this.colorI}
                  />
                </Grid>

                <Grid key={"rating"} item>
                  <label htmlFor="rating">rating</label>
                  <input
                    type="text"
                    className="form-control"
                    id="rating"
                    ref={this.ratingI}
                  />
                </Grid>

                <Grid key={"timestampId"} item>
                  <DateAndTimePicker
                    native
                    ref={this.timestampI}
                    id="timestampId"
                  />
                </Grid>

                <Grid key={"colortypeId"} item>
                  <label htmlFor="colortypes">colortypes</label>
                  <Select
                    native
                    ref={this.colortypeI}
                    onChange={this.handleChangeColorType}
                    id="colortypeId"
                  >
                    {this.props.colortypes.map(n => (
                      <option key={n.id} value={n.id}>{n.name}</option>
                    )
                    )
                    }
                  </Select>
                </Grid>

              </Grid>
            </Grid>

            
              <Button type="submit" variant="raised" color="primary">
                Save
            </Button>

              <Button type="button" variant="raised" color="secondary" onClick={event => this.clearColor()}>
                Clear
            </Button>

            <Button type="button" variant="raised" onClick={event => this.removeColor()} className={this.props.classes.button}>
              Remove
            </Button>

          </form>


        </div>

        <div id='tbl'>
          <Paper >
            <Table >
              <TableHead style={{ backgroundColor: 'green' }}>
                <TableRow>
                  <TableCell style={{ color: 'white' }}>id</TableCell>
                  <TableCell>title</TableCell>
                  <TableCell>color</TableCell>
                  <TableCell>rating</TableCell>
                  <TableCell>timestamp</TableCell>
                  <TableCell>colortype</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.colors.map(n => (
                  <TableRow
                    hover
                    aria-checked={n.id === this.props.selected.id}
                    selected={n.id === this.props.selected.id}
                    onClick={event => this.handleClick(event, n.id, n.title, n.color, n.rating, n.timestamp, n.colortype)}
                    key={n.id}>
                    <TableCell component="th" scope="row">
                      {n.id}
                    </TableCell>
                    <TableCell>{n.title}</TableCell>
                    <TableCell>{n.color}</TableCell>
                    <TableCell>{n.rating}</TableCell>
                    <TableCell>{n.timestamp}</TableCell>
                    <TableCell>{n.colortype}</TableCell>
                  </TableRow>

                ))
                }
              </TableBody>
            </Table>
          </Paper>
        </div>

      </div>
    )

    //console.log("KKK"+this.colortypeI.current.value)
    //this.colortypeI.current.value=1
  }

}

ColorsForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ColorsForm));




