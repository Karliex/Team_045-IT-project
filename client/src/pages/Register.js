import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from '../common/axios'
import loginImg from "./team.png";
import "./Style.css";

//show the register page (register by administrator)
export class Register extends Component {
    // Constructor method
    constructor(){
        super()
        this.state = {
            email:'',
            password:''
        }
        this.changeEmail = this.changeEmail.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    //change state
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
        const registered = {
            email: this.state.email,
            password: this.state.password
        }
        //send 'post' request and jump the interface
        axios.post('/user/signup', registered).then(function (response) {
          if (response.data.redirect === '/adminHome') {
              window.location = "/adminHome"
          } else if (response.data.redirect === '/signup'){
              window.location = "/signup"
          }
      })
      // when the error occurs
      .catch(function(error) {
          window.location = "/signup"
      })
        this.setState({
            email:'',
            password:''
        })
    }

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                <div className="content">
                <div className="header">Register</div>
                    <div className="image">
                        < img src={loginImg}  alt="register"/>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <form onSubmit={this.onSubmit}>
                                <label htmlFor="email">Email</label>
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
                                    <input type='submit' value='Sign Up' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Register;
