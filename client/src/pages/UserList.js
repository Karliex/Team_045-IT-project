import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from './GlobalState'
import { useHistory } from 'react-router-dom';
import "./userList.css";
import ReactPaginate from 'react-paginate';


import {
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap'
import axios from '../common/axios'



export const UserList = () => {
    //const { users, removeUser } = useContext(GlobalContext);
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

    useEffect(() => {
        getAllUser();
    }, []);
    console.log(users)
    const history = useHistory();
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 5;
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(users.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    return (
        <div className="userlist">
            <div className="userblock">
            <ul>
                {users.slice(offset, offset + PER_PAGE).map(user => (
                    
                    <li className="admin">
                        <strong>{user.email}</strong>
                        <div className="edit" onClick={() =>{ 
                            let path = `./editUser/${user._id}`; 
                            history.push({
                                pathname: path,
                                state: user._id,
                            })
                        }}>Edit</div>
                        <div className="delete" onClick={() =>{ 
                            let path = `./delete/${user._id}`; 
                            history.push({
                                pathname: path,
                                state: user._id,
                            })
                        }}>Delete</div>
                    </li>
                ))}
            </ul>
            <div className="page">
                <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                    /> 
            </div>
        </div>
       </div> 
    )
    
}

export default UserList