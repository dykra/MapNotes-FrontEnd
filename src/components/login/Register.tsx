import React from 'react';
import '../../styles/login/Login.css';
// import { gql, graphql } from 'react-apollo';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { putUserIfNotInDatabase } from '../../api/UserApi';
import { UserData } from '../../types/api/UserData';
import { isBoolean } from 'util';

const WRONG_CREDENTIALS_ALERT = 'Wrong logging credentials';
interface RegisterState {
    email: string;
    repPassword: string;
    password: string;

}

interface RegisterProps {
    cancel: () => void;

}
export default class Register extends React.Component<RegisterProps, RegisterState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            repPassword: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.callbackFromUserExistence = this.callbackFromUserExistence.bind(this);
    }

    validateForm() {
        const re = /\S+@\S+/;
        return this.state.email.length > 0
            && this.state.password.length > 0
            && this.state.password === this.state.repPassword
            && re.test(this.state.email);

    }

    handleChange(event: any) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit(event: any) {
        event.preventDefault();
    }

    handleSignUp() {
        const bcrypt = require('bcryptjs');
        const salt = bcrypt.genSaltSync(10);
        const storedPassword = bcrypt.hashSync(this.state.password, salt);
        console.log('password', storedPassword);
        console.log(bcrypt.compareSync(this.state.password, storedPassword));
        const user: UserData = {
            data: {
                email: this.state.email,
                password: storedPassword,
            },
            id: 0,
        };
        putUserIfNotInDatabase(user, this.callbackFromUserExistence);
    }

    public callbackFromUserExistence(wasUserAdded: UserData): any {
        console.log('added', wasUserAdded);
        if (isBoolean(wasUserAdded)) {
            if (wasUserAdded) {

                this.props.cancel();
            } else {
                window.alert(WRONG_CREDENTIALS_ALERT);
            }
        }
    }
    render() {
            return (
                <div>
                    <form role="form" data-toggle="validator" className={'was-validated'} onSubmit={this.handleSubmit}>
                        <FormGroup controlId="email" bsSize="large">
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                required={true}
                                autoFocus={true}
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            <div className="invalid-feedback">Invalid email</div>
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                required={true}
                                minLength={8}
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                            />
                            <div className="invalid-feedback">8 characters minimum</div>
                        </FormGroup>
                        <FormGroup controlId="repPassword" bsSize="large">
                            <ControlLabel>Repeat password</ControlLabel>
                            <FormControl
                                required={true}
                                type="password"
                                pattern={this.state.password}
                                value={this.state.repPassword}
                                onChange={this.handleChange}

                            />
                            <div className="invalid-feedback">Password and Repeat password are different</div>
                        </FormGroup>
                        <Button
                            block={true}
                            bsSize="large"
                            type="submit"
                            className="btn btn-primary"
                            disabled={!this.validateForm()}
                            onClick={this.handleSignUp}
                        >
                            Save
                        </Button>
                        <Button
                            block={true}
                            bsSize="large"
                            type="submit"
                            onClick={this.props.cancel}
                        >
                            Cancel
                        </Button>

                    </form>
                </div>
            );

    }

}