import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Search from './pages/searchP'
import Login from './pages/login'
import Signup from './pages/registerAdmin'
import Navigation from './pages/navigation'
import UpdateInfo from './pages/changeProfiles'
import Profile from './pages/profile'
import Identify from './pages/identifyAdEm'
import Admin from './pages/adminsLogin'
import Logout from './pages/logout'
import DeleteUser from './pages/deleteUsers'
import AdminHome from './pages/adminsHome'
import EditUser from './pages/editUsers'
import AddUser from './pages/addUsers'
import { GlobalProvider } from './pages/globalStates'
import UserProfile from './pages/usersProfile'
import ResultNav from './pages/resultNavs'


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
                        <Route path="/delete/:id" component={DeleteUser} />
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