import React, { Component } from 'react'
import "./result.css"

function Result({results}){
    return (
        <div className="resultshowed">  
        {results.map(result => <div className="result">{result.email}</div>)}
        </div>);
}


export default Result