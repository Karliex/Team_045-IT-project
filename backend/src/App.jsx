import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './Home.css'
import Search from './SearchPage'
import Login from './Login'
import Signup from './Register'
import Navigation from './navigation'
import UpdateInfo from './changeProfile'
import Profile from './profile'
import Identify from './identify'
import Admin from './adminLogin'


class App extends Component {

    render() {
        return ( 
            <Router>
                <div>
                    <Route path="/search" component={Navigation} />
                    <Route path="/updateInfo" component={Navigation} />
                    <Route path="/profile" component={Navigation} />
                    <Switch>
                        <Route exact path="/" component={Identify}/>
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={Signup} />
                        <Route path="/search" exact component={Search} />
                        <Route path="/profile" exact component={Profile} />
                        <Route path="/updateInfo" exact component={UpdateInfo} />
                        <Route path="/adminLogin" exact component={Admin}/>
                    </Switch>
                </div>
            </Router>
        );
    }    
}

export default App;