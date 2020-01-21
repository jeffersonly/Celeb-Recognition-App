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
    confirmationCode: "",
    usernameError: "",
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
        let usernameError = "";
        let confirmationCodeError = "";

        if(!this.state.username) {
            usernameError = "Username can not be empty!";
        }

        if(!this.state.confirmationCode) {
            confirmationCodeError = "Confirmation Code can not be empty!";
        }

        if(usernameError || confirmationCodeError) {
            this.setState({usernameError, confirmationCodeError});
            return false;
        }

        return true;
    }

    //actions on submit press
    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validateForm();
        if(isValid) {
            //confirm account with confirmation code
            let usersName = event.target[0].value;
            let usersConfirmationCode = event.target[1].value;
            console.log(usersName);
            console.log(usersConfirmationCode);
            
            Auth.confirmSignUp(usersName, usersConfirmationCode)
            .then(res => window.location.href = "Login", alert("Confirming Account"))
            .catch(err => alert((err.message)));
        } 
    };

    render() {
        return (
            <Form className="loginForm" onSubmit={this.handleSubmit}>
                <h2 className="text-center">Confirm Account</h2>
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