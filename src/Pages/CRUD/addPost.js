import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { API, graphqlOperation, Storage, Auth } from "aws-amplify";
import * as mutations from '../../graphql/mutations';
import uuid from 'uuid/v4';
import config from "../../aws-exports";
import Input from '@material-ui/core/Input';
import "../Styling/Crud/addPost.css";

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket
} = config

class AddPost extends Component {
state = {
    open: false,
    userid: '',
    postTitle: '',
    postDescription: '',
    fileUrl: '',
    file: '',
    filename: '',

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
  //get the current user
componentDidMount =()=>{
    Auth.currentSession()
    .then(data => {
      let token = data.getIdToken();
      this.setState({
        userid: token.payload["cognito:username"]
      })
    })
  }
handleSubmit = (e) => {
    const { name: filename, type: mimeType}=this.state.file;
    const key = `${uuid()}${filename}`;
    const fileForUpload = {
      bucket,
      key,
      region,
     }
    this.setState({
        open: false
    });
    var postDetails = {
        title: this.state.postTitle,
        description: this.state.postDescription,
        avatar: fileForUpload,
        filename: this.state.filename,
        key,
        userid: this.state.userid
    }
     API.graphql(graphqlOperation(mutations.createPost, {input: postDetails}));
     //save the reference of image in S3
     Storage.put(key,this.state.file, {contentType: this.state.file.type})
     .then(()=>{
       console.log("saved to s3")
       this.setState( {
         fileUrl:'',
         file: '',
         filename:''
       })
     })
     .catch(error => console.log(error))
    //  window.location.reload();
    }
fileHandler =(e)=>{
      const file = e.target.files[0]
      this.setState({
        fileUrl: URL.createObjectURL(file),
        file,
        filename: file.name
      })
    }

render() {
      return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <Button variant="fab" mini color="inherit" aria-label="Add" onClick={this.handleClickOpen} >
        <AddIcon style={{fontSize:'2.3rem', color:'#343a40'}}/>
      </Button>
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle style={{ fontFamily:'serif',
    backgroundColor: '#343a40',
    color:'white'}}> New Post</DialogTitle>
          <DialogContent>
              <TextField
                style={{marginRight: 10}}
                id="beerName"
                label="Title"
                type="string"
                onChange={this.handleChange('postTitle')}
              />
              <br/>
               <Input 
                    style={{marginRight: 10}}
                    id="itemFile"
                    label="File"
                    type="file"
                    onChange={this.fileHandler}
                        />
                <img src={this.state.fileUrl} />
              <TextField
                style={{marginTop: 10}}
                multiline
                id="beerDescription"
                label="Description"
                type="string"
                rows="4"
                fullWidth
                onChange={this.handleChange('postDescription')}
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='#343a40' fontFamily='serif'>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color='#343a40'>
              Add Post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddPost;