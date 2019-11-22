import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckAuth from './Auth';
import Login from './Login';

export default function ProtectedRoute({component: Component, ...rest}) {
    const userStatus = CheckAuth();
    const isLoggedIn = (null !== userStatus);

    return (
        <Route 
            {...rest} 
            render = {props => {
                // if(isLoggedIn) {
                //     return <Component {...props} />;
                // } else {
                //     return <Redirect to={{pathname: "/Login",}} />
                // }
                console.log("props: " + props);
                console.log("check: " + isLoggedIn);
                if(isLoggedIn) {
                    return <Component {...props} /> 
                } else {
                    return <Redirect to={{pathname: "/Login",}} />
                }
               
                
            }}
        />
    );
};