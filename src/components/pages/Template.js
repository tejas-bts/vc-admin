import React from "react";
import { Link } from "react-router-dom";
import Login from "../Auth/Login";
import { Switch, Route } from "react-router";
import NavBar from "../core/NavBar/NavBar";

export default function Blank() {
	return (
		<div>
      <NavBar />
      <Switch>
        {/* <Route path="/" component={Signup} /> */}
        {/* <Route exact path="/home" component={Login} /> */}
      </Switch>
		</div>
	);
}
