import React from 'react'
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi'

function OrganizationListItem({organization, match}) {
    console.log("Item",organization)
    return (
            <div class="flex-table-item">
                <div className="name">
                    <span>{organization.OrgName}</span>
                </div>
                <div className="location">
                    <span>{organization.City}</span>
                </div>
                <div className="type">
                    <span>{organization.OrgType}</span>
                </div>
                <div className="category">
                    <span>{organization.Email}</span>
                </div>
                <div className="events-count">
                    <span>{organization.Zipcode}</span>
                </div>
                <div className="status">
                    <span>{organization.IsActive ? "Active" : "Inactive"}</span>
                </div>
                <div className="edit" style={{display: 'flex', alignItems: 'center'}}>
                <Link to={`${match.url}/edit/${organization.OrgId}`} key={organization.OrgId}>
                    <span style={{fontSize:'20px'}}><FiEdit /></span>    
                </Link>
                </div>
            </div>
    )
}

export default OrganizationListItem;
