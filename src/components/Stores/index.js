import React from 'react';
import StoreList from './StoreList';
import NewStore from './NewStore';
import EditStore from './EditStore';
import { Switch, Route } from 'react-router';
import { PrivateRoute } from '../../utils/Router';
import { userPermissions } from '../../utils/user';

function Stores({match}) {
    return (
        <Switch>
            <PrivateRoute permission={userPermissions.EDIT_STORES} path={`${match.path}/new`} component={NewStore} />
            <PrivateRoute permission={userPermissions.VIEW_STORES}  exact path={`${match.path}/`} component={StoreList} />
            <PrivateRoute permission={userPermissions.EDIT_STORES}  exact path={`${match.path}/edit/:storeId`} component={EditStore} />
        </Switch>
    )
}

export default Stores;
