import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./pages/App.js";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerLocation from "./pages/CustomerLocation";
import CustomerMenu from "./pages/CustomerMenu"
import OrderDetails from "./pages/OrderDetails"
import CustomerRegister from "./pages/CustomerRegister"
import VendorLogin from "./pages/VendorLogin"
import VendorLocation from "./pages/VendorLocaiton"
import VendorMain from "./pages/VendorMain"
import UserProfile from "./pages/UserProfile"

class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={App}></Route>
                    <Route path="/Customer/Login" exact component={CustomerLogin}></Route>
                    <Route path="/Customer/Location" exact component={CustomerLocation}></Route>
                    <Route path="/Customer/Menu" exact component={CustomerMenu}></Route>
                    <Route path="/Customer/OrderDetails" exact component={OrderDetails}></Route>
                    <Route path="/Customer/Register" exact component={CustomerRegister}></Route>
                    <Route path="/Customer/Profile" exact component={UserProfile}></Route>
                    <Route path="/Vendor/Login" exact component ={VendorLogin}></Route>
                    <Route path="/Vendor/Main" exact component={VendorMain}></Route>
                    <Route path="/Vendor/Location" exact component={VendorLocation}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router