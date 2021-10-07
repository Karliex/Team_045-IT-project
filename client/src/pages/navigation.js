import React, { Component } from 'react';
import "./navigation.css";
import { NavLink } from 'react-router-dom';
import Logout from './logout';

//the navigation shown in the top of each page
export class navigation extends Component {
    render() {
        return (
            <nav>
                <ul className="nav-links">
                    <NavLink to='/search' style={{color: 'rgb(164, 179, 219)', textDecoration: 'none'}} activeStyle={{color: 'orange', textDecoration: 'none'}}>Search</NavLink>
                    <NavLink to='/profile' style={{color: 'rgb(164, 179, 219)', textDecoration: 'none'}} activeStyle={{color: 'orange', textDecoration: 'none'}}>My Profile</NavLink>
                    <NavLink to='/updateInfo' style={{color: 'rgb(164, 179, 219)', textDecoration: 'none'}} activeStyle={{color: 'orange', textDecoration: 'none'}}>Edit Profile</NavLink>
                </ul>
                <Logout/>
            </nav>
        )
    }
}

export default navigation;