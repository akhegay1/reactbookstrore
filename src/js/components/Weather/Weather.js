// src/js/components/Form.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { loadWeather } from "../../../store/actions/actions";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';



import InputLabel from '@material-ui/core/InputLabel';
import TextField from "@material-ui/core/TextField";


//import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
//import theme from '../../../theme';


const API_KEY = "c7d4a970d806d4ed52f085f60d0cfae2"


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

});



const mapStateToProps = state => {
  return { weather: state.weather, 
    curForm: state.curForm,
    isIns: state.isIns
  };
};

//1-я ф-ция это тут на форме, а вторая в distpath - это action
const mapDispatchToProps = dispatch => {
  return {
    loadWeather: (jsonWeather) => dispatch(loadWeather(jsonWeather))    
  };
};



class Weather extends Component {
  constructor() {
    super();

    this.state = {
      colortype: '0',
      spacing: '16',
      title: ''
    };

    this.gettingWeather = this.gettingWeather.bind(this);
  }

  

  timestamp2str = str => {
    let ts = str
    let date = new Date(ts*1000)
    console.log(date)
    
    let rslt_time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    console.log(rslt_time)

    return  rslt_time
  } 
  

  gettingWeather = event => {
    event.preventDefault();
    //const proxyurl = "http://cors.io/?"
    
    const city = event.target.elements.city.value
    console.log(city)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    
    
    
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {          
          this.props.loadWeather(result)
          console.log('result')
          console.log(result) 
          //console.log(this.props.books) 
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            error
          });
        }
      )
    
  }

  renderAnswer() {

    if (this.props.weather.sys) {

      return (
        <div>
      <InputLabel htmlFor="country">country</InputLabel>
      <TextField
        id="country"
        value={this.props.weather.sys.country}
        className={this.props.classes.textfield}              
      /><br/>

      <InputLabel htmlFor="pressure">pressure</InputLabel>
      <TextField
        id="pressure"
        value={this.props.weather.main.pressure}
        className={this.props.classes.textfield}              
      /><br/>

      
      <InputLabel htmlFor="temp">temp</InputLabel>
      <TextField
        id="temp"
        value={this.props.weather.main.temp}
        className={this.props.classes.textfield}              
      /><br/>

      
      <InputLabel htmlFor="sunset">sunset</InputLabel>
      <TextField
        id="sunset"
        value={this.timestamp2str(this.props.weather.sys.sunset)}
        className={this.props.classes.textfield}              
      />
      </div>
      );
      
    }
  }



  render() {

    
    //const { classes } = this.props;
    //const { spacing } = this.state;

    return (
      
      <div>
        <div id='frm'>
          <form onSubmit={this.gettingWeather}>          
            <input type="text" name="city" placeholder="Город"/>
            <br/>
            <button>Получить погоду</button>
            <br/>

            {this.renderAnswer()}
          </form>


        </div>



      </div>

      
    )
  }

}

Weather.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Weather));




