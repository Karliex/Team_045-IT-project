import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Search from './pages/searchPages';
import Login from './pages/loginAdEm';
import Signup from './pages/registerAd';
import Navigation from './pages/navigation';
import UpdateInfo from './pages/changeProfile';
import Profile from './pages/profile';
import Identify from './pages/identify';
import Admin from './pages/adminLogin';
import AdminNav from './pages/adminNav';
import DeleteUser from './pages/deleteUser';
import AdminHome from './pages/adminHome';
import EditUser from './pages/editUser';
import { GlobalProvider } from './pages/globalStates';
import UserProfile from './pages/userProfile';
import ResultNav from './pages/resultNavs';
import UploadImage from './component/uploadImage';

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
                    <Route path="/adminHome" component={AdminNav} />

                    <Switch>
                        <Route exact path="/" component={Identify}/>
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={Signup} />
                        <Route path="/search" exact component={Search} />
                        <Route path="/profile" exact component={Profile} />
                        <Route path="/updateInfo" exact component={UpdateInfo} />
                        <Route path="/adminLogin" exact component={Admin}/>
                        <Route path="/uploadImage" exact component={UploadImage} />
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