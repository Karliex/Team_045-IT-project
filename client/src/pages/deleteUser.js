import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from '../common/axios';

export class deleteUser extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
        this.onSubmit = this.onSubmit.bind(this)
    }
    onSubmit(event){
        event.preventDefault()
        
        const currentUserId = this.props.location.state;
        //console.log(currentUserId)
        axios.delete(`/user/delete/${currentUserId}`)
            .then(function (response) {
                console.log(currentUserId)
                if (response.data.redirect === '/adminHome') {
                    window.location = "/adminHome"
                }
            })
    }
    
    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
              <div>
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

export default deleteUser