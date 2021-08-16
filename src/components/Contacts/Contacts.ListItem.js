import React from 'react'
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi'

function ContactListItem({contact, match}) {
    console.log("Item",contact)
    return (
        <div class="flex-table-item">
            <div className="name">
                <span>{contact.FirstName}</span>
            </div>
            <div className="location">
                <span>{contact.LastName}</span>
            </div>
            <div className="type">
                <span>{contact.ContactType}</span>
            </div>
            <div className="category">
                <span>{contact.Email}</span>
            </div>
            <div className="events-count">
                <span>{contact.StoreName}</span>
            </div>
            <div className="edit" style={{display: 'flex', alignItems: 'center'}}>
            <Link to={`${match.url}/edit/${contact.ContactId}`} key={contact.ContactId}>
                <span style={{fontSize:'20px'}}><FiEdit /></span>    
            </Link>
            </div>
        </div>
    )
}

export default ContactListItem;
