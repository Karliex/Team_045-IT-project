import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from '../common/axios';
import { Tabs, Tab } from 'react-bootstrap';
import './change.css';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom'; 

// change personal profile
export class Profile extends Component {
    // Constructor method
    constructor(props){
        super(props)
        this.state = {
            image: '',
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
            password:'',
            isLoaded:false
        }
        this.changeImage = this.changeImage.bind(this)
        this.changePhoneNumber = this.changePhoneNumber.bind(this)
        this.changeNotes = this.changeNotes.bind(this)
        this.enterOldPsswd = this.enterOldPsswd.bind(this)
        this.enterNewPsswd = this.enterNewPsswd.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.callback = this.callback.bind(this);
    }

    //change state of the data
    changeImage(event){
        this.setState({
            image:event.target.value
        })
    }

    changePhoneNumber(event){
        this.setState({
            phoneNumber:event.target.value
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

    componentDidMount = () => {
        this.getProfile();
      };
    
    getProfile = () => {
    // send 'get' request
    axios.get('/user/profile', { headers: { Authorization:Cookies.get('SavedToken') }})
        .then((response) => {
        const user = response.data;

        this.setState({
            image: user.pic,
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
        //judge the data received or not
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

    //the action when the button is submitted
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

        const passwordInfo = {
            old_psswd: this.state.old_psswd,
            new_psswd: this.state.new_psswd
        }

        //send 'post' request for personal profile
        axios.post('/user/updateInfo', profiled, { headers: { Authorization:Cookies.get('SavedToken') }})
            .then(
            this.getProfile(), 
            window.location = "/updateInfo"
            )
            
            this.setState({
                phoneNumber:''
        })
        
        //send 'post' request for password
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
                <div className="change">
                    <div className="changeBlock">
                        <div className="leftBlock">
                            <img className="changeProfile" src={this.state.image}/>
                            <textarea type="name" value={this.state.givenname}></textarea>
                            <Link to="uploadImage"><input type='img' 
                                value='Upload New Profile Photo'
                            /></Link>
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
}

export default Profile;