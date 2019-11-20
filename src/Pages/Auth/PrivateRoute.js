import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { Auth } from 'aws-amplify';

export default function PrivateRoute({ component: Component, authenticated, ...params }) {

    const [authenticatedUser, setAuthenticated] = useState(false);

    async function isAuthenticated() {
        await Auth.currentAuthenticatedUser()
        .then(user => {
        setAuthenticated(true);
        })
        .catch(err => {
        setAuthenticated(true);
        });
    }

    return(
        <Route
            {...params}
            render={props =>
                authenticatedUser 
                ? ( <Component {...props} /> ) 
                : ( <Redirect to="/Login" /> )
            }
        />
    )
}