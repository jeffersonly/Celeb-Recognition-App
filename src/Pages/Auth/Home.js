import React, { Component } from 'react';
import NavBar from '../../Components/NavBar';
import Previews from '../../Components/DropZone';
import '../Styling/Auth/Home.css';

class Home extends Component {
  render() {
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