import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddPost from './addPost';

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
    color: '#343a40',
  },
  appbarstyle: {
    display: 'flex',
    position: 'relative',
    backgroundColor: 'transparent'
  }
});

class CrudNavBar extends Component {
  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appbarstyle}>
          <Toolbar>
            <Typography variant="h6" style={{fontFamily: 'Jomolhari'}} className={classes.grow}>
              My Posts
            </Typography>
            <AddPost />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

CrudNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CrudNavBar);