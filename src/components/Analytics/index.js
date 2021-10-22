import React from "react";
import { Switch, Route } from "react-router-dom";
import EventList from "./Events/EventsList";
import NavBar from "../../components/core/NavBar/NavBar";
import Menu from "../core/Menu";
import { Link } from "react-router-dom";
import { FiFilm, FiShoppingCart, FiCalendar } from "react-icons/fi";
import QRScan from "./Reports/qrscan";
import Location from "./Reports/location";
import Ratings from "./Reports/ratings";
import UserAnalysis from "./Reports/userAnalysis";
import EventAnalysis from "./Reports/eventAnalysis";
import Summary from "./Summary";

const Analytics = (props) => {
  const { match } = props;
  return (
    <div className="view-wrapper is-full">
      <Menu {...props} />
     
        <Switch>
          <Route
            exact
            path={`${match.path}`}
            component={Summary}
          />
          <Route
            exact
            path={`${match.path}/eventsDetails`}
            component={EventList}
          />
          <Route
            path={`${match.path}/eventsDetails/eventAnalysis`}
            component={EventAnalysis}
          />
          <Route
            path={`${match.path}/eventsDetails/qrscan`}
            component={QRScan}
          />
          <Route
            path={`${match.path}/eventsDetails/location`}
            component={Location}
          />
          <Route
            path={`${match.path}/eventsDetails/ratings`}
            component={Ratings}
          />
          <Route
            path={`${match.path}/eventsDetails/userAnalysis`}
            component={UserAnalysis}
          />
          {/* <Route path={`${match.path}/dates`} component={Stores} /> */}
          {/* <Route path={`${match.path}/report`} component={frame} /> */}
        </Switch>
        
     
      <NavBar />
    </div>
  );
};

export default Analytics;
