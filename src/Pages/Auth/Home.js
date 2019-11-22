import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import NavBar from '../../Components/NavBar';
import Previews from '../../Components/DropZone';
import '../Styling/Auth/Home.css';

class Home extends Component {

  //check if user is authenticated/logged in
  // isAuthenticated() {
  //   Auth.currentAuthenticatedUser()
  //   .then(user => console.log(user))
  //   .catch(err => 
  //     //this is bugged -> window href is ran and then alert is prompted upon success
  //     window.location.href = "/Login",
  //   );
  // }

  render() {
    //this.isAuthenticated();
    return (
      <div className="App">
        <NavBar />
        <div className="lowerItem">
          <Previews/>
        </div>
        
      </div>
    )
  }

}

export default Home