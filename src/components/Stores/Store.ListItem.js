import React from 'react'
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi'

function StoreListItem({store, match}) {
    return (
            <div class="flex-table-item">
                <div className="name">
                    <span>{store.StoreName}</span>
                </div>
                <div className="events-count">
                    <span>{store.TotalStores}</span>
                </div>
                <div className="location">
                    <span>{store.StoreCode}</span>
                </div>
                <div className="type">
                    <span>{store.StoreType}</span>
                </div><div className="type">
                    <span></span>
                </div>
                <div className="status">
                    <span>{store.IsActive ? "Active" : "Inactive"}</span>
                </div>
                <div className="edit" style={{display: 'flex', alignItems: 'center'}}>
                <Link to={`${match.path}edit/${store.StoreID}`} key={store.StoreID}>
                    <span style={{fontSize:'20px'}}><FiEdit /></span>    
                </Link>
                </div>
            </div>
    )
}

export default StoreListItem;
