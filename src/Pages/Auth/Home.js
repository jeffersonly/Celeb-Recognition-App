import React from 'react';

import { Auth } from 'aws-amplify'

import Predictions from '@aws-amplify/predictions';


function checkUser() {
  Auth.currentAuthenticatedUser()
    .then(user => console.log(user))
    .catch(err => console.log(err));
}

function signOut() {
  Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function Home(props) {
  function identifyFile(event) {
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
  function isAuthenticated() {
    Auth.currentAuthenticatedUser()
    .then(user => console.log(user))
    .catch(err => 
      window.location.href = "/Login",
      window.alert("Please log in to view page")
    );
  }
  {isAuthenticated();}
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={checkUser}>Check User</button>
        <button onClick={signOut}>Sign Out</button>
        <input type="file" onChange={identifyFile}></input>
      </header>
    </div>
  );
}

export default Home