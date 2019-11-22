import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float: 'right',
  },
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
  },
  appbarstyle: {
    display: 'flex',
    position: 'relative',
    backgroundColor: 'transparent'
  }
});

class OtherCrudNavBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appbarstyle}>
          <Toolbar>
            <Typography variant="h6" style={{fontFamily: 'Jomolhari' ,color:"#343a40"}} className={classes.grow}>
              Other Posts
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

OtherCrudNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OtherCrudNavBar);