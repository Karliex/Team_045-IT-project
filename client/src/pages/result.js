import React, { Component, useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import "./result.css"
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';


function Result({results}){
    const [currentPage, setCurrentPage] = useState(0);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    useEffect(() => {
        fetchData({results});
    }, []);

    const history = useHistory();


    function fetchData({results}){
        results.map(result => console.log(result.email))
    }

    const PER_PAGE = 8;
    const offset = currentPage * PER_PAGE;
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
    const pageCount = Math.ceil(results.length / PER_PAGE);

    return (
        <div className="resultshowed">
            {currentPageData}
            <div className="sresult">
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
        </div>);
}


export default Result
