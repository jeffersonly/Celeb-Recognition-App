import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Pages/Auth/Login';
import * as serviceWorker from './serviceWorker';

//import bootstrap css
import 'bootstrap/dist/css/bootstrap.css';

//import amplify stuff 
import Amplify, { Auth } from 'aws-amplify'
import config from './aws-exports'
import Predictions, { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';

//split config oauth links so that they can be read properly for redirects
var urlsIn = config.oauth.redirectSignIn.split(",");
var urlsOut = config.oauth.redirectSignOut.split(",");

const oauth = {
    domain: config.oauth.domain,
    scope: config.oauth.scope,
    redirectSignIn: config.oauth.redirectSignIn,
    redirectSignOut: config.oauth.redirectSignOut,
    responseType: config.oauth.responseType
};

//check if user is on local host or on deployed website
var hasLocalhost  = (hostname) => Boolean(hostname.match(/localhost/) || hostname.match(/127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/));
var hasHostname   = (hostname) => Boolean(hostname.includes(window.location.hostname));
var isLocalhost   = hasLocalhost(window.location.hostname);

if (isLocalhost) {
    urlsIn.forEach((e) =>   { if (hasLocalhost(e)) { oauth.redirectSignIn = e; }});
    urlsOut.forEach((e) =>  { if (hasLocalhost(e)) { oauth.redirectSignOut = e; }});
}
else {
    urlsIn.forEach((e) =>   { if (hasHostname(e)) { oauth.redirectSignIn = e; }});
    urlsOut.forEach((e) =>  { if (hasHostname(e)) { oauth.redirectSignOut = e; }});
}

var configUpdate = config;
configUpdate.oauth = oauth;
Amplify.configure(configUpdate);
Amplify.addPluggable(new AmazonAIPredictionsProvider());
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
