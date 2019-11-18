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
    usernameError: "",
}

class ForgotPassword extends Component {
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

        if(!this.state.username) {
            usernameError = "Username can not be empty!";
        }

        if(usernameError) {
            this.setState({usernameError});
            return false;
        }

        return true;
    }

    //actions on submit press
    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validateForm();
        if(isValid) {
            let usersName = event.target[0].value;
            //console.log(usersName);

            //send confirmation code to email for forgot password
            Auth.forgotPassword(usersName)
            .then(data => window.location.href = "ChangePassword")
            .catch(err => console.log(err));

            //this.setState(initialState);
        } 
    };

    render() {
        return (
            <Form className="loginForm" onSubmit={this.handleSubmit}>
                <h2 className="text-center">Forgot Password</h2>
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
                <br/>
                <Button className="btn-lg btn-dark btn-block" type="submit">Confirm</Button>

                <br/>
                <div className="text-center">
                    <span className="p-3">
                        A confirmation code will be sent to the email registered with the 
                        account.
                        <br/> <br/>
                        Click <a href="/ChangePassword">here</a> to update password upon receiving code! :)
                    </span>
                </div>
                <br/>
                <div className="text-center">
                    <span className="p-3">
                        Remembered your password? 
                        <a href="/Login"> Sign In</a> 
                    </span>
                </div>
                <div className="text-center">
                    <span className="p-3">
                        Don't have an account? 
                        <a href="/Register"> Click here</a> 
                    </span>
                </div>
            </Form>
        );
    }
}

export default ForgotPassword;