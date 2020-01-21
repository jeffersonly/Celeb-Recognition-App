import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardMedia from '@material-ui/core/CardMedia';
import EditIcon from '@material-ui/icons/Edit'; 
import Button from '@material-ui/core/Button';
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from '../../graphql/mutations';

const styles ={
  media: {
    minHeight: 400,
    minWidth: 400,
  },
  icon: {
    color:'white'
  }
};

class EditPost extends Component {
  state = {
    open: false,
    postTitle: '',
    postDescription: '',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = (e) => {
    this.setState({
        open: false
    });
    var postDetails = {
        id: this.props.currentItem.id,
        title: this.state.postTitle,
        description: this.state.postDescription,
    }
    //update dynamodb table
    API.graphql(graphqlOperation(mutations.updatePost, {input: postDetails}))
    .then(() => {
      window.location.reload();
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <Button size='small' color="inherit" aria-label="Edit" onClick={this.handleClickOpen}>
          <EditIcon className={classes.icon}/>
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" style={{backgroundColor: '#343a40', color:'white'}}>Edit Post</DialogTitle>
          <DialogContent>
            <CardMedia
              className={classes.media}
              image = {this.props.currentItem.imageURL}
              title="Contemplative Reptile" 
            />
            <TextField
              style={{marginRight: 10}}
              id="postTitle"
              placeholder={this.props.currentItem.title}
              label="Title"
              type="string"
              onChange={this.handleChange('postTitle')}
            />
            <br/>
            <TextField
              style={{marginTop: 10}}
              multiline
              id="postDescription"
              placeholder={this.props.currentItem.description}
              label="Description"
              type="string"
              rows="4"
              fullWidth
              onChange={this.handleChange('postDescription')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="#343a40">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="#343a40">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(EditPost);