import React, { Component } from 'react';

import { Auth } from 'aws-amplify';

import Dropzone from 'react-dropzone';

import Predictions from '@aws-amplify/predictions';

import NavBar from '../../Components/NavBar';
import Previews from '../../Components/DropZone';

class Home extends Component {

  checkUser() {
    Auth.currentAuthenticatedUser()
      .then(user => console.log(user))
      .catch(err => console.log(err));
  }

  signOut() {
    Auth.signOut()
      .then(data => console.log(data), window.location.href = "/Login")
      .catch(err => console.log(err));
  }

  identifyFile(event) {
    const { target: {files}} = event;
    const [file,] = files || [];

    if(!file) {
      return;
    }
    Predictions.identify({
      entities: {
        source: {
          file,
        },
        celebrityDetection: true
      }
    })
    .then(res =>  console.log("entities: " + JSON.stringify(res.entities)))
    .catch(err => console.log(err));
  }

  //check if user is authenticated/logged in
  isAuthenticated() {
    Auth.currentAuthenticatedUser()
    .then(user => console.log(user))
    .catch(err => 
      //this is bugged -> window href is ran and then alert is prompted upon success
      window.location.href = "/Login",
    );
  }

  render() {
    this.isAuthenticated();
    return (
      <div className="App">
        <NavBar />
        <header className="App-header">
          <button onClick={this.checkUser}>Check User</button>
          <button onClick={this.signOut}>Sign Out</button>
          <input type="file" onChange={this.identifyFile}></input>
        </header>
        <Previews />
      </div>
    )
  }

}

export default Home