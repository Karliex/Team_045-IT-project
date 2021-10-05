import React, { Component } from 'react'
import Heading from './headings'
import UserList from './usersList'


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
