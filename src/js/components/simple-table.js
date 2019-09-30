import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import { editSelected, editColor } from "../../store/actions/actions";


const mapStateToProps = state => {
  return { colors: state.colors, selected: state.selected };
};


const mapDispatchToProps = dispatch => {
  return {
    editSelected: (id, title, color, rating, timestamp) => dispatch(editSelected(id, title, color, rating, timestamp))    
  };
};





class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      selected: 0,
      id: "", 
      title: "", 
      color: "", 
      rating: "", 
      timestamp: ""
      }
  }
  

  handleClick = (event, id, title, color, rating, timestamp) => { 
    this.props.editSelected(id, title, color, rating, timestamp)
    //this.props.editColor(id, title, color, rating, timestamp)
  };

  render() {
    return (

      <Paper >
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>title</TableCell>
              <TableCell>color</TableCell>
              <TableCell>rating</TableCell>
              <TableCell>timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.colors.map(n => (
              <TableRow
                hover
                //aria-checked={n.selected>0}
                //selected={n.id===selected}
                onClick={event => this.handleClick(event, n.id, n.title, n.color, n.rating, n.timestamp)}
                key={n.id}>
                <TableCell component="th" scope="row">
                  {n.id}
                </TableCell>
                <TableCell>{n.title}</TableCell>
                <TableCell>{n.color}</TableCell>
                <TableCell>{n.rating}</TableCell>
                <TableCell>{n.timestamp}</TableCell>
              </TableRow>

            ))
            }
          </TableBody>
        </Table>
      </Paper>
    )
  }
};




export default connect(mapStateToProps, mapDispatchToProps)(SimpleTable);

