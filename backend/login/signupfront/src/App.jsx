import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import loginFront from './loginFront'
import registerFront from './registerFront'

class App extends Component {
    


    render() {
        return ( 
            <Router>
                <div>
                    <Switch>
                        <Route path="/login" component={loginFront} />
                        <Route path="/signup" component={registerFront} />
                    </Switch>
                </div>
            </Router>
        );
    }    
}

export default App;