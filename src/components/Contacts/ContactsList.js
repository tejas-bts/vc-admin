import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import ContactItem from './Contacts.ListItem';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../services/category.service'
import { FiArrowDown, FiArrowUp, FiChevronDown, FiSearch } from 'react-icons/fi';
import { getAllContacts, fetchContactTypes } from '../../services/contacts.services';
import Spinner from '../../components/core/Spinner';
import { getCurrentUser } from '../../utils/user';

function EventList({match}) {

  const initalSearchParams = {
    "supplierId" : "",
    "firstName" : "",
    "lastName" : "",
    "storeId" : getCurrentUser().storeId,
    "contactTypeId" : "",
    "email" : "",
    "limit" : "",
    "offset" : "",
    "sortCol" : "FirstName",
    "sortOrder" : "DESC"
  }
  

    const [ loading, setLoading ] = useState(true);
    const [ categoryOptions, setOptions ] = useState([]);
    const [ contacts, setContacts ] = useState([]);
    const [ searchParams, setSearchParams ] = useState(initalSearchParams);  
    const [ contactTypes, setContactTypes ] = useState([]);
    const [ listAttributes, setListAttributes ] = useState({ pageNumber : 0, pageSize: 5, totalPages: 0 })

    const handleSort = async (e) => {
      const column = e.target.getAttribute("column");
      if(searchParams.sortCol === column) {
        setSearchParams({...searchParams, sortOrder: (searchParams.sortOrder === "ASC" ? "DESC" : "ASC")});
      }
      else setSearchParams({...searchParams, sortCol: column, sortOrder: searchParams.sortOrder });
      fetchAllData();
    }

    const handleSearch = () => {
      fetchAllData();
    }

    const handleReset = () => {
      getAllContacts();
    }

    useEffect(() => {
      console.log("Contacts", contacts);
    }, [contacts])

    const fetchAllData = async () => {
      try {
        setLoading(true);

        const contactTypes = await fetchContactTypes();
        const categories = await getAllCategories();
        const allContacts = await getAllContacts(searchParams);
        const paginationData = allContacts.pageDetails;

        console.log("contactTypes", contactTypes);
        console.log("categories", categories);
        console.log("allContacts", allContacts);
        console.log("paginationData", paginationData);

        setContactTypes(contactTypes);
        setOptions(categories.data);
        setContacts(allContacts);
        setListAttributes({ 
          pageNumber : paginationData.pageNumber,
          pageSize: paginationData.pageSize,
          pageCount: paginationData.totalPages
        })
      }
      catch (error) {
        console.log(error.message);
      }
      finally {
        setLoading(false);
      }
    }

    useEffect( () => {
      fetchAllData();
      setSearchParams({ ...searchParams, storeId: getCurrentUser().storeId });
    }, [])

    return (
        <div className="settings-wrapper">
          <div className="list-controls">          
            <h1 className="admin-title">Contacts</h1>
            <Link to={`${match.path}new`} style={{float:'right'}}>
                    <button className="button is-solid accent-button">New Contact</button>
            </Link>
          </div>
          <div className="list-controls justify-content-center">   
              <div className="d-flex flex-row">
                <div className="small-input">
                    <input 
                      className="input is-rounded"
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      onChange={(e) => setSearchParams({...searchParams, [e.target.name]: e.target.value })}
                    />
                    <div className="search-icon">
                        <FiSearch />
                    </div>
                </div>
                <div className="small-input">
                    <input 
                      className="input is-rounded"
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      onChange={(e) => setSearchParams({...searchParams, [e.target.name]: e.target.value })}
                    />
                    <div className="search-icon">
                        <FiSearch />
                    </div>
                </div>
                <div className="small-input">
                  <select
                    className="input is-rounded"
                    type="text"
                    name="contactTypeId"
                    onChange={(e) => setSearchParams({...searchParams, [e.target.name]: e.target.value })}
                    style={{paddingLeft:'30px', textAlign: 'center'}}
                  >
                    <option disabled selected value>Select Type</option>
                    {contactTypes.map((item) => <option value={item.ContactTypeId}>{item.ContactType}</option>)}
                  </select>
                  <div className="search-icon">
                      <FiChevronDown />
                  </div>
                </div>
                <div className="small-input">
                  <input 
                    className="input is-rounded"
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setSearchParams({...searchParams, [e.target.name]: e.target.value })}
                  />
                  <div className="search-icon">
                    <FiSearch />
                  </div>
                </div>       
                <div className="small-input">
                  <button
                    className="input is-rounded admin-search-button"
                    placeholder="Type"
                    onClick={handleSearch}
                  >
                    <FiSearch className="mr-2"/>
                    Search
                  </button>
                </div>   
                <div className="small-input">
                  <button
                    className="input is-rounded"
                    placeholder="Type"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </div>
          </div>
          <div class="flex-table">
            <div class="flex-table-header">
              <span class="w-15 sort-column" onClick={handleSort} column="FirstName">
                First Name
                {
                  searchParams.sortCol === "FirstName" && 
                  (searchParams.sortOrder === "ASC" ? <FiArrowUp className="ml-2"/> : <FiArrowDown className="ml-2"/>)
                }
              </span>
              <span class="w-15 sort-column" onClick={handleSort} column="LastName">
                Last Name
                {
                  searchParams.sortCol === "LastName" && 
                  (searchParams.sortOrder === "ASC" ? <FiArrowUp className="ml-2"/> : <FiArrowDown className="ml-2"/>)
                }
              </span>
              <span class="w-15 sort-column" onClick={handleSort} column="ContactType">
                Role
                {
                  searchParams.sortCol === "ContactType" && 
                  (searchParams.sortOrder === "ASC" ? <FiArrowUp className="ml-2"/> : <FiArrowDown className="ml-2"/>)
                }
              </span>
              <span class="w-25 sort-column" onClick={handleSort} column="Email">
                Email
                {
                  searchParams.sortCol === "Email" && 
                  (searchParams.sortOrder === "ASC" ? <FiArrowUp className="ml-2"/> : <FiArrowDown className="ml-2"/>)
                }
              </span>
              <span class="w-25 sort-column" onClick={handleSort} column="StoreName">
                Store
                {
                  searchParams.sortCol === "StoreName" && 
                  (searchParams.sortOrder === "ASC" ? <FiArrowUp className="ml-2"/> : <FiArrowDown className="ml-2"/>)
                }
              </span>
              <span class="w-5 sort-column" column="PresenterType" >Edit</span>
            </div>
            {loading ? <Spinner /> : contacts.map((item) => <ContactItem contact={item} key={item.OrgId} match={match} />)}
          </div>
          {(listAttributes.totalPages > 1) && <ReactPaginate
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
          />}
        </div>
    )
}

export default EventList;
