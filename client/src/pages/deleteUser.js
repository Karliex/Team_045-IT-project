import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from '../common/axios';

//delete the information of user (by administrator)
export class deleteUser extends Component {
    // Constructor method
    constructor(props){
        super(props)
        this.state = {
        }
        this.onSubmit = this.onSubmit.bind(this)
    }
    // delete user when submit
    onSubmit(event){
        event.preventDefault()
        const currentUserId = this.props.location.state;
        axios.delete(`/user/delete/${currentUserId}`)
            .then(function (response) {
                if (response.data.redirect === '/adminHome') {
                    window.location = "/adminHome"
                }
            })
    }
    
    render() {
        return (
            <div className="editUser">
                <div className="deletecontainer">
                    <div className="header">Do you really want to delete this user?</div>
                    <div className="form">
                    <div className="form-group">
                        <form onSubmit={this.onSubmit}>
                            <div className="footer">
                                <input type='submit' value='Confirm' />
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default deleteUser;