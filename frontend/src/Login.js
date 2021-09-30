import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from './common/axios'
import loginImg from "./closing-image.png";
import './style.css'
import { CollectionsBookmarkOutlined } from '@material-ui/icons';
import Cookies from 'js-cookie'

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

    // componentWillMount() {
    //     this.state =  { token: cookie.load('token') }
    // }

    // onLogin(token) {
    //     this.setState({token})
    //     cookie.save('token', token)
    // }


    onSubmit(event){
        event.preventDefault()
        const loged = {
            email: this.state.email,
            password: this.state.password
        }

        // axios.post('http://localhost:4000/user/login', loged)
        //     .then(response => console.log(response.data))
        axios.post('/user/login', loged)
        .then(function (response) {
            let token = response.data.token;
            console.log(token);

            //this.onLogin(token)
            // cookie.setItem("SavedToken", 'Bearer ' + token);
            Cookies.set("SavedToken", 'Bearer ' + token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            if (response.data.redirect === '/search') {
                window.location = "/search"
            } else if (response.data.redirect === '/login'){
                window.location = "/login"
            }
        })
        .catch(function(error) {
            window.location = "/login"
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