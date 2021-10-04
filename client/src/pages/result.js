import React, { Component, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import "./Result.css";
import { useHistory } from 'react-router-dom';

// get the result after search
function Result({results}){
    //inital the page number
    const [currentPage, setCurrentPage] = useState(0);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    useEffect(() => {
        fetchData({results});
    }, []);

    //history function
    const history = useHistory();

    // get the results shown in email
    function fetchData({results}){
        results.map(result => console.log(result.email))
    }

    //one page sets 8 results
    const PER_PAGE = 8;
    const offset = currentPage * PER_PAGE;
    //According to different email, push the corresponding result to this email(result)
    const currentPageData = results.slice(offset, offset + PER_PAGE).map(result => 
        <div className="result" onClick={() =>{ 
            let path = './resultProfile'; 
            history.push({
                pathname: path,
                state: result,
              })
        }}>{result.email}</div>
    );
    console.log(currentPageData);
    //count the page number
    const pageCount = Math.ceil(results.length / PER_PAGE);
    
    // show the reult in pagination
    return (
        <div className="resultshowed">
            {currentPageData}  
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
        </div>);
}


export default Result;
