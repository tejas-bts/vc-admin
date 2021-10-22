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
      <div className="events-count">
        <span>{printEventStatus(event.EventSatusId)}</span>
      </div>
      <div className="w-10" style={{ display: "flex", alignItems: "center" }}>
        <Link to={`../edit/${event.EventId}`} key={event.EventId}>
          <span style={{ fontSize: "20px" }}>
            <FiEdit />
          </span>
        </Link>
      </div>
      <div className="w-10">
        <Link to={`../qr/${event.EventId}`} key={event.EventId} > 
          <span style={{ fontSize: "20px" }}>
            <i class="fa fa-qrcode" /> 
          </span>
        </Link>
      </div>
      <div className="w-10">
        <Link to={`${match.url}/../feedbacks/${event.EventId}`} key={event.EventId} > 
          <span style={{ fontSize: "20px" }}>
            <i class="fa fa-comments" /> 
          </span>
        </Link>
      </div>
    </div>
  );
}

export default OrganizationListItem;
