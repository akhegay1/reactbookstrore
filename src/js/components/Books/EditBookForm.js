// src/js/components/Form.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { editSelectedBook, loadBooks } from "../../../store/actions/booksActions";
import { setCurForm, setIsIns } from "../../../store/actions/actions";


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


import InputLabel from '@material-ui/core/InputLabel';
import TextField from "@material-ui/core/TextField";

import Grid from '@material-ui/core/Grid';
import axios from 'axios';

//import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
//import theme from '../../../theme';





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
  editbook: {
    width: 500, 
  },
});



const mapStateToProps = state => {
  return { books: state.books, selectedbook: state.selectedbook,
    curForm: state.curForm,
    isIns: state.isIns
  };
};

//1-я ф-ция это тут на форме, а вторая в distpath - это action
const mapDispatchToProps = dispatch => {
  return {
    editSelectedBook: (isbn, title, author, price, dt_published, id) => dispatch(editSelectedBook(isbn, title, author, price, dt_published, id)),
    loadBooks: (jsonBooks) => dispatch(loadBooks(jsonBooks)),
    setCurForm: (curForm1) => dispatch(setCurForm(curForm1)),
    setIsIns: (setIsIns1) => dispatch(setIsIns(setIsIns1)),
  };
};



class EditBookForm extends Component {
  constructor() {
    super();

    this.state = {
      colortype: '0',
      spacing: '16',
      isbn: '',
      title: ''
    };
    
    

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCurForm = this.setCurForm.bind(this);

    this.handleChange = this.handleChange.bind(this);

    
    

    //this.isbnI = React.createRef();
    //this.titleI = React.createRef();
    this.authorI = React.createRef();
    this.priceI = React.createRef();
    this.dt_publishedI = React.createRef();
    this.idI = React.createRef();
  }



  

  handleChange = name => event => {
    console.log('handleChangeRedux '+name)
    this.props.editSelectedBook(name==='isbn' ? event.target.value : this.props.selectedbook.isbn, 
                                name==='title' ? event.target.value : this.props.selectedbook.title, 
                                name==='author' ? event.target.value : this.props.selectedbook.author, 
                                name==='price' ? event.target.value : this.props.selectedbook.price, 
                                name==='dt_published' ? event.target.value : this.props.selectedbook.dt_published, 
                                name==='id' ? event.target.value : this.props.selectedbook.id 
                                )
  };

  
  cancel (name)  {
    this.setCurForm("books")
    this.setIsIns("")
}
  

  setCurForm = name =>  {
      console.log(this.props.curForm)
      this.props.setCurForm(name)
  }

  setIsIns = name =>  {
    this.props.setIsIns(name)
}

  addBook1(data) {
    console.log("addBook1")

    axios.post('https://gobookstoretest.herokuapp.com/books/create', 
         data
      ).catch(error => {
        console.log(error.message);
      })

    console.log('aft post')

    this.loadFromSrv()
 
  }


  editBook(data) {
    
    console.log(this.props.selectedbook.id)

    axios.post('https://gobookstoretest.herokuapp.com/books/update', 
         data
      ).catch(error => {
        console.log(error.message);
      })

    console.log('aft post')
    
    this.loadFromSrv()

  }



  handleSubmit(event) {
    event.preventDefault();
    
    let data = JSON.stringify({
      isbn: this.props.selectedbook.isbn,
      title: this.props.selectedbook.title,
      author: this.props.selectedbook.author,
      price: this.props.selectedbook.price,
      dt_published: this.props.selectedbook.dt_published,
      id: this.props.selectedbook.id
    })
    
    console.log(this.props.isIns.ent)
    
    this.props.isIns.ent === "book" ?
      this.addBook1(data) :
      this.editBook(data)

      this.setCurForm("books")
      this.setIsIns("")
      

  }


  

  loadFromSrv = event => {
    //const proxyurl = "http://cors.io/?";

    axios
    .get(
      "https://gobookstoretest.herokuapp.com/books"
    )
    .then((response) => {
      this.props.loadBooks(response.data)
    })
    .catch(err => {
      console.log('Error happened during fetching!', err);
    });
    
    
  }

 



  render() {

    
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      
      <div>
        <div id='frm'>
          <form onSubmit={this.handleSubmit}>
          
          <Grid container justify="center">
              <Grid container className={classes.editbook} spacing={Number(spacing)}>
                
                <Grid key={"isbnl"} xs={12} sm={6} item>
                  <InputLabel htmlFor="isbn">isbn</InputLabel>
                </Grid>
                <Grid key={"isbne"} xs={12} sm={6} item>
                  <TextField
                    id="isbn"
                    value={this.props.selectedbook.isbn}
                    onChange={this.handleChange("isbn")}
                    //ref={this.isbnI}
                  />
                </Grid>

                <Grid key={"titlel"} xs={12} sm={6} item>
                  <InputLabel htmlFor="title">Title</InputLabel>
                </Grid>
                <Grid key={"titlee"} xs={12} sm={6} item>
                  <TextField
                    type="text"
                    id="title"
                    value={this.props.selectedbook.title}
                    onChange={this.handleChange("title")}
                  />
                </Grid>

                <Grid key={"authorl"} xs={12} sm={6} item>
                  <InputLabel htmlFor="author">Author</InputLabel>
                </Grid>
                <Grid key={"authore"} xs={12} sm={6} item>
                  <TextField
                    type="text"
                    id="author"
                    onChange={this.handleChange("author")}
                    value={this.props.selectedbook.author}
                    //ref={this.authorI}
                  />
                </Grid>

                <Grid key={"pricel"} xs={12} sm={6} item>
                  <InputLabel htmlFor="price">price</InputLabel>
                </Grid>
                <Grid key={"pricee"} xs={12} sm={6} item>
                <TextField
                    type="text"
                    id="price"
                    onChange={this.handleChange("price")}
                    value={this.props.selectedbook.price}
                    //ref={this.authorI}
                  />
                </Grid>

                <Grid key={"dt_publishedl"} xs={12} sm={6} item>
                <InputLabel htmlFor="dt_publishedId">dt_published</InputLabel>
                </Grid>
                <Grid key={"dt_publishede"} xs={12} sm={6} item>
                <TextField
                  label=""
                  type="date"
                  id="dt_publishedId"
                  onChange={this.handleChange("dt_published")}
                  value={this.props.selectedbook.dt_published}
                />
                </Grid>

                <Grid key={"idl"} xs={12} sm={6} item>
                  <InputLabel htmlFor="id">id</InputLabel>
                </Grid>
                <Grid key={"ide"} xs={12} sm={6} item>
                <TextField
                    type="text"
                    id="id"
                    onChange={this.handleChange("id")}
                    value={this.props.selectedbook.id}
                    //ref={this.authorI}
                  />
                </Grid>

                </Grid>
                </Grid>

            <br/><br/>
           
            

            <Grid container justify="center">

            <Button type="submit" variant="contained" className={this.props.classes.button}>
              Save
            </Button>
            
           

            <Button type="button" variant="contained" onClick={event => this.cancel("books")} className={this.props.classes.button}>
              Cancel
            </Button>
            </Grid>
            
          </form>


        </div>



      </div>

      
    )
    
    
    //console.log("KKK"+this.colortypeI.current.value)
    //this.colortypeI.current.value=1
  }

}

EditBookForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditBookForm));




