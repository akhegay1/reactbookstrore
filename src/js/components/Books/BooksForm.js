// src/js/components/Form.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { editSelectedBook, removeBook, loadBooks } from "../../../store/actions/booksActions";
import { setCurForm, setIsIns } from "../../../store/actions/actions";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import axios from 'axios';




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
  return { books: state.books, selectedbook: state.selectedbook,
    curForm: state.curForm,
    isIns: state.isIns
  };
};

//1-я ф-ция это тут на форме, а вторая в distpath - это action
const mapDispatchToProps = dispatch => {
  return {
    //addBook1: (isbn, title, author, price, dt_published, id) => dispatch(addBook(isbn, title, author, price, dt_published, id)),
    //editBook: (isbn, title, author, price, dt_published, id) => dispatch(editBook(isbn, title, author, price, dt_published, id)),
    editSelectedBook: (isbn, title, author, price, dt_published, id) => dispatch(editSelectedBook(isbn, title, author, price, dt_published, id)),
    removeBook: (id) => dispatch(removeBook(id)),
    loadBooks: (jsonBooks) => dispatch(loadBooks(jsonBooks)),
    setCurForm: (curForm1) => dispatch(setCurForm(curForm1)),
    setIsIns: (setIsIns1) => dispatch(setIsIns(setIsIns1)),
  };
};



class BooksForm extends Component {
  constructor() {
    super();

    this.state = {
      colortype: '0',
      spacing: '16',
      isbn: '',
      title: ''
    };
    
    
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setCurForm = this.setCurForm.bind(this);
    

    //this.isbnI = React.createRef();
    //this.titleI = React.createRef();
    this.authorI = React.createRef();
    this.priceI = React.createRef();
    this.dt_publishedI = React.createRef();
    this.idI = React.createRef();
  }



  handleClick = (event, isbn, title, author, price, dt_published, id) => {

    event.preventDefault();
    
    this.props.editSelectedBook(isbn, title, author, price, dt_published, id)
    

    this.setState({
      isbn: isbn
    });
    this.setState({
      title: title
    });
    console.log(isbn)
    //this.isbnI.current.value = isbn
    //this.titleI.current.value = title
    //this.authorI.current.value = author
    //this.priceI.current.value = price
    //document.getElementById('dt_publishedId').value = dt_published
    //this.idI.current.value = id
  };


  handleChange = name => event => {
    console.log(name)
    this.setState({
      [name]: event.target.value
    });
  };

  handleChangeReduxAuthor = name => event => {
    console.log('handleChangeRedux '+name)
    this.props.editSelectedBook(this.props.selectedbook.isbn, 
                                this.props.selectedbook.title, 
                                event.target.value, 
                                this.props.selectedbook.price, 
                                this.props.selectedbook.dt_published, 
                                this.props.selectedbook.id)
  };




  createBook(event) {
    this.props.editSelectedBook("", "", "", "", "", "")
    this.setCurForm()
    this.setIsIns()
  }
  
  showEditBookForm(event) {
    this.setCurForm()
    console.log(this.props.isIns.ent)
  }

  setCurForm() {
      this.props.setCurForm("editbook")
      console.log(this.props.curForm)
  }

  setIsIns = name =>  {    
    this.props.setIsIns("book")
}


  clearBook(event) {
    //console.log("AA")
    console.log(document.getElementById('dt_publishedId').value)

    this.props.editSelectedBook("", "", "", "", "", "")
   
  }


  removeBook() {
    
    
    if (this.props.selectedbook.id !== "") {
      
      this.props.removeBook(this.props.selectedbook.id)
      this.props.editSelectedBook("", "", "", "", "", "")
    

    console.log(this.props.selectedbook.id)

    axios.post('http://localhost:3010/books/delete', 
         this.props.selectedbook.id
      ).catch(error => {
        console.log(error.message);
      })

    console.log('aft post')
    //this.loadFromSrv()
  }

  }


  

  loadFromSrv = event => {
    //const proxyurl = "http://cors.io/?";
    console.log('bef axios');
    axios
			.get(
				"http://localhost:3010/books"
			)
			.then((response) => {
        this.props.loadBooks(response.data)
        console.log('aft loadBooks');
			})
			.catch(err => {
				console.log('Error happened during fetching!', err);
      });
        
  }
 



  render() {

    
    //const { classes } = this.props;
    //const { spacing } = this.state;

    return (
      
      <div>
        <div id='frm'>
          <form onSubmit={this.handleSubmit}>
          
            <Button type="button" variant="contained" onClick={event => this.createBook()} className={this.props.classes.button}>
              Create
            </Button>

            <Button type="button" variant="contained" onClick={event => this.removeBook()} className={this.props.classes.button}>
              Remove
            </Button>
            

            <Button type="button" variant="contained" onClick={event => this.loadFromSrv()} className={this.props.classes.button}>
              Load
            </Button>

            <Button type="button" variant="contained" onClick={event => this.showEditBookForm()} className={this.props.classes.button}>
              EditBook
            </Button>
            
          </form>


        </div>

        <div id='tbl'>
          <Paper >
            <Table >
              <TableHead style={{ backgroundColor: 'green' }}>
                <TableRow>
                  <TableCell style={{ color: 'white' }}>isbn</TableCell>
                  <TableCell>title</TableCell>
                  <TableCell>author</TableCell>
                  <TableCell>price</TableCell>
                  <TableCell>dt_published</TableCell>
                  <TableCell>id</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.books.map(n => (
                  <TableRow
                    hover
                    aria-checked={n.id === this.props.selectedbook.id}
                    selected={n.id === this.props.selectedbook.id}
                    onClick={event => this.handleClick(event, n.isbn, n.title, n.author, n.price, n.dt_published, n.id)}
                    key={n.id}>
                    <TableCell component="th" scope="row">
                      {n.isbn}
                    </TableCell>
                    <TableCell>{n.title}</TableCell>
                    <TableCell>{n.author}</TableCell>
                    <TableCell>{n.price}</TableCell>
                    <TableCell>{n.dt_published}</TableCell>
                    <TableCell>{n.id}</TableCell>
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

BooksForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BooksForm));




