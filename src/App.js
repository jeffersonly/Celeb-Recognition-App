// src/App.js

// import useEffect hook
import React, { useEffect } from 'react';

// import Hub
import { Auth, Hub } from 'aws-amplify'

import Predictions from '@aws-amplify/predictions';
import avengerslul from './imgs/avengerslul.jpg';

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

function predictCeleb(file) {
  //console.log(file);
  //console.log(file.target.files);
  //let image = file.target.files;
  //let reader = new FileReader();
  //reader.readAsDataURL(image[0]);
  //reader.onload = (file) => {
   // const formData = {file: file.target.result}
  //}

  Predictions.identify({
    entities: {
      source: {
        file,
      },
    }
  })
  .then(res =>  console.log("celeb info " + res))
  .catch(err => console.log(err));
}

function App(props) {
  useEffect(() => {
    Hub.listen('auth', (data) => {
      const { payload } = data
      console.log('A new auth event has happened: ', data)
       if (payload.event === 'signIn') {
         console.log('a user has signed in!')
       }
       if (payload.event === 'signOut') {
         console.log('a user has signed out!')
       }
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => Auth.federatedSignIn()}>Sign In</button>
        <button onClick={checkUser}>Check User</button>
        <button onClick={signOut}>Sign Out</button>
        <button onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}>Sign In with Facebook</button>
        <button onClick={() => Auth.federatedSignIn({provider: 'Google'})}>Sign In with Google</button>
        <button onClick={predictCeleb}>Predict Image</button>

        <input type="file" onChange={predictCeleb}></input>
      </header>
    </div>
  );
}

export default App