import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Tracks from "./containers/Tracks";
import Login from "./containers/Login";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/tracks">
                <Tracks />
            </Route>
        </Switch>
    );
}
