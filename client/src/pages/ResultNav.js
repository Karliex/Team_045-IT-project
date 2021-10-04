import React, { Component } from 'react';
import "./Navigation.css";
import { NavLink } from 'react-router-dom';
import Logout from './Logout';

// show the navigation in result page
export class ResultNav extends Component {
    render() {
        return (
            <nav>
                <ul className="nav-links">
                    <NavLink to='/search' style={{color: 'rgb(164, 179, 219)', textDecoration: 'none'}} activeStyle={{color: 'orange', textDecoration: 'none'}}>Search</NavLink>
                    <NavLink to='/profile' style={{color: 'rgb(164, 179, 219)', textDecoration: 'none'}} activeStyle={{color: 'orange', textDecoration: 'none'}}>My Profile</NavLink>
                    <NavLink to='/updateInfo' style={{color: 'rgb(164, 179, 219)', textDecoration: 'none'}} activeStyle={{color: 'orange', textDecoration: 'none'}}>Edit Profile</NavLink>
                    <NavLink to='/resultProfile' style={{color: 'rgb(164, 179, 219)', textDecoration: 'none'}} activeStyle={{color: 'orange', textDecoration: 'none'}}>Search Results</NavLink>
                </ul>
                <Logout/>
            </nav>
        )
    }
}

export default ResultNav;