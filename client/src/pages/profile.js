import React, { Component } from 'react'
import "./profile.css"
import axios from '../common/axios';
import Cookies from 'js-cookie';

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
        // userInfo: {},
        isLoaded: false
      };
    
      componentDidMount = () => {
        this.getProfile();
      };
    
      getProfile = () => {
        axios.get('/user/profile', { headers: { Authorization:Cookies.get('SavedToken') }})
          .then((response) => {
            console.log(response)
            const user = response.data;

            this.setState({
              email: user.email,
              givenname: user.givenname,
              familyname: user.familyname,
              phoneNumber:user.phoneNumber,
              valueStream:user.valueStream,
              scrumTeam:user.scrumTeam,
              role: user.role,
              technicalLead:user.technicalLead,
              productOwner: user.productOwner,
              notes:user.notes,
              isLoaded: true
            });
            console.log('Data has been received!!');
          })
          .catch(() => {
            this.setState({
              isLoaded: false
            });
            alert('Error retrieving data!!!');
            window.location = "/"
          });
      }
    

    render() {
      if(!this.state.isLoaded){
        return (
          <div className="profile">
            <div className="loading-wrapper">
            <div className="loading la-ball-scale-ripple-multiple la-3x">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        </div>
        )
      }else{
        return (
            <div className="profile">
                <div className="profileBlock">
                    <div className="circle">
                    
                    </div>
                    <input id="name" name="name" value={this.state.givenname}></input>
                    <div className="streamBlock">
                        <label for="valueStream">Value Stream</label>
                        <textarea rows="4" id="valueStream" name="valueStream" value={(
                           this.state.productOwner,
                           this.state.role,
                           this.state.scrumTeam,
                           this.state.technicalLead,
                           this.state.valueStream
                        )}></textarea>
                    </div>
                    
                    <div className="notesBlock">
                        <label for="notes">Notes</label>
                        <textarea rows="4" id="notes" name="notes" value={this.state.notes}></textarea>
                    </div>  
                    
                    <div className="emailBlock">
                        <label for="email">Email</label>
                        <textarea rows="1" id="email" name="email" value={this.state.email}></textarea>
                    </div>
                    
                    <div className="phoneBlock">
                        <label for="phoneNumber">Phone Number</label>
                        <textarea rows="1" id="phoneNumber" name="phoneNumber" value={this.state.phoneNumber}></textarea>
                    </div>
                </div>
            </div>
            
        )
    }
  }
}

export default profile