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
    name: string;
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
            name: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
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
        const user: UserData = {
            data: {
                email: this.state.email,
                password: this.state.password,
            },
            id: 0,
        };
        putUserIfNotInDatabase(user, this.callbackFromUserExistence);
    }

    public callbackFromUserExistence(wasUserAdded: UserData): any {
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
                    <form className={'RegisterForm'} onSubmit={this.handleSubmit}>
                        <FormGroup controlId="email" bsSize="large">
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                autoFocus={true}
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="name" bsSize="large">
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                autoFocus={true}
                                type="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                            />
                        </FormGroup>
                        <Button
                            block={true}
                            bsSize="large"
                            type="submit"
                            onClick={this.props.cancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            block={true}
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                            onClick={this.handleSignUp}
                        >
                            Save
                        </Button>
                    </form>
                </div>
            );

    }

}