import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { API, graphqlOperation, Storage } from "aws-amplify";
import * as mutations from '../../graphql/mutations';

class DeletePost extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    this.setState({ open: false });
    var postDetails = {
      id: this.props.currentItem.id,
    }
    
    //remove photo from s3
    Storage.remove(this.props.currentItem.imageURL)
    .then(()=>console.log("image deleted in S3"))
    .catch(error => console.log(error))

    //remove photo from dynamodb
    API.graphql(graphqlOperation(mutations.deletePost, { input: postDetails }))
    .then(() => {
      window.location.reload();
    })
  };

  render() {
    return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <Button style={{marginLeft: "125px"}}size='small' color="inherit" aria-label="Add" onClick={this.handleClickOpen}>
          <DeleteIcon style={{color: 'white'}} />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Are you sure you want to delete Post: {this.props.currentItem.title}?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="#343a40">
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="#343a40">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeletePost;