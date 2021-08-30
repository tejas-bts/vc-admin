import React from 'react';
import EditEvent from './EditEvents';
import NewEvent from './NewEvent';
import EventsList from './EventsList';
import QRCodes from './QRCodes';
import FeedBack from './FeedBack';
import { Switch, Route } from 'react-router';

const Events = ({match}) => {
    return (
    <Switch>
        <Route path={`${match.path}/new`} component={NewEvent} />
        <Route exact path={`${match.path}/`} component={EventsList} />
        <Route exact path={`${match.path}/edit/:eventId`} component={EditEvent} />
        <Route exact path={`${match.path}/qr/:eventId`} component={QRCodes} />
        <Route exact path={`${match.path}/feedbacks/:eventId`} component={FeedBack} />
    </Switch>
    )
}

export default Events;
