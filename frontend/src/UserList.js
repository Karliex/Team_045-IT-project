import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from './GlobalState'
import EditUser from './editUser'
import { useHistory } from 'react-router-dom';

import {
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap'
import axios from 'axios'



export const UserList = () => {
    //const { users, removeUser } = useContext(GlobalContext);
    const [users, getUsers] = useState([]);
    const url = 'http://localhost:4000/user/adminHome'
    const getAllUser = () => {
        axios.get(url)
        .then((response) => {
            const allUser = response.data
            console.log(allUser)
            getUsers(allUser)
        })
        .catch(error => console.error(`Error: ${error}`))
    }

    useEffect(() => {
        getAllUser();
    }, []);
    console.log(users)
    const history = useHistory();
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
                    let path = `./editUser/${user._id}`; 
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

export default UserList
