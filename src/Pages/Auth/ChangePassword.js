import React, { Component } from 'react';

import '../Styling/Auth/Login.css';

import { 
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input 
} from 'reactstrap';

import { Auth } from 'aws-amplify';

//set initial state for clearing upon submit
const initialState = {
    username: "",
    password: "",
    password2: "",
    confirmationCode: "",
    usernameError: "",
    passwordError: "",
    password2Error: "",
    confirmationcodeError: "",
}

class ChangePassword extends Component {
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
        let confirmationcodeError = "";
        let usernameError = "";
        let passwordError = "";
        let password2Error = "";

        if(!this.state.confirmationCode) {
            confirmationcodeError = "Confirmation Code can not be empty!";
        }

        if(!this.state.username) {
            usernameError = "Username can not be empty!";
        }

        if(!this.state.password) {
            passwordError = "Password can not be empty!";
        }

        if(!this.state.password2) {
            password2Error = "Confirm Password can not be empty!";
        }

        if(this.state.password !== this.state.password2) {
            passwordError = password2Error = "Passwords must match.";
        }

        if(this.state.password.length < 7 || this.state.password2.length < 7 ) {
            passwordError = password2Error = "Password length must be at least 8 characters.";
        }

        if(confirmationcodeError || usernameError || passwordError || password2Error) {
            this.setState({confirmationcodeError, usernameError, passwordError, password2Error});
            return false;
        }

        return true;
    }

    //actions on submit press
    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validateForm();
        if(isValid) {
            //check to see if user can sign up - amplify
            let usersName = event.target[0].value;
            let usersConfirmationCode = event.target[1].value;
            let usersNewPassword = event.target[2].value;
            
            // Change password after receiving confirmation code
            Auth.forgotPasswordSubmit(usersName, usersConfirmationCode, usersNewPassword)
            .then(data => window.location.href = "Login")
            .catch(err => console.log(err));
        } 
    };

    render() {
        return (
            <Form className="loginForm" onSubmit={this.handleSubmit}>
                <h3 className="text-center">Change Password</h3>
                <br/>
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
                    <Label>Confirmation Code</Label>
                    <Input 
                        type="text" 
                        placeholder="Enter Confirmation Code"
                        name="confirmationCode"
                        value={this.state.confirmationCode}
                        onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.confirmationcodeError}
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input 
                        type="password" 
                        placeholder="Enter New Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.passwordError}
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label>Confirm Password</Label>
                    <Input 
                        type="password" 
                        placeholder="Confirm New Password"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.password2Error}
                    </div>
                </FormGroup>
                <br/>
                <Button className="btn-lg btn-dark btn-block" type="submit">Change</Button>

                <br/>
                <div className="text-center">
                    <span className="p-3">
                        Need confirmation code?
                        <a href="/ForgotPassword"> Click Here</a> 
                    </span>
                </div>
                <div className="text-center">
                    <span className="p-3">
                        Don't need to reset password?
                        <a href="/Login"> Sign In</a> 
                    </span>
                </div>
                <div className="text-center">
                    <span className="p-3">
                        Don't have an account? 
                        <a href="/Register"> Register here</a> 
                    </span>
                </div>
            </Form>
        );
    }
}

export default ChangePassword;