import React from 'react'
import { Switch, Route } from "react-router-dom";
import Organizations from '../Organizations';
import Suppliers from '../Suppliers';
import Stores from '../Stores';
import Contacts from '../Contacts';
import Events from '../Events';
import NavBar from "../../components/core/NavBar/NavBar";
import Menu from "../core/Menu";
import { PrivateRoute } from '../../utils/Router';
import { userPermissions } from '../../utils/user';


const index = (props) => {
    const { match } = props;
    return (
        <div className="view-wrapper is-full">
            <NavBar />
            <Menu  {...props} />
            <Switch>
                <PrivateRoute permission={userPermissions.VIEW_ORGS} path={`${match.path}/organizations`} component={Organizations} />
                <PrivateRoute permission={userPermissions.VIEW_SUPPLIERS}  path={`${match.path}/suppliers`} component={Suppliers} />
                <PrivateRoute permission={userPermissions.VIEW_STORES}  path={`${match.path}/stores`} component={Stores} />
                <PrivateRoute permission={userPermissions.VIEW_USERS}  path={`${match.path}/contacts`} component={Contacts} />
                <PrivateRoute permission={userPermissions.VIEW_EVENTS}  path={`${match.path}/events`} component={Events} />
                {/* <PrivateRoute permission={12}  path={`${match.path}/report`} component={frame} /> */}
            </Switch>
        </div>
    )
}

export default index