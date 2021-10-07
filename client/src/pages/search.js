import React from 'react';
import axios from '../common/axios';
import "./search.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import Result from "./result";

class Search extends React.Component  {

    // Constructor method
    constructor(props) {
        super(props);

        this.state = {
        query: '',
        results: [],
        display: false
        }

        this.fetchResults = this.fetchResults.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    // Get search results
    fetchResults(event){
        event.preventDefault()
        const searchURL = "/user/search"
        const queryData = {query: this.state.query}
    
        axios.post(searchURL, queryData)
        .then(res => {
            this.setState({
                results:res.data,
                display:true
            })
            console.log("Search complete");
            console.log(this.state.results);
        }).catch(res => {
            console.log("Search did not go through!")
            console.log(res);
        });

    }

    // Update's user input in search bar
    handleChange(event){
        this.setState({query: event.target.value});
    }

    // Clears search input
    clearInput = () => {
        this.setState({query: ''});
    };

    // Renders the page
    render() {
        if(this.state.display){
            return(
            <div className="search">
                <div className="newsearchInputs">
                <h4>Search Results</h4>
                    <form onSubmit={this.fetchResults}>
                        <input 
                        type="text" 
                        name="query" 
                        value={this.state.query}
                        placeholder="e.g. Team name, name of employee, Team role"
                        onChange={this.handleChange}
                        />
                    </form>
                </div>
                <div><Result results={this.state.results} /></div>
            </div>);
        }
        else{
            return (
                <div className="search">
                    <h1>Search Employee</h1>
                    <div className="searchInputs">
                    <form onSubmit={this.fetchResults}>
                        <input 
                        type="text" 
                        name="query" 
                        value={this.state.query}
                        placeholder="e.g. Team name, name of employee, Team role"
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
}

export default Search;


