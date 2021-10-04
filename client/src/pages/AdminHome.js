import React, { Component } from 'react';
import Heading from './heading';
import UserList from './userList';

// for the home page of administrator
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

export default adminHome;
