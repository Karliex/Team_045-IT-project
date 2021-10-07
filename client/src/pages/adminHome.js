import React, { Component } from 'react';
import UserList from './usersList';

// for the home page of administrator
export class adminHome extends Component {

    render() {
        return (
            <div className="adminHome">
                <UserList />
            </div>
        )
    }
} 

export default adminHome;
