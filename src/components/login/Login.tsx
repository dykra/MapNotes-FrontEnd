import * as React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../../styles/login/Login.css';
import { ChooseRouterPathComponent } from '../ChooseRouterPathComponent';
import Register from './Register';
import { UserData } from '../../types/api/UserData';
import { checkUserExist } from '../../api/UserApi';
import { isBoolean } from 'util';

interface LoginState {
    email: string;
    password: string;
    logged: boolean;
    signUp: boolean;
}
export default class Login extends React.Component<any, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            logged: false,
            signUp: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.callbackFromUserExistence = this.callbackFromUserExistence.bind(this);
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange( event: any) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit(event: any ) {
        event.preventDefault();
    }

    render() {
        if (this.state.logged) {
            return (
                <ChooseRouterPathComponent/>
            );
        } else if (this.state.signUp) {
            return(
                <Register
                    cancel={() => this.handleSignUp(false)}
                />
            );

        } else {
            return (
                <div>
                    <form className={'loginForm'} onSubmit={this.handleSubmit}>
                        <FormGroup controlId="email" bsSize="large">
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                autoFocus={true}
                                type="email"
                                value={this.state.email}
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
                            className={'buttonLogin'}
                            block={true}
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                            onClick={this.handleLogin}
                        >
                            Login
                        </Button>
                        <Button
                            className={'buttonRegister'}
                            block={true}
                            bsSize="large"
                            type="submit"
                            onClick={() => this.handleSignUp(true)}
                        >
                            SignUp
                        </Button>
                    </form>
                </div>
            );
        }
    }

    handleLogin() {
     if (this.validateForm()) { // not sure is it necessary
        const user: UserData = {
            data: {
                email: this.state.email,
                password: this.state.password,
            },
            id: 0,
        };
        checkUserExist(user, this.callbackFromUserExistence);
     }
    }

    public callbackFromUserExistence(user: UserData): any {
        if (isBoolean(user)) {
            this.setState( {logged: user} );
            if (! user) {
                window.alert('Wrong logging credentials');
            }
        }
    }

    handleSignUp(signUp: boolean) {
        this.setState({signUp});
    }
}