import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Login from "../Layout/Login";
import SignInDialog from "../Dialog/SignInDialog";

class MyRoutes extends Component {
    render() {
        return (
            <div>
                <Route path="/" exact component={Login} />
                {/* <Route path="/login" exact component={SignInDialog} /> */}
            </div>
        )
    }
}

export default MyRoutes;