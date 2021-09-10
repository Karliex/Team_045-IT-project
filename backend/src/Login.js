import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import loginImg from "./closing-image.png";
import './style.css'
import { Link } from 'react-router-dom'

export class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:''
        }
        this.changeEmail = this.changeEmail.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
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

    onSubmit(event){
        event.preventDefault()
        const loged = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:4000/login', loged)
            .then(response => console.log(response.data))
            
        // window.location = '/'
        this.setState({
            // email:'',
            password:''
        })
    }



    render() {
        return (
          <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Login</div>
            <div className="content">
              <div className="image">
                < img src={loginImg} />
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
                      {/* <Link to='/search'> */}
                        <input type='submit' value='Login'/>
                      {/* </Link> */}
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