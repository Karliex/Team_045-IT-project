import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from '../common/axios';
import { Tabs, Tab } from 'react-bootstrap';
import './change.css'
import { setRawCookie } from 'react-cookies';
import Cookies from 'js-cookie';


export class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            image: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
            givenname:'',
            familyname:'',
            phoneNumber:'',
            oldphone:'',
            valueStream:'',
            scrumTeam:'',
            role:'',
            technicalLead:'',
            productOwner:'',
            notes:'',
            oldnotes:'',

            old_psswd: '',
            new_psswd: '',
            password:''
        }
        this.changeImage = this.changeImage.bind(this)
        this.changeGivenname = this.changeGivenname.bind(this)
        this.changeFamilyname = this.changeFamilyname.bind(this)
        this.changePhoneNumber = this.changePhoneNumber.bind(this)
        this.changeValueStream = this.changeValueStream.bind(this)
        this.changeScrumTeam = this.changeScrumTeam.bind(this)
        this.changeRole = this.changeRole.bind(this)
        this.changeTechnicalLead = this.changeTechnicalLead.bind(this)
        this.changeProductOwner = this.changeProductOwner.bind(this)
        this.changeNotes = this.changeNotes.bind(this)

        this.enterOldPsswd = this.enterOldPsswd.bind(this)
        this.enterNewPsswd = this.enterNewPsswd.bind(this)
        // this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.callback = this.callback.bind(this);
    }

    changeImage(event){
        this.setState({
            image:event.target.value
        })
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

    //password reset
    enterOldPsswd(event){
        this.setState({
            old_psswd:event.target.value
        })
    }
    enterNewPsswd(event){
        this.setState({
            new_psswd:event.target.value
        })
    }
    // changePassword(event){
    //     this.setState({
    //         password:event.target.value
    //     })
    // }

    componentDidMount = () => {
        this.getProfile();
      };
    
    
      getProfile = () => {
        axios.get('/user/profile', { headers: { Authorization:Cookies.get('SavedToken') }})
          .then((response) => {
            const user = response.data;

            this.setState({
              email: user.email,
              givenname: user.givenname,
              familyname: user.familyname,
              phoneNumber:user.phoneNumber,
              oldphone:user.phoneNumber,
              valueStream:user.valueStream,
              scrumTeam:user.scrumTeam,
              role: user.role,
              technicalLead:user.technicalLead,
              productOwner: user.productOwner,
              notes:user.notes,
              oldnotes: user.notes,
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

    onSubmit(event){
        event.preventDefault()
        const profiled = {
            image: this.state.image,
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

        const passwordInfo = {
            old_psswd: this.state.old_psswd,
            new_psswd: this.state.new_psswd
        }

        axios.post('/user/updateInfo', profiled, { headers: { Authorization:Cookies.get('SavedToken') }})
            .then(
            this.getProfile(), 
            window.location = "/updateInfo"
            )
            
            this.setState({
                phoneNumber:''
        })
            
        axios.post('/user/reset-password', passwordInfo, { headers: { Authorization:Cookies.get('SavedToken') }})
            .then(
            this.getProfile(),
            window.location = "/updateInfo"
            )
                        
    }


    callback(e) {
        console.log(e);
    }

    render(){
        return (
            <div className="change">
                <div className="changeBlock">
                    <div className="leftBlock">
                        <div className="changeProfile">
                        </div>
                        <textarea type="name" value={this.state.givenname}></textarea>
                        <input type='img' 
                               value='Upload New Profile Photo'
                        />
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <div className="tab">
                        <Tabs defaultActiveKey="password" onSelect={this.callback} transition={false}>
                            <Tab eventKey="password" title="Reset Password">
                                <div className="tab-item-wrapper">
                                <label type="pass">Current Password</label>
                                <input type='pass' placeholder="Enter Your current Password" onChange={this.enterOldPsswd}/>
                                <label type="pass">New Password</label>
                                <input type='pass' placeholder="Enter Your New Password" onChange={this.enterNewPsswd}/>
                                <div className="button-wrapper">
                                    
                                    <input type="submit" value="Update"/>
                                </div>
                                </div>
                            </Tab>

                            <Tab eventKey="contact" title="Reset Phone Number">
                                <div className="tab-item-wrapper">
                                    <label type="pass">Current Phone Number</label>
                                    <input type="prepass" value={this.state.oldphone}/>
                                    <label type="pass">New Phone Number</label>
                                    <input type='pass' 
                                    onChange={this.changePhoneNumber} 
                                    // value={this.state.phoneNumber} 
                                    placeholder="Enter Your New Phone Number"
                                    />
                                    <div className="button-wrapper">
                                        <input type="submit" value="Update"/>
                                    </div>
                                </div>
                            </Tab>

                            <Tab eventKey="notes" title="Change Notes">
                                <div className="tab-item-wrapper">
                                    <label type="pass">Current Notes</label>
                                    <input type="prepass" value={this.state.oldnotes}/>
                                    <label type="pass">New Notes</label>
                                    <input type='pass' 
                                    placeholder="Enter Your New Notes"
                                    onChange={this.changeNotes}
                                    // value={this.state.notes}
                                    />
                                    <div className="button-wrapper">                         
                                        <input type="submit" value="Update"/>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                    </form>
                </div>
            </div>
            
        );
    }
}

export default Profile;