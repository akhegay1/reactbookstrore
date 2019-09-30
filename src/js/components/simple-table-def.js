import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
const mapStateToProps = state => {
  return { colors: state.colors, selected: state.selected };
};



const handleClick = (event, id) => {
  console.log(event);
  //this.setState({ selected: id });
};



const SimpleTable  = ({ colors }) => ( 
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
          {colors.map(n => (
              <TableRow 
              hover
              //aria-checked={n.selected>0}
              //selected={n.id===selected}
              onClick={event => handleClick(event, n.id)}
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
  );



const STable = connect(mapStateToProps)(SimpleTable);
export default STable;
