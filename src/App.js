import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import MemberLogin from "./components/member-login.component";
import CreateUser from "./components/create-user.component";


function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={MemberLogin} />
      <Route path="/user" component={CreateUser} />
    </Router>
  );
}

export default App;
