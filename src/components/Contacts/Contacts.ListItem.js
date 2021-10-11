import React from 'react'
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi'

function ContactListItem({contact, match}) {
    return (
        <div class="flex-table-item">
            <div className="w-15">
                <span>{contact.FirstName}</span>
            </div>
            <div className="w-15">
                <span>{contact.LastName}</span>
            </div>
            <div className="w-15">
                <span>{contact.ContactType}</span>
            </div>
            <div className="w-25">
                <span>{contact.Email}</span>
            </div>
            <div className="w-25">
                <span>{contact.StoreName}</span>
            </div>
            <div className="w-5" style={{display: 'flex', alignItems: 'center'}}>
            <Link 
                key={contact.ContactId}
                to={{
                    pathname: `${match.url}/edit/${contact.ContactId}`,
                    state: contact
                }}
            >
                <span style={{fontSize:'20px'}}><FiEdit /></span>    
            </Link>
            </div>
        </div>
    )
}

export default ContactListItem;
