import React from 'react';
import EditEvent from './EditEvents';
import NewEvent from './NewEvent';
import EventsList from './EventsList';
import { Switch, Route } from 'react-router';

const Events = ({match}) => {
    return (
    <Switch>
        <Route path={`${match.path}/new`} component={NewEvent} />
        <Route exact path={`${match.path}/`} component={EventsList} />
        <Route exact path={`${match.path}/edit/:eventId`} component={EditEvent} />
    </Switch>
    )
}

export default Events;
