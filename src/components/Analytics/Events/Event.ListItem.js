import React from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiFilm, FiUser, FiStar, FiMapPin } from "react-icons/fi";

function OrganizationListItem({ event, match }) {
  // console.log("Item",event)
  return (
    <div class="flex-table-item">
      <div className="name">
        <span>{event.EventTitle}</span>
      </div>
      <div className="location">
        <span>{new Date(event.EventStartDateTime).toLocaleDateString()}</span>
      </div>

      <div className="events-count">
        <span>{event.EventNature}</span>
      </div>
      <div className="w-10" style={{ display: "flex", alignItems: "center" }}>
        <Link to={`${match.path}/eventAnalysis`}>
          <span style={{ fontSize: "20px" }}>
            <FiFilm />
          </span>
        </Link>
      </div>
      <div className="w-10">
        <Link to={`${match.path}/userAnalysis`}>
          <span style={{ fontSize: "20px" }}>
            <FiUser />
          </span>
        </Link>
      </div>
      <div className="w-10">
        <Link to={`${match.path}/ratings`}>
          <span style={{ fontSize: "20px" }}>
            <FiStar />
          </span>
        </Link>
      </div>

      <div className="w-10" style={{ display: "flex", alignItems: "center" }}>
        <Link to={`${match.path}/location`}>
          <span style={{ fontSize: "20px" }}>
            <FiMapPin />
          </span>
        </Link>
      </div>

      <div className="w-10" style={{ display: "flex", alignItems: "center" }}>
        <Link to={`${match.path}/qrscan`}>
          <span style={{ fontSize: "20px" }}>
            <i class="fa fa-qrcode" />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default OrganizationListItem;
