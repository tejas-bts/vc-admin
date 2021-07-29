import React from 'react';
import OrganisationList from './OrganisationList';
import NewOrganisation from './NewOrganisation';
import EditOrganisation from './EditOrganisation';
import { Switch, Route } from 'react-router';

function Organisations({match}) {
    console.log("We are here index", match);
    return (
        <Switch>
            <Route path={`${match.path}/new`} component={NewOrganisation} />
            <Route exact path={`${match.path}/`} component={OrganisationList} />
            <Route exact path={`${match.path}/edit/:orgId`} component={EditOrganisation} />
        </Switch>
    )
}

export default Organisations
