import React from "react";
import "./SearchPage.css";
import Search from "./search";
import BookData from "./Data.json";



function SearchPage() {
  return (
    <div className="SearchPage">
      <h1>Search Employee</h1>
      <Search placeholder="e.g. Team name, name of employee, Team role" data={BookData}/>
    </div>
  );
}

export default SearchPage;
