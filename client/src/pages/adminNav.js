import React, { Component } from 'react';
import "./navigation.css";
import { NavLink } from 'react-router-dom';
import Logout from './logout';

//show the navigation(home and add users) in the page for administrator
export class adminNav extends Component {
    render() {
        return (
            <nav>
                <ul className="nav-links">
                    <NavLink to='/adminHome' style={{color: 'rgb(164, 179, 219)', textDecoration: 'none'}} activeStyle={{color: 'orange', textDecoration: 'none'}}>Home</NavLink>
                    <NavLink to='/signup' style={{color: 'rgb(164, 179, 219)', textDecoration: 'none'}} activeStyle={{color: 'orange', textDecoration: 'none'}}>Add User</NavLink>
                </ul>
                <Logout/>
            </nav>
        )
    }
}

export default adminNav;