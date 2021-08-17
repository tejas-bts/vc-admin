import React from 'react'
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
// import ResetPassword from "./ResetPassword";
// import ForgotPassword from "./ForgotPassword";
// import Verify from "./Verify";

const index = ({match}) => {
    console.log('match', `${match.path}/login`)
    return (
        <Switch>
            <Route exact path={`${match.path}/login`} component={Login} />
            {/* <Route exact path={`${match.path}/reset-password`} component={ResetPassword} />
            <Route exact path={`${match.path}/forgot-password`} component={ForgotPassword} />
            <Route exact path={`${match.path}/verify`} component={Verify} /> */}
        </Switch>
    )
}

export default index