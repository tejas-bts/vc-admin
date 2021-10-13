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

  const getEventColor = (statusId) => {
    if(statusId < 4) return 'status-warning';
    if(statusId === 4 || statusId === 6) return 'status-danger';
    if(statusId === 5 || statusId === 7 ) return 'status-success';
  }


  // console.log("Item",event)
  return (
    <div class={`flex-table-item ${getEventColor(event.EventSatusId)}`}>
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
      <div className="w-10" style={{ display: "flex", alignItems: "center", opacity: event.edit? 1 : 0.2 }}>
        <Link to={event.edit ? `${match.url}/edit/${event.EventId}` : '#'} key={event.EventId}>
          <span style={{ fontSize: "20px" }}>
            <FiEdit />
          </span>
        </Link>
      </div>
      <div className="w-10">
        <Link to={ (event.EventSatusId === 5)? `${match.url}/qr/${event.EventId}` : '#'} > 
        <span style={{ fontSize: "20px", opacity :(event.EventSatusId === 5)? 1 : 0.2  }}>
            <i class="fa fa-qrcode" /> 
          </span>
        </Link>
      </div>
      <div className="w-10">
        <Link to={ (event.EventSatusId === 5)? `${match.url}/feedbacks/${event.EventId}` : '#'} key={event.EventId} > 
          <span style={{ fontSize: "20px", opacity :(event.EventSatusId === 5)? 1 : 0.2  }}>
            <i class="fa fa-comments" /> 
          </span>
        </Link>
      </div>
    </div>
  );
}

export default OrganizationListItem;
