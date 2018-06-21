import * as React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../../styles/login/Login.css';
import { ChooseRouterPathComponent } from '../ChooseRouterPathComponent';
import Register from './Register';
import { UserData } from '../../types/api/UserData';
import { getAllUsers } from '../../api/UserApi';

const WRONG_CREDENTIALS_ALERT = 'Wrong logging credentials';

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
        getAllUsers(this.callbackFromUserExistence);
    }

    public callbackFromUserExistence(user: UserData[]): any {

        let logged = false;
        const bcrypt = require('bcryptjs');
        user.forEach((value) => {
            if (value.data.email === this.state.email && bcrypt.compareSync(this.state.password, value.data.password)) {
                logged = true;
                return;
            }
        });
        if (!logged) {
            window.alert(WRONG_CREDENTIALS_ALERT);
        }
        this.setState({logged});
    }

    handleSignUp(signUp: boolean) {
        this.setState({signUp, email: '', password: ''});
    }
}