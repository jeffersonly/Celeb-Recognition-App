import React from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import CommentIcon from '@material-ui/icons/Comment';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from '../../graphql/mutations';
import Typography from '@material-ui/core/Typography';
// import * as queries from '../graphql/queries';

const styles = {
  card: {
    width: 400,
    minHeight: 275,
    margin: 2
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'inherit',
    padding: '10px'
  },
  media: {
    minHeight: 200,
    minWidth: 200
  }
};
class EditComment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            postid: "",
            commentAuthor: "",
            commentContent: "",
            userid: this.props.currentItem.userid
            
        }
    }
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
            open: false,
          })
          var commentDetails = {
            id: this.props.comment.id,
            author: this.state.userid,
            content: this.state.commentContent,
            commentPostId: this.props.currentItem.id
          }
          API.graphql(graphqlOperation(mutations.updateComment, {input: commentDetails}));
          
      }

    
    render(){
      console.log(this.state.userid)
    //   const { classes } = this.props;
    //     const { comments }=this.state;
        return (
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <Button variant="fab" mini color="inherit" aria-label="Add" onClick={this.handleClickOpen}>
        <CommentIcon />
      </Button>
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Comment</DialogTitle>
          <DialogContent>
              <Typography>
                  Author: {this.state.userid}
              </Typography>
           
              <TextField
                style={{marginTop: 10}}
                multiline
                id="beerDescription"
                label="Content"
                type="string"
                rows="4"
                fullWidth
                onChange={this.handleChange('commentContent')}
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Add New Comment
            </Button>
          </DialogActions>
        
        </Dialog>
      </div>
        )
    }
}
export default withStyles(styles)(EditComment);