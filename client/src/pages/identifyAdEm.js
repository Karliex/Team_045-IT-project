import React, { Component } from 'react'
import './identifyAdEm.css'
import User from "./4.png";
import Administrator from "./3.png"
import { Link } from 'react-router-dom'

export class identify extends Component {
    
    render() {
        return (
            <div className="identify">
                <h3 type="head">Welcome! Please choose your identity to login...</h3>
                <div className="selection">
                    <Link to="./login" style={{ textDecoration: 'none', borderRadius: 100}}>
                        <div className="employee-wrapper">
                            <h1 type="role">I Am an Employee</h1>
                            <div className="userimage">
                                <img src={User}  alt="user"/>
                            </div>
                        </div>
                    </Link>
                    <Link to="adminlogin" style={{ textDecoration: 'none', borderRadius: 100, width:0}}>
                        <div className="administrator-wrapper">
                            <h1 type="role">I Am an Administrator</h1>
                            <div className="adminimage">
                                <img src={Administrator}  alt="admin"/>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default identify
