import React, { Component } from 'react'
import Heading from './Heading'
import UserList from './UserList'


export class adminHome extends Component {
    

    render() {
        return (
            <div>
                <Heading />
                <UserList />
            </div>
        )
    }
}

export default adminHome
