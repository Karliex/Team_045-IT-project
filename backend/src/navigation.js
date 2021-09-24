import React, { Component } from 'react'
import "./navigation.css"
import { Link, NavLink } from 'react-router-dom'

export class navigation extends Component {
    render() {
        return (
            <nav>
                <ul className="nav-links">
                    <NavLink to='/search' style={{color: 'rgb(164, 179, 219)', textDecoration: 'none'}} activeStyle={{color: 'orange', textDecoration: 'none'}}>Search</NavLink>
                    <NavLink to='/profile' style={{color: 'rgb(164, 179, 219)', textDecoration: 'none'}} activeStyle={{color: 'orange', textDecoration: 'none'}}>My Profile</NavLink>
                    <NavLink to='/updateInfo' style={{color: 'rgb(164, 179, 219)', textDecoration: 'none'}} activeStyle={{color: 'orange', textDecoration: 'none'}}>Edit Profile</NavLink>
                </ul>
            </nav>
        )
    }
}

export default navigation