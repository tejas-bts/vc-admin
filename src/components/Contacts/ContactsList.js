import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import ContactItem from './Contacts.ListItem';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../services/category.service'
import { FiArrowDown, FiArrowUp, FiChevronDown, FiSearch } from 'react-icons/fi';
import { getAllContacts, fetchContactTypes } from '../../services/contacts.services';
import Spinner from '../../components/core/Spinner';

const initalSearchParams = {
  "supplierId" : "",
  "firstName" : "",
  "lastName" : "",
  "storeId" : "",
  "contactTypeId" : "",
  "email" : "",
  "limit" : "",
  "offset" : "",
  "sortCol" : "FirstName",
  "sortOrder" : "DESC"
}

function EventList({match}) {

    const [ loading, setLoading ] = useState(true);
    const [ categoryOptions, setOptions ] = useState([]);
    const [ contacts, setContacts ] = useState([]);
    const [ displayList, setDisplayList ] = useState([]);
    const [ searchParams, setSearchParams ] = useState(initalSearchParams);  
    const [ contactTypes, setContactTypes ] = useState([]);
    const [ listAttributes, setListAttributes ] = useState({ pageNumber : 0, pageSize: 5, pageCount: 0, sortBy: 'Zipcode', sortDirection: true })

    const handleSort = (e) => {
      console.log(e.target.getAttribute('column'));
      const column = e.target.getAttribute('column');
      let currentListAttributes = listAttributes;
      if(currentListAttributes.sortBy === column) currentListAttributes = {...currentListAttributes, sortDirection: !listAttributes.sortDirection };
      setListAttributes({...currentListAttributes, sortBy:column})
    }

    const fetchAllData = async () => {
      setLoading(true);
      const options = await getAllCategories();
      setOptions(options);
      const contacts = await getAllContacts(searchParams);
      console.log("Conatctfs" , contacts.data);
      setContacts(contacts.data);
      const newListAttributes = {...listAttributes};
      newListAttributes.pageCount = Math.ceil(contacts.length/listAttributes.pageSize);
      setListAttributes(newListAttributes);
      setLoading(false);
    }

    useEffect(() => {
      // fetchAllData();

      getAllContacts(searchParams).then((response) => {
        // console.log("Events List",response)
        const organizations = response.data;
        setContacts(organizations);
        const newListAttributes = { ...listAttributes };
        newListAttributes.pageCount = Math.ceil(
          organizations.length / listAttributes.pageSize
        );
        setListAttributes(newListAttributes);
        getAllCategories().then((response) => setOptions(response.data));
        setLoading(false);
  
      });

    }, [])

    useEffect(() => {
      console.log('Display List', displayList);
    },[displayList])

    useEffect(() => {
      fetchContactTypes()
        .then((contactTypes) => setContactTypes(contactTypes))
    }, [])

    useEffect(() => {
      console.log('List Attributes',listAttributes)
      const start = parseInt(listAttributes.pageNumber) * parseInt(listAttributes.pageSize);
      const end = start + listAttributes.pageSize;
      let orgList = [...contacts];

      if(listAttributes.sortBy !== undefined) {
        const column = listAttributes.sortBy;

        if(listAttributes.sortDirection) orgList.sort((a,b) => {
          if (a[column] < b[column]) return -1;
          if (a[column] > b[column]) return 1;
          return 0;
        })
        else orgList.sort((a,b) => {
          if (a[column] < b[column]) return 1;
          if (a[column] > b[column]) return -1;
          return 0;
        })
      }

      const displayList = [...orgList.slice(start,end)];
      setDisplayList(displayList);

    }, [listAttributes,contacts])

    return (
        <div className="settings-wrapper">
            <div className="list-controls">
                <Link to={`${match.path}new`} style={{float:'right'}}>
                        <button className="button is-solid accent-button">New Contact</button>
                </Link>
                <h1 className="admin-title">Contacts</h1>
            </div>
            <div className="list-controls">
                <div className="small-input">
                  <button className="input is-rounded admin-search-button" placeholder="Type" > <FiSearch className="mr-2"/>Search</button>
                </div>
                <div className="small-input">
                    <input className="input is-rounded" type="text" placeholder="Name" />
                    <div className="search-icon">
                        <FiSearch />
                    </div>
                </div>
                <div className="small-input">
                    <input className="input is-rounded" type="text" placeholder="Email" />
                    <div className="search-icon">
                        <FiSearch />
                    </div>
                </div>
                <div className="small-input">
                    <input className="input is-rounded" type="text" placeholder="City" />
                    <div className="search-icon">
                        <FiSearch />
                    </div>
                </div>
                <div className="small-input">
                    <input className="input is-rounded" type="text" placeholder="State" />
                    <div className="search-icon">
                        <FiSearch />
                    </div>
                </div>
                <div className="small-input">
                    <input className="input is-rounded" type="text" placeholder="Type" />
                    <div className="search-icon">
                        <FiSearch />
                    </div>
                </div>
                <div className="small-input">
                    <select className="input is-rounded" type="text" style={{paddingLeft:'30px', textAlign: 'center'}}>
                      <option disabled selected value>Select Type</option>
                      {contactTypes.map((item) => <option>{item.ContactType}</option>)}
                    </select>
                    <div className="search-icon">
                        <FiChevronDown />
                    </div>
                </div>
            </div>
            <div class="flex-table">
                <div class="flex-table-header">
                    <span class="name sort-column" onClick={handleSort} column="OrgName">
                      First Name
                      {
                        listAttributes.sortBy === "OrgName" && 
                        (listAttributes.sortDirection ? <FiArrowUp className="ml-2"/> : <FiArrowDown className="ml-2"/>)
                      }
                    </span>
                    <span class="location sort-column" onClick={handleSort} column="EventStartDateTime">
                      Last Name
                      {
                        listAttributes.sortBy === "EventStartDateTime" && 
                        (listAttributes.sortDirection ? <FiArrowUp className="ml-2"/> : <FiArrowDown className="ml-2"/>)
                      }
                    </span>
                    <span class="type sort-column" onClick={handleSort} column="OrgType">
                      Role
                      {
                        listAttributes.sortBy === "OrgType" && 
                        (listAttributes.sortDirection ? <FiArrowUp className="ml-2"/> : <FiArrowDown className="ml-2"/>)
                      }
                    </span>
                    <span class="category sort-column" onClick={handleSort} column="PresenterType">
                      Email
                      {
                        listAttributes.sortBy === "PresenterType" && 
                        (listAttributes.sortDirection ? <FiArrowUp className="ml-2"/> : <FiArrowDown className="ml-2"/>)
                      }
                    </span>
                    <span class="events-count sort-column" onClick={handleSort} column="EventNature">
                      Store
                      {
                        listAttributes.sortBy === "EventNature" && 
                        (listAttributes.sortDirection ? <FiArrowUp className="ml-2"/> : <FiArrowDown className="ml-2"/>)
                      }
                    </span>
                    <span class="edit sort-column" column="PresenterType" >Edit</span>
                </div>
                {loading ? <Spinner /> : displayList.map((item) => <ContactItem contact={item} key={item.OrgId} match={match} />)}
            </div>
            <ReactPaginate
                previousLabel={'Prev'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={listAttributes.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={(x) => setListAttributes({...listAttributes, pageNumber: x.selected})}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
    )
}

export default EventList;
