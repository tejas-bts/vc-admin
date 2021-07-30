import React from 'react';
import StoreList from './StoreList';
import NewStore from './NewStore';
import EditStore from './EditStore';
import { Switch, Route } from 'react-router';

function Organisations({match}) {
    return (
        <Switch>
            <Route path={`${match.path}/new`} component={NewStore} />
            <Route exact path={`${match.path}/`} component={StoreList} />
            <Route exact path={`${match.path}/edit/:orgId`} component={EditStore} />
        </Switch>
    )
}

export default Organisations
