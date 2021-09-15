import React from 'react';
import EventRequestsList from './EventRequestsList';
import EventDetails from './EventDetails';
import { Switch, Route } from 'react-router';

const Events = ({match}) => {
    console.log("Match in req", match);
    return (
    <Switch>
        <Route exact path={`${match.path}/`} component={EventRequestsList} />
        <Route exact path={`${match.path}/:eventId`} component={EventDetails} />
    </Switch>
    )
}

export default Events;
