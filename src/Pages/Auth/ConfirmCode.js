import React, { Component } from 'react';

import '../Styling/Auth/Login.css';

import { 
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input 
} from 'reactstrap';

//set initial state for clearing upon submit
const initialState = {
    email: "",
    confirmationCode: "",
    emailError: "",
    confirmationCodeError: "",
}

class Confirm extends Component {
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
        let emailError = "";
        let confirmationCodeError = "";

        if(!this.state.email) {
            emailError = "Email can not be empty!";
        }
        else if(!this.state.email.includes("@")) {
            emailError = "Please enter a valid email!";
        }

        if(!this.state.confirmationCode) {
            confirmationCodeError = "Confirmation Code can not be empty!";
        }

        if(emailError || confirmationCodeError) {
            this.setState({emailError, confirmationCodeError});
            return false;
        }

        return true;
    }

    //actions on submit press
    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validateForm();
        if(isValid) {
            //check to see if user confirm code- amplify
            console.log(this.state);
            this.setState(initialState);
        } 
    };

    render() {
        return (
            <Form className="loginForm" onSubmit={this.handleSubmit}>
                <h2 className="text-center">Confirm Account</h2>
                <FormGroup>
                    <Label>Email</Label>
                    <Input 
                        type="email" 
                        placeholder="Enter Email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.emailError}
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
                        {this.state.confirmationCodeError}
                    </div>
                </FormGroup>
                <br/>
                <Button className="btn-lg btn-dark btn-block" type="submit">Confirm</Button>

                <br/>
                <div className="text-center">
                    <a href="/Login">Sign In</a>
                    <span className="p-3">|</span>
                    <a href="/Register">Sign Up</a>
                </div>
            </Form>
        );
    }
}

export default Confirm;