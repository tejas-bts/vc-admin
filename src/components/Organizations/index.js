import React from 'react';
import OrganizationList from './OrganizationList';
import NewOrganization from './NewOrganization';
import EditOrganization from './EditOrganization';
import { Switch, Route } from 'react-router';

function Organizations({match}) {
    console.log("We are here index", match);
    return (
        <Switch>
            <Route path={`${match.path}/new`} component={NewOrganization} />
            <Route exact path={`${match.path}/`} component={OrganizationList} />
            <Route exact path={`${match.path}/edit/:orgId`} component={EditOrganization} />
        </Switch>
    )
}

export default Organizations
