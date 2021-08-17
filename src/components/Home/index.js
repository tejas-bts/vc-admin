import React from 'react'
import { Switch, Route } from "react-router-dom";
import Organizations from '../Organizations';
import Suppliers from '../Suppliers';
import Stores from '../Stores';
import Contacts from '../Contacts';
import Events from '../Events';
import NavBar from "../../components/core/NavBar/NavBar";
import Menu from "../core/Menu";


const index = (props) => {
    const { match } = props;
    return (
        <div className="view-wrapper is-full">
            <NavBar />
            <Menu  {...props} />
            <Switch>
                <Route path={`${match.path}/organizations`} component={Organizations} />
                <Route path={`${match.path}/suppliers`} component={Suppliers} />
                <Route path={`${match.path}/stores`} component={Stores} />
                <Route path={`${match.path}/contacts`} component={Contacts} />
                <Route path={`${match.path}/events`} component={Events} />
            </Switch>
        </div>
    )
}

export default index