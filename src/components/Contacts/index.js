import React from 'react';
import EditContacts from './EditContacts';
import NewContact from './NewContact';
import ContactList from './ContactsList';
import { Switch, Route } from 'react-router';

const Events = ({match}) => {
    return (
    <Switch>
        <Route path={`${match.path}/new`} component={NewContact} />
        <Route exact path={`${match.path}/`} component={ContactList} />
        <Route exact path={`${match.path}/edit/:eventId`} component={EditContacts} />
    </Switch>
    )
}

export default Events;
