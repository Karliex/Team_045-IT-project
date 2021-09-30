import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import loginImg from "./team.png";
import './style.css'
import Cookies from 'js-cookie'

export class adminLogin extends Component {
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

        // axios.post('http://localhost:4000/user/login', loged)
        //     .then(response => console.log(response.data))
        axios.post('http://localhost:4000/user/adminlogin', loged)
        .then(function (response) {
            let token = response.data.token;
            console.log(token);

            Cookies.set("SavedToken", 'Bearer ' + token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            if (response.data.redirect === '/adminHome') {
                window.location = "/adminHome"
            } else if (response.data.redirect === '/adminlogin'){
                window.location = "/adminlogin"
            }
        })
        .catch(function(error) {
            window.location = "/adminlogin"
        })

        // window.location = '/'
        this.setState({
            // email:'',
            password:''
        })
    }



    render() {
        return (
          <div className="base-container" ref={this.props.containerRef}>
            <div className="content">
            <div className="header">Administrator Login</div>
              <div className="image">
                < img src={loginImg}  alt="administrator login"/>
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

export default adminLogin;