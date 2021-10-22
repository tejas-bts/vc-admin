import React from 'react';
import SuppliersList from './SuppliersList';
import NewSupplier from './NewSupplier';
import EditSupplier from './EditSupplier';
import { Switch, Route } from 'react-router';

function Suppliers({match}) {
    return (
        <Switch>
            <Route exact path={`${match.path}/`} component={SuppliersList} />
            <Route path={`${match.path}/new`} component={NewSupplier} />
            <Route exact path={`${match.path}/edit/:supplierId`} component={EditSupplier} />
        </Switch>
    )
}

export default Suppliers;
