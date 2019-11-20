import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import pageAuth from './Auth';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route 
            {...rest} 
            render = {props => {
                if(pageAuth.checkAuth()) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to={{pathname: "/Login",}} />
                }
            }}
        />
    );
};