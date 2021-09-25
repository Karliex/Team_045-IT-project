import React, { Component } from 'react'
import "./profile.css"
import { Link } from 'react-router-dom'
import axios from 'axios';

export class profile extends Component {
    state = {
        givenname:'',
        familyname:'',
        phoneNumber:'',
        valueStream:'',
        scrumTeam:'',
        role:'',
        technicalLead:'',
        productOwner:'',
        notes:'',
        userInfo: {}
      };
    
      componentDidMount = () => {
        this.getProfile();
      };
    
    
      getProfile = () => {
        axios.get('/profile')
          .then((response) => {
            console.log("hello");
            const user = response.data.user;
            this.setState({ userInfo: user });
            console.log('Data has been received!!');
          })
          .catch(() => {
            alert('Error retrieving data!!!');
          });
      }
    
      displayProfile = (userInfo) => {
        this.getProfile();
        console.log(userInfo)
    
        if (!userInfo.length) return null;
    
        return userInfo.map((user, index) => (
          <div key={index} className="user-info__display">
            <h3>{user.notes}</h3>
            <p>{user.email}</p>

          </div>
        ));
      };









    render() {
        return (
            <div className="profile">
                <div className="profileBlock">
                    <div className="circle">
                    
                    </div>
                    <input id="name" name="name" value={this.state.givenname}></input>
                    <div className="streamBlock">
                        <label for="valueStream">Value Stream</label>
                        <textarea rows="4" id="valueStream" name="valueStream" value="<?=$valueStream?>"></textarea>
                    </div>
                    
                    <div className="notesBlock">
                        <label for="notes">Notes</label>
                        <textarea rows="4" id="notes" name="notes" value="<?=$notes?>"></textarea>
                    </div>  
                    
                    <div className="emailBlock">
                        <label for="email">Email</label>
                        <textarea rows="1" id="email" name="email" value="<?=$email?>"></textarea>
                    </div>
                    
                    <div className="phoneBlock">
                        <label for="phoneNumber">Phone Number</label>
                        <textarea rows="1" id="phoneNumber" name="phoneNumber" value="<?=$phoneNumber?>"></textarea>
                    </div>
                    
                    <div className="user-"> {this.displayProfile(this.state.userInfo)} </div>
                </div>
            </div>
            
        )
    }
}

export default profile