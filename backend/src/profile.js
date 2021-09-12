import React, { Component } from 'react'
import "./profile.css"
import { Link } from 'react-router-dom'

export class profile extends Component {
    render() {
        return (
            <div className="profile">
                <div className="profileBlock">
                    <div className="circle">
                    
                    </div>
                    <input id="name" name="name" value="<?=$name?>"></input>
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
                    

                </div>
            </div>
            
        )
    }
}

export default profile