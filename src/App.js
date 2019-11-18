import React from 'react';

import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Home from './Pages/Auth/Home';
import Confirm from './Pages/Auth/ConfirmCode';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/Login" exact component={Login} />
          <Route path="/Home" component={Home} />
          <Route path="/Register" component={Register} />
          <Route path="/Confirm" component={Confirm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App