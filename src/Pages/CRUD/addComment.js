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
import { API, graphqlOperation, Auth } from "aws-amplify";
import * as mutations from '../../graphql/mutations';
import Typography from '@material-ui/core/Typography';
// import * as queries from '../graphql/queries';
import EditComment from "./editComment";
import DeleteComment from "./deleteComment";
import ScrollArea from'react-scrollbar';

const styles = {
  card: {
    width: 400,
    minHeight: 275,
    margin: 2
  },
  cardDisplayComment: {
    width: 380,
    height: 200,
    margin: 1
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
class AddComment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            comments: this.props.currentItem.comments.items,
            postid: "",
            commentAuthor: "",
            commentContent: "",
            userid:""
            
        }
    }
    async componentDidMount () {
        let data = await Auth.currentSession();
        console.log(data);
         var token = await data.getIdToken();
         this.setState({
           userid: token.payload["cognito:username"]
         })
         console.log(this.state.userid)
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
            author: this.state.userid,
            content: this.state.commentContent,
            commentPostId: this.props.currentItem.id
          }
       
          API.graphql(graphqlOperation(mutations.createComment, {input: commentDetails}));
      }

    
    render(){
      const { classes } = this.props;
        const { comments }=this.state;
        
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
          <DialogTitle id="form-dialog-title">Add a New Comment</DialogTitle>
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
              Add Comment
            </Button>
          </DialogActions>
    
          </Dialog>
     
                <Grid container className={classes.root} spacing={16}>
                {comments.map((comment) => (
                  console.log(comment),
                  <Grid >
                      <Card className={classes.cardDisplayComment}>
                        <CardContent>
                        
                          <Typography className={classes.title}  gutterBottom>
                            Author: {comment.author}
                          </Typography>
                          <br />
                            <Typography component="p">
                            Content: {comment.content}
                            </Typography>
                        </CardContent>
                        {comment.author == this.state.userid ? (
                          <div>
                              <EditComment currentComment={comment}/>
                              <DeleteComment currentComment={comment} />
                          </div>
                              
                        ): (null)
                        } 
                      </Card> 
                      
                    
                      </Grid>
                        ))}
                </Grid>
     
         
       

      </div>
        )
    }
}
export default withStyles(styles)(AddComment);