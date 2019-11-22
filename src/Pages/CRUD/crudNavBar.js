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
 },
 appbarstyle: {
  display: 'flex',
  position: 'relative',
  backgroundColor: 'darkgray'
 }
});

class CrudNavBar extends Component {
render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appbarstyle}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              My Posts
            </Typography>
            <AddPost />
            {/* <AddItem /> */}
            {/* <Button onClick={signOut}>Log Out</Button> */}
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