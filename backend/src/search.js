import React from 'react';
import Axios from 'axios';
import "./search.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

class Search extends React.Component  {

    // Constructor method
    constructor(props) {
        super(props);

        this.state = {
        query: '',
        results: []
        }

        this.setQuery = this.setQuery.bind(this)
        this.fetchResults = this.fetchResults.bind(this)
    }

    // Update's user input in search bar
    setQuery = (event) => {
        const query = event.target.value;
        this.setState({query: query});
    }

    // Get search results
    fetchResults = (event) =>  {
        
        const searchURL = "http://localhost:4000/user/search"
        const queryData = {query: this.state.query}

        Axios.post(searchURL, queryData)
        .then(res => {
            this.setState({
                results: res.data.results,
            })
            console.log("Search complete");
            
            // console.log(res);
            console.log(this.state.results)
        }).catch(res => {
            console.log("Search did not go through!")
            console.log(res);
        });



    }

    // Update's user input in search bar
    handleChange = (event) => {
        const query = event.target.value;
        this.setState({query: query});
        this.fetchResults(query);
    }

    // Clears search input
    clearInput = () => {
        this.setState({query: ''});
    };

    // Renders the page
    render() {
        return (
        <div className="search">
            <div className="searchInputs">
            <form onSubmit={this.fetchResults}>
                <input 
                type="text" 
                name="query" 
                value={this.state.query}
                placeholder="Search..." 
                onChange={this.handleChange}
                />
            </form>
            <div className="searchIcon">
                {this.state.query.length === 0 ? (
                <SearchIcon style={{ color: "orange" }}/>
                ) : (
                <CloseIcon style={{ color: "orange" }} id="clearBtn" onClick={this.clearInput} />
                )}
            </div>
            </div>
        </div>  
        );
    }
}

export default Search;
