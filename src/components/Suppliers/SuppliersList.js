import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import SuppliersListItem from './Supplier.ListItem';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../services/category.service'
import { FiArrowDown, FiArrowUp, FiChevronDown, FiSearch } from 'react-icons/fi';
import { getAllSuppliers } from '../../services/suppliers.services';
import Spinner from '../../components/core/Spinner';

function SuppliersList({match}) {

    const [ loading, setLoading ] = useState(true);
    const [ categoryOptions, setOptions ] = useState([]);
    const [ suppliers, setSuppliers ] = useState([]);
    const [ displayList, setDisplayList ] = useState([]);
    const [ listAttributes, setListAttributes ] = useState({ pageNumber : 0, pageSize: 5, pageCount: 0, sortBy: 'Zipcode', sortDirection: true })

    const handleSort = (e) => {
      console.log(e.target.getAttribute('column'));
      const column = e.target.getAttribute('column');
      let currentListAttributes = listAttributes;
      if(currentListAttributes.sortBy === column) currentListAttributes = {...currentListAttributes, sortDirection: !listAttributes.sortDirection };
      setListAttributes({...currentListAttributes, sortBy:column})
    }

    useEffect(() => {
      getAllCategories()
        .then((response) => setOptions(response.data));
        getAllSuppliers()
        .then((response) => {
          const organisations = response.data
          setSuppliers(organisations);
          const newListAttributes = {...listAttributes};
          newListAttributes.pageCount = Math.ceil(organisations.length/listAttributes.pageSize);
          setListAttributes(newListAttributes);
          setLoading(false);
        })
    }, [])

    useEffect(() => {
      console.log('Display List', displayList);
    },[displayList])

    useEffect(() => {
      console.log('List Attributes',listAttributes)
      const start = parseInt(listAttributes.pageNumber) * parseInt(listAttributes.pageSize);
      const end = start + listAttributes.pageSize;
      let orgList = [...suppliers];

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

    }, [listAttributes,suppliers])

    return (
        <div className="settings-wrapper">
            <div className="list-controls">
                <Link to={`${match.path}new`} style={{float:'right'}}>
                        <button className="button is-solid accent-button">New Supplier</button>
                </Link>
                <h1 className="admin-title">Suppliers</h1>
            </div>
            <div className="list-controls">
                <div className="small-input">
                  <button className="input is-rounded" placeholder="Type" > <FiSearch className="mr-2"/>Search</button>
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
                      <option disabled selected value>Select  Category</option>
                      {categoryOptions.map((item) => <option>{item.CategoryName}</option>)}
                    </select>
                    <div className="search-icon">
                        <FiChevronDown />
                    </div>
                </div>
            </div>
            <div class="flex-table">
                <div class="flex-table-header">
                    <span class="name sort-column" onClick={handleSort} column="SupplierName">
                      Name
                      {
                        listAttributes.sortBy === "SupplierName" && 
                        (listAttributes.sortDirection ? <FiArrowUp className="ml-2"/> : <FiArrowDown className="ml-2"/>)
                      }
                    </span>
                    <span class="type sort-column" onClick={handleSort} column="OrgType">
                      Type
                      {
                        listAttributes.sortBy === "OrgType" && 
                        (listAttributes.sortDirection ? <FiArrowUp className="ml-2"/> : <FiArrowDown className="ml-2"/>)
                      }
                    </span>
                    <span class="category sort-column" onClick={handleSort} column="OrgName">
                      Organisation
                      {
                        listAttributes.sortBy === "OrgName" && 
                        (listAttributes.sortDirection ? <FiArrowUp className="ml-2"/> : <FiArrowDown className="ml-2"/>)
                      }
                    </span>
                    <span class="events-count sort-column" onClick={handleSort} column="TotalSupplier">
                      Suppliers Count
                      {
                        listAttributes.sortBy === "TotalSupplier" && 
                        (listAttributes.sortDirection ? <FiArrowUp className="ml-2"/> : <FiArrowDown className="ml-2"/>)
                      }
                    </span>
                    <span class="edit sort-column" column="IsActive" >Edit</span>
                </div>
                {loading ? <Spinner /> : displayList.map((item) => <SuppliersListItem supplier={item} key={item.OrgId} match={match} />)}
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

export default SuppliersList;
