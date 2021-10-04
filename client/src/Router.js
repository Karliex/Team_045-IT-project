import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Search from './pages/SearchPage';
import Login from './pages/Login';
import Signup from './pages/Register';
import Navigation from './pages/Navigation';
import UpdateInfo from './pages/ChangeProfile';
import Profile from './pages/Profile';
import Identify from './pages/Identify';
import Admin from './pages/AdminLogin';
import DeleteUser from './pages/DeleteUser';
import AdminHome from './pages/AdminHome';
import EditUser from './pages/EditUser';
import { GlobalProvider } from './pages/GlobalState';
import UserProfile from './pages/UserProfile';
import ResultNav from './pages/ResultNav';

//give the route of each page
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
