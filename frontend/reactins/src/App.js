import React, { Component } from 'react'
import "./Home.css";
import { Login, Register } from "./components/index";
import Home from './Home';
import SearchPage from './SearchPage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

export class App extends Component {
    render() {
        return (
            <div>
               <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/search" component={SearchPage} />
                </Switch>
                </Router> 
            </div>
        )
    }
}

export default App
