import React, { Component } from 'react';
import "./usersProfile.css";

//the page for the information of user from search result
export class userProfile extends Component {
    render() {
        console.log(this.props.location.state);
        return (
            <div className="userProfile">
                <div className="userBlock">
                    <div className="usercircle">
                    </div>
                    <div className="nameBlock" style={{width:225, marginLeft:120, marginTop:50, height:120, color:"orange"}}>
                        <label for="name">Name</label>
                        <textarea rows="1" id="name" name="name" ></textarea>
                    </div>
                    
                    <div className="emailBlock" style={{width:700, marginLeft:120, marginTop:190}}>
                        <label for="email">Email</label>
                        <textarea rows="1" id="email" name="email" value={this.props.location.state.email} ></textarea>
                    </div>
                    
                    <div className="phoneBlock" style={{width:700, marginLeft:120,  marginTop:290}}>
                        <label for="phone">Phone Number</label>
                        <textarea rows="1" id="phoneNumber" name="phoneNumber" value={this.props.location.state.phoneNumber}></textarea>
                    </div>
                    <div className="notesBlock" style={{width:325, marginLeft:120,  marginTop:390}}>
                        <label for="notes">Notes</label>
                        <textarea rows="4" id="notes" name="notes" value={this.props.location.state.notes}></textarea>
                    </div>  
                    <div className="streamBlock" style={{width:325, marginLeft:490,  marginTop:390}}>
                        <label for="valueStream">Value Stream</label>
                        <textarea rows="4" id="valueStream" name="valueStream"></textarea>
                    </div>
                </div>
            </div>
        )
    }
}

export default userProfile;