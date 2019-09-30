import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});


function DateAndTimePickers(props) {
  const { classes } = props;
  const { id } = props;
  

  return (
      <TextField
        label="Timestamp"
        type="datetime-local"
        //defaultValue="2010-01-01T00:00:00"
        id={id}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
  );
}

DateAndTimePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DateAndTimePickers);
