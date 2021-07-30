import React from 'react'
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi'

function OrganisationListItem({organisation, match}) {
    return (
            <div class="flex-table-item">
                <div className="name">
                    <span>{organisation.OrgName}</span>
                </div>
                <div className="location">
                    <span>{organisation.City}</span>
                </div>
                <div className="type">
                    <span>{organisation.OrgType}</span>
                </div>
                <div className="category">
                    <span>{organisation.Email}</span>
                </div>
                <div className="events-count">
                    <span>{organisation.Zipcode}</span>
                </div>
                <div className="status">
                    <span>{organisation.IsActive ? "Active" : "Inactive"}</span>
                </div>
                <div className="edit" style={{display: 'flex', alignItems: 'center'}}>
                <Link to={`${match.path}edit/${organisation.OrgId}`} key={organisation.OrgId}>
                    <span style={{fontSize:'20px'}}><FiEdit /></span>    
                </Link>
                </div>
            </div>
    )
}

export default OrganisationListItem;
