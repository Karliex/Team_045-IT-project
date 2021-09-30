import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import Cookies from 'js-cookie';


export class editUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            
            //userId:this.props.state,
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
        //axios.post('http://localhost:4000/user/editUser/:id', profiled, { headers: { Authorization:Cookies.get('SavedToken') }})
        axios.post(`http://localhost:4000/user/editUser/${currentUserId}`, profiled)
            .then(response => console.log(response.data))
            console.log('jin lai le')
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
        //console.log(this.props.location.state);
        return (
          <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Edit user profile</div>
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

export default editUser
