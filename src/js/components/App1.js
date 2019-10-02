import React, { Component } from "react";
import PropTypes from 'prop-types'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from '../../theme';
import Button from '@material-ui/core/Button';
import Loadable from 'react-loadable';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { setCurForm } from "../../store/actions/actions";
//import { SimpleMenu } from "./SimpleMenu/SimpleMenuA";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const mapStateToProps = state => {
    return { curForm: state.curForm
    };
  };
  
  //1-я ф-ция это тут на форме, а вторая в distpath - это action
  const mapDispatchToProps = dispatch => {
    return {
      setCurForm: (curForm1) => dispatch(setCurForm(curForm1)),
    };
  };


 const styles = theme => ({
    root: {
        flexGrow: 1,
      },
      grow: {
        flexGrow: 1,
      },
      button: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: "30px",
        border: 1,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',        
        width: '10%',
      }

  });
  
  function Loading() {
    return <h3>Loading...</h3>;
  }

const LoadableComponentB = Loadable({
    loader: () => import('./Books/BooksForm'),
    loading: Loading,
  });

  const LoadableComponentG = Loadable({
    loader: () => import('./Books/EditBookForm'),
    loading: Loading,
  });
  
  const LoadableComponentC = Loadable({
    loader: () => import('./Colors/ColorsForm'),
    loading: Loading,
  });
  
  const LoadableComponentH = Loadable({
    loader: () => import('./Weather/Weather'),
    loading: Loading,
  });


  
class App1 extends Component {
    constructor() {
        super();

        this.state = {
            curForm: 'books',
            open: false,
        };
        this.setCurForm = this.setCurForm.bind(this);
    }

    state = {
        anchorEl: null,
        open: false,
      };
    
      handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
        this.setState({ open: false });
      };
    
      handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
      };
    

  setCurForm(curForm1) {
    this.props.setCurForm(curForm1)
    this.setState({ anchorEl: null });
    }

   
    

    renderCurForm() {
        if (this.props.curForm.formName === 'books') {
            return (
                <LoadableComponentB />
            )
        }
        else if (this.props.curForm.formName === 'editbook')  {
            return (
                <LoadableComponentG />
            )
        }
        else if (this.props.curForm.formName === 'colors')  {
            return (
                <LoadableComponentC />
            )
        }
        else if (this.props.curForm.formName === 'weather')  {
          return (
              <LoadableComponentH />
          )
        }
    }






    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;

        return (
           
            <MuiThemeProvider theme={theme}>
            <div>





            <div className={classes.root}>
            <AppBar position="static">
                <Toolbar >
                    <Grid
                        justify="flex-end" // Add it here :)
                        container 
                        spacing={0}>
                        
                        

                        <Grid item>
                        <div>
                            <Button
                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                            >
                            Open Menu
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                                PaperProps={{
                                    style: {
                                      padding: 0,
                                      left: '50%',
                                      top: '10%',
                                      transform: 'translateY(20%)',
                                    }}
                                  }
                                
                            >
                            <MenuItem onClick={event => this.setCurForm('books')}>books</MenuItem>
                            <MenuItem onClick={event => this.setCurForm('colors')}>colors</MenuItem>
                            <MenuItem onClick={event => this.setCurForm('weather')}>weather</MenuItem>
                            </Menu>
                        </div>
                        </Grid>


                </Grid>
                </Toolbar>
            </AppBar>
            </div>


                <br />


                <div>
                    {this.renderCurForm()}                    
                </div>

                
                </div >




                </MuiThemeProvider>

            
        )
    }
}


App1.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App1));

