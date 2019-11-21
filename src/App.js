import React, {useEffect} from 'react';

import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Home from './Pages/Auth/Home';
import Confirm from './Pages/Auth/ConfirmCode';
import Search from './Pages/Search/Search';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import ChangePassword from './Pages/Auth/ChangePassword';
import NotFound from './Pages/Auth/NotFound';
import ProtectedRoute from './Pages/Auth/ProtectedRoute';
import CrudHome from './Pages/CRUD/crudHome'
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
import otherlistPosts from './Pages/CRUD/otherlistPosts';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Login" component={Login} />
          <Route path="/Home" component={Home} />
          <Route path="/Register" component={Register} />
          <Route path="/Confirm" component={Confirm} />
          <Route path="/ForgotPassword" component={ForgotPassword} />
          <Route path="/ChangePassword" component={ChangePassword} />
          <Route path="/Search" component={Search} />
          <Route path="/MyPosts" exact component={CrudHome}/>
          <Route path="/Otherposts" exact component={otherlistPosts}/>
          <Route path="/*" component={NotFound} />
          <Route path="/MyPosts" component={CrudHome}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App