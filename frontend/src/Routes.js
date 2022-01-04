import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import TracksContainer from "./containers/TracksContainer";
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
                <TracksContainer />
            </Route>
        </Switch>
    );
}
