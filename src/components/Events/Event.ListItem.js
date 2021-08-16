import React from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

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
      <div className="type">
        <span>{event.EventType}</span>
      </div>
      <div className="category">
        <span>{event.PresenterType}</span>
      </div>
      <div className="events-count">
        <span>{event.EventNature}</span>
      </div>
      <div className="status">
        <span>{event.PresenterType}</span>
      </div>
      <div className="edit" style={{ display: "flex", alignItems: "center" }}>
        <Link to={`${match.url}/edit/${event.EventId}`} key={event.EventId}>
          <span style={{ fontSize: "20px" }}>
            <FiEdit />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default OrganizationListItem;
