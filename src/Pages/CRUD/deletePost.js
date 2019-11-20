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
  console.log("item deleted");
    this.setState({ open: false });
    var postDetails = {
      id: this.props.currentItem.id,
    }
    API.graphql(graphqlOperation(mutations.deletePost, { input: postDetails }))
    // .then(()=> {window.location.reload()})
    Storage.remove(this.props.currentItem.imageURL)
    .then(()=>console.log("image deleted in S3"))
    .catch(error => console.log(error))
  };
render() {
      return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <Button style={{marginLeft: "125px"}}size='small' color="inherit" aria-label="Add" onClick={this.handleClickOpen}>
        <DeleteIcon />
      </Button>
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Are you sure you want to delete Post: {this.props.currentItem.title}?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default DeletePost;