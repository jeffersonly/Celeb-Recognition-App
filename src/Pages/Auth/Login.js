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
            //check to see if user can log in - amplify
            console.log(this.state);
            this.setState(initialState);
        } 
    };

    render() {
        return (
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
                <GoogleLoginButton className="mt-2 btm-3" />
                <FacebookLoginButton className="mt-2 btm-3" />
                <br/>
                <div className="text-center">
                    <a href="/Register">Sign Up</a>
                    <span className="p-3">|</span>
                    <a href="/forgotPassword">Forgot Password</a>
                </div>
            </Form>
        );
    }
}

export default Login;