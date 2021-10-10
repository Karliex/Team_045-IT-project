import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "./usersList.css";
import ReactPaginate from 'react-paginate';
import axios from '../common/axios';
import Cookies from 'js-cookie';

// get the list of all users
export const UserList = () => {
    const [users, getUsers] = useState([]);
    const [loading, setloading] = useState(false);
    const url = '/user/adminHome'
    const getAllUser = () => {
        axios.get(url, { headers: { Authorization:Cookies.get('SavedToken') }})
        .then((response) => {
            const allUser = response.data
            console.log(allUser)
            setloading(true)
            getUsers(allUser)
        })
        .catch(() => {
            alert('Error retrieving data!!!');
            window.location = "/"
        });
    }
    //get all the users
    useEffect(() => {
        getAllUser();
    }, []);
    console.log(users)
    const history = useHistory();
    
    //do the pagination
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 5;
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(users.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    //show the user in list in the website with the pagination
    if(!loading){
        return(<div className="userlist">
            <div className="loading-wrapper">
            <div className="loading la-ball-scale-ripple-multiple la-3x">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        </div>)
    }
    else{
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
                                    state: user,
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
}  

export default UserList;