import React from 'react';

import { Auth } from 'aws-amplify'

import Predictions from '@aws-amplify/predictions';

function checkUser() {
  Auth.currentAuthenticatedUser()
    .then(user => console.log({ user }))
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

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => Auth.federatedSignIn()}>Sign In</button>
        <button onClick={checkUser}>Check User</button>
        <button onClick={signOut}>Sign Out</button>
        <button onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}>Sign In with Facebook</button>
        <button onClick={() => Auth.federatedSignIn({provider: 'Google'})}>Sign In with Google</button>

        <input type="file" onChange={identifyFile}></input>
      </header>
    </div>
  );
}

export default Home