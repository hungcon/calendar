import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import MyRoutes from './Component/Routes/MyRoutes';

class App extends Component {

  render() {
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