import React, { Component } from 'react'
import "./navigation.css"
import { NavLink } from 'react-router-dom'

export class ResultNav extends Component {
    render() {
        return (
            <nav>
                <ul className="nav-links">
                    <NavLink to='/search' style={{color: 'rgb(164, 179, 219)', textDecoration: 'none'}} activeStyle={{color: 'orange', textDecoration: 'none'}}>Search</NavLink>
                    <NavLink to='/profile' style={{color: 'rgb(164, 179, 219)', textDecoration: 'none'}} activeStyle={{color: 'orange', textDecoration: 'none'}}>My Profile</NavLink>
                    <NavLink to='/updateInfo' style={{color: 'rgb(164, 179, 219)', textDecoration: 'none'}} activeStyle={{color: 'orange', textDecoration: 'none'}}>Edit Profile</NavLink>
                    <NavLink to='/result' style={{color: 'rgb(164, 179, 219)', textDecoration: 'none'}} activeStyle={{color: 'orange', textDecoration: 'none'}}>Search Results</NavLink>
                </ul>
            </nav>
        )
    }
}

export default ResultNav