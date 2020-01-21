import React, { Component } from 'react';
import '../Styling/Auth/Login.css';

export default class NotFound extends Component {
    render() {
        return (
            <div className="NotFoundDiv">
                <h1 className="NotFoundHeaderText">404 Error</h1>
                <h1 className="NotFoundText">Page is not found... probably because it doesn't exist.</h1>
                <h1 className="NotFoundText">Please redirect back to main page and login</h1>
                <h1 className="NotFoundText">Click <a href="/">here</a> to get redirected</h1>
                <h1 className="NotFoundHeaderText">≧◡≦</h1>
            </div>
            
        );
    }
}