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
import Logout from './logout'

import AdminHome from './adminHome'
import EditUser from './editUser'
import AddUser from './addUser'
import { GlobalProvider } from './GlobalState'
import UserProfile from './userProfile'
import ResultNav from './ResultNav'


class App extends Component {

    render() {
        return ( 
            <GlobalProvider>
                <Router>
                <div>
                    <Route path="/search" component={Navigation} />
                    <Route path="/updateInfo" component={Navigation} />
                    <Route path="/profile" component={Navigation} />

                    <Route path="/resultProfile" component={ResultNav} />

                    <Switch>
                        <Route exact path="/" component={Identify}/>
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={Signup} />
                        <Route path="/search" exact component={Search} />
                        <Route path="/profile" exact component={Profile} />
                        <Route path="/updateInfo" exact component={UpdateInfo} />
                        <Route path="/adminLogin" exact component={Admin}/>

                        <Route path="/adminHome" component={AdminHome} />
                        
                        <Route path="/editUser/:id" component={EditUser} />
                        <Route path="/resultProfile" exact component={UserProfile}/>
                    </Switch>
                </div>
                </Router>
            </GlobalProvider>
        );
    }    
}

export default App;