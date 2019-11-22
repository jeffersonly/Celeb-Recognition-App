import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { API, graphqlOperation, Storage } from "aws-amplify";
import * as mutations from '../../graphql/mutations';
class DeleteComment extends Component {
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
    var commentDetails = {
      id: this.props.currentComment.id,
    }
    API.graphql(graphqlOperation(mutations.deleteComment, { input: commentDetails }));
    // .then(()=> {window.location.reload()});
  };
render() {
      return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <Button style={{marginLeft: "125px"}}size='small' color="inherit" aria-label="Add" onClick={this.handleClickOpen}>
        <DeleteIcon style={{color:'white'}} />
      </Button>
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Are you sure you want to delete this comment?</DialogTitle>
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
export default DeleteComment;