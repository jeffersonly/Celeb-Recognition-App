import React, { useState, useEffect} from 'react';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Home from './Pages/Auth/Home';
import Confirm from './Pages/Auth/ConfirmCode';
import Search from './Pages/Search/Search';
import NameSearch from './Pages/Search/NameSearch';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import ChangePassword from './Pages/Auth/ChangePassword';
import NotFound from './Pages/Auth/NotFound';
import CrudHome from './Pages/CRUD/crudHome';
import ProtectedRoute from './Pages/Auth/ProtectedRoute';
import UnauthenticatedRoute from './Pages/Auth/UnauthenticatedRoute';
import AuthenticatedRoute from './Pages/Auth/AuthenticatedRoute';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import { createBrowserHistory } from 'history';
import OtherlistPosts from './Pages/CRUD/otherlistPosts';
import './Pages/Styling/Auth/Bar.css'
const browserHistory = createBrowserHistory();

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }
  return (
    !isAuthenticating &&
    <div className="fancy-font">
      <Router history={browserHistory}>
        <Switch>
          <Route path="/" exact component={Login} />
          <UnauthenticatedRoute path="/login" exact component={Login}  appProps={{ isAuthenticated, userHasAuthenticated }} />
          <UnauthenticatedRoute path="/register" exact component={Register}  appProps={{ isAuthenticated, userHasAuthenticated }} />
          <UnauthenticatedRoute path="/confirm" exact component={Confirm}  appProps={{ isAuthenticated, userHasAuthenticated }} />
          <UnauthenticatedRoute path="/forgotPassword" exact component={ForgotPassword}  appProps={{ isAuthenticated, userHasAuthenticated }} />
          <UnauthenticatedRoute path="/changePassowrd" exact ccomponent={ChangePassword}  appProps={{ isAuthenticated, userHasAuthenticated }} />

          <AuthenticatedRoute path="/home" exact component={Home} appProps={{ isAuthenticated, userHasAuthenticated }} />
          <AuthenticatedRoute path="/search" exact component={Search} appProps={{ isAuthenticated, userHasAuthenticated }} />
          <AuthenticatedRoute path="/namesearch" exact component={NameSearch} appProps={{ isAuthenticated, userHasAuthenticated }} />
          <AuthenticatedRoute path="/myposts" exact component={CrudHome} appProps={{ isAuthenticated, userHasAuthenticated }} />
          <AuthenticatedRoute path="/Otherposts" exact component={OtherlistPosts} appProps={{ isAuthenticated, userHasAuthenticated }} />

          <Route path="/*" component={NotFound} />
        </Switch>
      </Router>
    </div>
    
  );
}

export default App