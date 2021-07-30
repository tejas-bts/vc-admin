import React from 'react'
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi'

function SupplierListItem({supplier, match}) {
    return (
            <div class="flex-table-item">
                <div className="name">
                    <span>{supplier.SupplierName}</span>
                </div>
                <div className="type">
                    <span>{supplier.SupplierType}</span>
                </div>
                <div className="category">
                    <span>{supplier.OrgName}</span>
                </div>
                <div className="events-count">
                    <span>{supplier.Zipcode}</span>
                </div>
                <div className="status">
                    <span>{supplier.IsActive ? "Active" : "Inactive"}</span>
                </div>
                <div className="edit" style={{display: 'flex', alignItems: 'center'}}>
                <Link to={`${match.url}/edit/${supplier.SupplierID}`} key={supplier.SupplierID}>
                    <span style={{fontSize:'20px'}}><FiEdit /></span>    
                </Link>
                </div>
            </div>
    )
}

export default SupplierListItem;
