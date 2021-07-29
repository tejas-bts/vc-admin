import React from "react";
import { Link } from "react-router-dom";

function Explorer({ isActive }) {
  return (
    <div className={`explorer-menu ${isActive && "is-active"}`}>
      <div className="explorer-inner">
        <div className="explorer-container">
          {/*Header*/}
          <div className="explorer-header">
            <h3>Explore</h3>
          </div>
          {/*List*/}
          <div className="explore-list has-slimscroll">
            {/*item*/}
            <Link to="/home" className="explore-item">
              <img src="assets/img/icons/explore/clover.svg" alt />
              <h4>Home</h4>
            </Link>
            {/*item*/}
            <Link to="/userProfile" className="explore-item">
              <img src="assets/img/icons/explore/calendar.svg" alt />
              <h4>Events</h4>
            </Link>
            {/*item*/}

            <Link to="/userProfile" className="explore-item">
              <img src="assets/img/icons/explore/settings.svg" alt />
              <h4>Settings</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explorer;
