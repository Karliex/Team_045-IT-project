import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../common/axios';
import {
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';

// get the list of all users
export const UserList = () => {
    const [users, getUsers] = useState([]);
    const url = '/user/adminHome'
    const getAllUser = () => {
        axios.get(url)
        .then((response) => {
            const allUser = response.data
            console.log(allUser)
            getUsers(allUser)
        })
        .catch(error => console.error(`Error: ${error}`))
    }
    //get all the users
    useEffect(() => {
        getAllUser();
    }, []);
    console.log(users)
    const history = useHistory();
    //show the user in list in the website
    return (
        <ListGroup>
            {users.map(user => (
                <ListGroupItem>
                <strong>{user.email}</strong>
                <div onClick={() =>{ 
                    let path = `./editUser/${user._id}`; 
                    history.push({
                        pathname: path,
                        state: user._id,
                    })
                }}>Edit</div>
                <div onClick={() =>{ 
                    let path = `./delete/${user._id}`; 
                    history.push({
                        pathname: path,
                        state: user._id,
                    })
                }}>Delete</div>
                </ListGroupItem>
            ))}
        </ListGroup>
    )
}

export default UserList;