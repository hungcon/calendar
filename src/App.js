import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import MyRoutes from './Component/Routes/MyRoutes';
import {firebaseConnect} from './firebaseConnect'
class App extends Component {

  render() {
    // console.log(firebaseConnect)
    return (
      <Router>
        <div className="App">
          <MyRoutes />
        </div>
      </Router>

    );
  }
}

export default App;