import React from 'react';
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
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import { createBrowserHistory } from 'history';
import otherlistPosts from './Pages/CRUD/otherlistPosts';
import './Pages/Styling/Auth/Bar.css'
const browserHistory = createBrowserHistory();

function App() {
  return (
    <div className="fancy-font">
      <Router history={browserHistory}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="/Confirm" component={Confirm} />
          <Route path="/ForgotPassword" component={ForgotPassword} />
          <Route path="/ChangePassword" component={ChangePassword} />

          <ProtectedRoute path="/Home" component={Home} />
          <ProtectedRoute path="/Search" component={Search} />
          <ProtectedRoute path="/NameSearch" component={NameSearch} />
          <ProtectedRoute path="/MyPosts" component={CrudHome}/>
          <ProtectedRoute path="/Otherposts" component={otherlistPosts}/>

          <Route path="/*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App