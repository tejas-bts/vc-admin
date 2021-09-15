import React from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

function OrganizationListItem({ event, match }) {

  
  const printEventStatus = (statusId) => {
    const statusTitle = {
      1:'Waiting approval',
      2:'Waiting to be published',
      3:'Waiting review',
      4:'Closed',
      5:'Published',
      6:'Cancelled',
      7:'Completed', 
    }

    return statusTitle[statusId];
  }

  // console.log("Item",event)
  return (
    <div class="flex-table-item">
      <div className="w-50">
        <span>{event.EventTitle}</span>
      </div>
      <div className="location">
        <span>{new Date(event.EventStartDateTime).toLocaleDateString()}</span>
      </div>
      <div className="type">
        <span>{printEventStatus(event.EventSatusId)}</span>
      </div>
      <div className="w-20 text-center" style={{ display: "flex", justifyContent: "center" }}>
        <Link to={`${match.path}${event.EventId}`} style={{ float: "right" }}>
          <button className="button is-solid accent-button">View Details</button>
        </Link>
      </div>
    </div>
  );
}

export default OrganizationListItem;
