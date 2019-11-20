import React, {useEffect} from 'react';

import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Home from './Pages/Auth/Home';
import Confirm from './Pages/Auth/ConfirmCode';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import ChangePassword from './Pages/Auth/ChangePassword';

import PrivateRoute from './Pages/Auth/PrivateRoute';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom';

import { Auth } from 'aws-amplify';

function App() {
  return (
    <div>
      <Router>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={Register} />
            <Route path="/Confirm" component={Confirm} />
            <Route path="/ForgotPassword" component={ForgotPassword} />
            <Route path="/ChangePassword" component={ChangePassword} />
            <Route path="/Home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App