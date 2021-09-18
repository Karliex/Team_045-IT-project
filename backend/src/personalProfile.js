import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import loginImg from "./closing-image.png";
import './style.css'
import { Link } from 'react-router-dom'


export class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            givenname:'',
            familyname:'',
            phoneNumber:'',
            valueStream:'',
            scrumTeam:'',
            role:'',
            technicalLead:'',
            productOwner:'',
            notes:''
        }
        this.changeGivenname = this.changeGivenname.bind(this)
        this.changeFamilyname = this.changeFamilyname.bind(this)
        this.changePhoneNumber = this.changePhoneNumber.bind(this)
        this.changeValueStream = this.changeValueStream.bind(this)
        this.changeScrumTeam = this.changeScrumTeam.bind(this)
        this.changeRole = this.changeRole.bind(this)
        this.changeTechnicalLead = this.changeTechnicalLead.bind(this)
        this.changeProductOwner = this.changeProductOwner.bind(this)
        this.changeNotes = this.changeNotes.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    changeGivenname(event){
        this.setState({
            givenname:event.target.value
        })
    }
    changeFamilyname(event){
        this.setState({
            familyname:event.target.value
        })
    }
    changePhoneNumber(event){
        this.setState({
            phoneNumber:event.target.value
        })
    }
    changeValueStream(event){
        this.setState({
            valueStream:event.target.value
        })
    }
    changeScrumTeam(event){
        this.setState({
            scrumTeam:event.target.value
        })
    }
    changeRole(event){
        this.setState({
            role:event.target.value
        })
    }
    changeTechnicalLead(event){
        this.setState({
            technicalLead:event.target.value
        })
    }
    changeProductOwner(event){
        this.setState({
            productOwner:event.target.value
        })
    }
    changeNotes(event){
        this.setState({
            notes:event.target.value
        })
    }

    onSubmit(event){
        event.preventDefault()
        const profiled = {
            givenname: this.state.givenname,
            familyname: this.state.familyname,
            phoneNumber: this.state.phoneNumber,
            valueStream: this.state.valueStream,
            scrumTeam: this.state.scrumTeam,
            role: this.state.role,
            technicalLead: this.state.technicalLead,
            productOwner: this.state.productOwner,
            notes: this.state.notes
        }

        axios.post('http://localhost:4000/user/updateInfo', profiled, { headers: { Authorization:localStorage.getItem('SavedToken') }})
            .then(response => console.log(response.data))
            
        // window.location = '/'
        this.setState({
            givenname:'',
            familyname:'',
            phoneNumber:'',
            valueStream:'',
            scrumTeam:'',
            role:'',
            technicalLead:'',
            productOwner:'',
            notes:''
        })
    }



    render() {
        return (
          <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Personal profile</div>
            <div className="content">
              <div className="form">
                <div className="form-group">
                  <form onSubmit={this.onSubmit}>
                    <label htmlFor="givenname">Givenname</label>
                    <input type='text'
                    onChange={this.changeGivenname}
                    value={this.state.givenname}
                    />
                    <label htmlFor="familyname">Familyname</label>
                    <input type='text'
                    onChange={this.changeFamilyname}
                    value={this.state.familyname}
                    />
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type='text'
                    onChange={this.changePhoneNumber}
                    value={this.state.phoneNumber}
                    />
                    <label htmlFor="valueStream">Value Stream</label>
                    <input type='text'
                    onChange={this.changeValueStream}
                    value={this.state.valueStream}
                    />
                    <label htmlFor="scrumTeam">Scrum Team</label>
                    <input type='text'
                    onChange={this.changeScrumTeam}
                    value={this.state.scrumTeam}
                    />
                    <label htmlFor="role">Role</label>
                    <input type='text'
                    onChange={this.changeRole}
                    value={this.state.role}
                    />
                    <label htmlFor="technicalLead">Who is your Technical Lead</label>
                    <input type='text'
                    onChange={this.changeTechnicalLead}
                    value={this.state.technicalLead}
                    />
                    <label htmlFor="productOwner">ProductOwner</label>
                    <input type='text'
                    onChange={this.changeProductOwner}
                    value={this.state.productOwner}
                    />
                    <label htmlFor="notes">Notes</label>
                    <input type='text'
                    onChange={this.changeNotes}
                    value={this.state.notes}
                    />
                    <div className="footer">
                        <input type='submit' value='Submit' />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default Profile;