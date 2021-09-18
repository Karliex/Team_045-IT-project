import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home.js'
import './Home.css'
import Search from './SearchPage'
import Login from './Login'
import Signup from './Register'
import Navigation from './navigation'
import UpdateInfo from './personalProfile'


class App extends Component {

    render() {
        return ( 
            <Router>
                <div>
                    <Route path="/search" component={Navigation} />
                    <Switch>
                        {/* <Route path="/" exact component={Home} /> */}
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={Signup} />
                        <Route path="/search" exact component={Search} />
                        <Route path="/updateInfo" exact component={UpdateInfo} />
                    </Switch>
                </div>
            </Router>
        );
    }    
}

export default App;