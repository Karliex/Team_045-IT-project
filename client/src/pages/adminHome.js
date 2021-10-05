import React, { Component } from 'react'
import Heading from './Heading'
import UserList from './UserList'
import { Link } from 'react-router-dom'


export class adminHome extends Component {
    

    render() {
        return (
            <div className="adminHome">
                <UserList />
            </div>
        )
    }
}

export default adminHome
