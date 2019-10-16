import React, { Component } from 'react';
import { Route , BrowserRouter as Router , Switch } from "react-router-dom";
import PrivateRoute from './Component/Routes/PrivateRoute';
import Bar from './Component/Layout/Bar';
import Home from './Component/Layout/Home';
class App extends Component {

  render() {
    console.log(window.location.pathname)
    return (
      <Router>
        <Switch >
            <Route path="/" exact component={Bar} /> 
            <PrivateRoute path="/home" exact component={Home} /> 
        </Switch >
      </Router>
    );
  }
}

export default App;
