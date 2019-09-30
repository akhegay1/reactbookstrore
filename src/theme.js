import {  createMuiTheme } from '@material-ui/core/styles';
import * as Colors from 'material-ui/colors';
/*
import indigo from 'material-ui/colors/indigo';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';
import yellow from 'material-ui/colors/yellow';
import green from 'material-ui/colors/green';
*/
export default createMuiTheme({

    palette: {
        primary: Colors.green,
        secondary: Colors.indigo, 
        accent1Color: Colors.teal300,

  }, 
  overrides: {
    MuiAppBar: {
        root: {
          color: 'primary',
          '&:hover': {
            backgroundColor: 'orange'
          }
        }
      },
    MuiButton: {
      root: {
        color: 'black',
        backgroundColor: 'purple',
        '&:hover': {
          backgroundColor: 'red'
        }
      }
    },
    MuiInputLabel: {
        root: {
          color: 'blue'
        }
      },
    
  },

  });