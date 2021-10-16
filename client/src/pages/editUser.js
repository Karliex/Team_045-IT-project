import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from '../common/axios';
import './editUser.css';
import Cookies from 'js-cookie';

// edit the information of user
export class editUser extends Component {
    // Constructor method
    constructor(props){
        super(props)
        this.state = {
            givenname:'',
            familyname:'',
            valueStream:'',
            scrumTeam:'',
            role:'',
            technicalLead:'',
            productOwner:''
        }
        this.changeGivenname = this.changeGivenname.bind(this)
        this.changeFamilyname = this.changeFamilyname.bind(this)
        this.changeValueStream = this.changeValueStream.bind(this)
        this.changeScrumTeam = this.changeScrumTeam.bind(this)
        this.changeRole = this.changeRole.bind(this)
        this.changeTechnicalLead = this.changeTechnicalLead.bind(this)
        this.changeProductOwner = this.changeProductOwner.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    //change the state of data
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

    onSubmit(event){
        event.preventDefault()
        const profiled = {
            givenname: this.state.givenname,
            familyname: this.state.familyname,
            valueStream: this.state.valueStream,
            scrumTeam: this.state.scrumTeam,
            role: this.state.role,
            technicalLead: this.state.technicalLead,
            productOwner: this.state.productOwner,
        }
        
        const currentUserId = this.props.location.state;
        console.log(currentUserId)
        console.log('++++++++++++++++++++++++++++++++')
        //send 'post' request and jump interfact
        axios.post(`/user/editUser/${currentUserId}`, profiled, { headers: { Authorization:Cookies.get('SavedToken') }})
            .then(function (response) {
                if (response.data.redirect === '/adminHome') {
                    window.location = "/adminHome"
                } else if (response.data.redirect === '/signup'){
                    window.location = "/signup"
                }
            })
            
            console.log(currentUserId)
            this.setState({
                givenname:'',
                familyname:'',
                valueStream:'',
                scrumTeam:'',
                role:'',
                technicalLead:'',
                productOwner:''
            })
    }
    
    render() {
        return (
            <div className="editUser">
                <div className="editContainer">
                <div className="editheader">Edit user profile</div>
                    <div className="editform">
                    <div className="editform-group">
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
                        <label htmlFor="productOwner">Product Owner</label>
                        <input type='text'
                        onChange={this.changeProductOwner}
                        value={this.state.productOwner}
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

export default editUser;
