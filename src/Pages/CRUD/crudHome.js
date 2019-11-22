import React, { Component } from 'react';
import CrudNavBar from './crudNavBar';
import ListPosts from './listPosts';
import {Auth } from 'aws-amplify';
import NavBar from '../../Components/NavBar';

class crudHome extends Component {
  state ={
    userid:""
  }
  componentDidMount =()=>{
    Auth.currentSession()
    .then(data => {
      let token = data.getIdToken();
      this.setState({
        userid: token.payload["cognito:username"]
      })
    })
  }
  render() {
    return (
        <div>
                 <NavBar />
                 <CrudNavBar />
                 <div>
                 <ListPosts />
                 </div>
                
        </div>
     
    );
  }
}
export default crudHome;