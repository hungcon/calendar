import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Route , BrowserRouter, Switch } from "react-router-dom";
import PrivateRoute from './Component/Routes/PrivateRoute';
import Bar from './Component/Layout/Bar';
import Home from './Component/Layout/Home';
class App extends Component {

  render() {
    return (
      <Router>
        <Switch basename={window.location.pathname || ''}>
            <Route path="/" exact component={Bar} /> 
            <PrivateRoute path="/home" exact component={Home} /> 
        </Switch >
      </Router>

    );
  }
}

export default App;