import React, { Component } from 'react'
import "./navigation.css"
import { Link } from 'react-router-dom'

export class navigation extends Component {
    render() {
        return (
            <nav>
                <ul className="nav-links">
                    <Link to='/search'>
                        <li>Search</li>
                    </Link>
                    <Link to='/profile'>
                        <li>Profile</li>
                    </Link>
                </ul>
            </nav>
        )
    }
}

export default navigation
