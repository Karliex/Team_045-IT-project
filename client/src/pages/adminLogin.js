import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from '../common/axios';
import loginImg from "./team.png";
import './style.css';
import Cookies from 'js-cookie';

// For the login page of administrator
export class adminLogin extends Component {
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

    //change the state of data
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

    // the action when submit
    onSubmit(event){
        event.preventDefault()
        const loged = {
            email: this.state.email,
            password: this.state.password
        }

        // Send 'post' request
        axios.post('/user/adminLogin', loged)
        .then(function (response) {
            let token = response.data.token;

            Cookies.set("SavedToken", 'Bearer ' + token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

             // Judge the redirection of data from response
            if (response.data.redirect === '/adminHome') {
                window.location = "/adminHome"
            }
        })
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
        // when the username or password is incorrect, show the alert message
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
                <div className="header">Administrator Login</div>
                    <div className="image">
                        <img src={loginImg}  alt="administrator login"/>
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

export default adminLogin;