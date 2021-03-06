import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from '../common/axios';
import loginImg from "./closing-image.png";
import './style.css';
import Cookies from 'js-cookie';

// show the login page of stadard employee and administrator
export class Login extends Component {
    // Constructor method
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:'',
            success:''
        }
        this.changeEmail = this.changeEmail.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    //change the state
    changeEmail(event){
        this.setState({
            email:event.target.value
        })
    }
    changePassword(event){
        this.setState({
            password:event.target.value
        })
    }

    // action when submit
    onSubmit(event){
        event.preventDefault()
        const loged = {
            email: this.state.email,
            password: this.state.password
        }
        //send 'post' request
        axios.post('/user/login', loged)
        .then(function (response) {
            let token = response.data.token;
            Cookies.set("SavedToken", 'Bearer ' + token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            //judge the data to jump interface
            if (response.data.redirect === '/search') {
                window.location = "/search"
            } else if (response.data.redirect === '/login'){
                window.location = "/login"
            }
        })
        // if the error occurs, jump to login page
        .catch(() => {
            this.setState({
                success: false
            });
        });
        this.setState({
            password:''
        })
    }

    render() {
        const LoginSuccess = this.state.success;

        let button = null;
        if(LoginSuccess === false){
            button = <div class="alert">
                        Invalid username or password. Please try again!
                    </div>;
        }
        else{
            button = <div class="empty">
            </div>;;
        }

        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="content">
                {button}
                <div className="header">Employee Login</div>
                <div className="image">
                    < img src={loginImg} alt="employee login"/>
                </div>
                <div className="form">
                    <div className="form-group">
                    <form onSubmit={this.onSubmit}>
                        <label htmlFor="email">Username</label>
                        <input type='text'
                        onChange={this.changeEmail}
                        value={this.state.email}
                        />
                        <label htmlFor="password">Password</label>
                        <input type='password'
                        onChange={this.changePassword}
                        value={this.state.password}
                        />
                        <div className="footer">
                            <input type='submit' value='Login'/>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Login;