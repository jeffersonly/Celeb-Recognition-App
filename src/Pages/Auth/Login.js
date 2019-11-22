import React, { Component } from 'react';

import '../Styling/Auth/Login.css';

import { 
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input 
} from 'reactstrap';

import { 
    GoogleLoginButton, 
    FacebookLoginButton 
} from 'react-social-login-buttons';

import { Auth } from 'aws-amplify';

//set initial state for clearing upon submit
const initialState = {
    username: "",
    password: "",
    usernameError: "",
    passwordError: "",
}

class Login extends Component {
    constructor() {
        super();
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
    }

    //handle text change
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    //check to see if form has errors
    validateForm = () => {
        let usernameError = "";
        let passwordError = "";

        if(!this.state.username) {
            usernameError = "Username can not be empty!";
        }

        if(!this.state.password) {
            passwordError = "Password can not be empty!";
        }

        if(usernameError || passwordError) {
            this.setState({usernameError, passwordError});
            return false;
        }

        return true;
    }

    //actions on submit press
    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validateForm();
        if(isValid) {
            //sign user in
            let usersName = event.target[0].value;
            let usersPassword = event.target[1].value;

            Auth.signIn(usersName, usersPassword)
            .then(res => this.isAuthenticated())
            .catch(err => console.log("error signing in ... ", err));
        } 
    };

    //check if user is authenticated/logged in
    async isAuthenticated() {
        await Auth.currentAuthenticatedUser()
        .then(user => window.location.href = "Home")
        .catch(err => console.log(err));
    }

    render() {
        this.isAuthenticated();
        return (
            <div>
                <Form className="loginForm" onSubmit={this.handleSubmit}>
                    <h2 className="text-center">Celebrity Recognition Application</h2>
                    <FormGroup>
                        <Label>Username</Label>
                        <Input 
                            type="text" 
                            placeholder="Enter Username"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.usernameError}
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input 
                            type="password" 
                            placeholder="Enter Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <div style={{ fontSize: 12, color: "red" }}>
                            {this.state.passwordError}
                        </div>
                    </FormGroup>
                    <br/>
                    <Button className="btn-lg btn-dark btn-block" type="submit">Login</Button>
                </Form>
                <div className="otherFormStuff">
                    <p className="textCenter">Or Sign in with Social Providers...</p>
                    
                    <div class="popup">
                        <span class='popuptext' id='myPopup'>
                          This button is used for logging into the application using Google.
                          <br/><br/>
                          To associate your account for log in, please click the button once initially.
                          <br/><br/>
                          Upon redirect, click the button again to log in.
                        </span>
                        <GoogleLoginButton className="mt-2 btm-3" onClick={() => Auth.federatedSignIn({provider: 'Google'})} />
                    </div>
                    <div class="popup">
                        <span class='popuptext' id='myPopup'>
                          This button is used for logging into the application using Facebook.
                          <br/><br/>
                          To associate your account for log in, please click the button once initially.
                          <br/><br/>
                          Upon redirect, click the button again to log in.
                        </span>
                        <FacebookLoginButton className="mt-2 btm-3" onClick={() => Auth.federatedSignIn({provider: 'Facebook'})} />
                    </div>
                    <br/>
                    <div className="text-center">
                        <a href="/Register">Sign Up</a>
                        <span className="p-3">|</span>
                        <a href="/forgotPassword">Forgot Password</a>
                    </div>
                </div>
            </div>

        );
    }
}

export default Login;