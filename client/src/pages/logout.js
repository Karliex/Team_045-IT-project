import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from '../common/axios';
import Cookies from 'js-cookie';
import "./logout.css";

// Logout the account
export class logout extends Component {
    // Constructor method
    constructor(){
        super()
        this.onSubmit = this.onSubmit.bind(this)
    }
    // logout when submit
    onSubmit(event){
        event.preventDefault()
        // send 'get' request
        axios.get('/user/logout')
        .then(function (response) {
            let token = response.data.token;
            Cookies.set("SavedToken", 'Bearer ' + token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            window.location = '/'
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="logout-wrapper">                         
                    <input type="submit" value="Logout"/>
                </div>
            </form>
        )
    }
}

export default logout;
