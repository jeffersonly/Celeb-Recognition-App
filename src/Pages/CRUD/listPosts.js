import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { API, graphqlOperation, Storage, Auth }  from "aws-amplify";
import * as queries from '../../graphql/queries';
import EditPost from './editPost';
import DeletePost from './deletePost';
import CommentForm from './addComment';

const styles = {
  card: {
    width: 400,
    minHeight: 275,
    margin: 2,
    boxShadow: '2px 2px 10px #343a40',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
    color: "primary",
    fontWeight:'bold'
  },
  description: {
    fontSize: 18,
    color: "primary",
    fontWeight:'italic'
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'inherit',
    padding: '10px',
  },
  media: {
    minHeight: 300,
    minWidth: 350,

  },
  CardActionsStyle:{
    display: 'flex',
    padding: '8px',
    alignItems: 'center',
    backgroundColor: '#343a40',
  }
};

class ListPosts extends Component {
  state = {
    open: false,
    posts: [],
    comments: [],
    userid: '',
    fileUrl: [],
    key: ''
  }

  handleClose=()=> {
    this.setState({ open: false})
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  //on component mount, get current user
  async componentDidMount () {
    let data = await Auth.currentSession();
    var token = await data.getIdToken();
    this.setState({
      userid: token.payload["cognito:username"]
    })
    
    ///get the query list of posts
    API.graphql(graphqlOperation(queries.listPosts ,{
      filter: {
          userid: {
              eq: this.state.userid
              //eq: this.state.userID
          }
      }
    }))
    .then(data => {
      //get each post with key image
      for (let i = 0; i< data.data.listPosts.items.length; i++){
        Storage.get(data.data.listPosts.items[i].key)
        .then(data => {
          let posts = this.state.posts
          posts[i].imageURL = data
          this.setState({
            posts
          })
        })
        .catch(error =>console.log(error))
      }
      this.setState({posts: data.data.listPosts.items})
    })
    .catch(error =>console.log(error))  
  }
   
  render() {
    const { classes } = this.props;
    const { posts } = this.state;
    return (
      <div>
        <Grid container className={classes.root} spacing={16}>
          {posts.map((post, index) => (
            <Grid key={post.id} post spacing={10} >
              <Card className={classes.card}>
                <CardContent>
                  <CardMedia
                    className={classes.media}
                    image = {post.imageURL}
                    title="image" 
                  />
                  <Typography className={classes.title} >
                    Title: {post.title}
                  </Typography>
                  <Typography component="p" className={classes.description}>
                    Description: {post.description}
                  </Typography>
                </CardContent>
                <CardActions className={classes.CardActionsStyle}>
                  <CommentForm currentItem={post}/> 
                  <EditPost currentItem ={post} />
                  <DeletePost currentItem={post} /> 
                </CardActions>                    
              </Card>                
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

ListPosts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListPosts);