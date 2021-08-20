import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import StoreListItem from "./Store.ListItem";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../services/category.service";
import {
  FiArrowDown,
  FiArrowUp,
  FiChevronDown,
  FiSearch,
} from "react-icons/fi";
import { getAllStores } from "../../services/stores.services";
import Spinner from "../../components/core/Spinner";

function StoreList({ match }) {
  const initalSearchParams = {
    storeId: "",
    storeName: "",
    supplierId: "",
    storeCode: "",
    ediId: "",
    licenseNumber: "",
    firstRow: "",
    lastRow: "",
    sortColumn: "SupplierId",
    sortOrder: "DESC",
  };

  const [loading, setLoading] = useState(true);
  const [categoryOptions, setOptions] = useState([]);
  const [stores, setStores] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [searchParams, setSearchParams] = useState(initalSearchParams);
  const [listAttributes, setListAttributes] = useState({
    pageNumber: 0,
    pageSize: 5,
    pageCount: 0,
    sortBy: "Zipcode",
    sortDirection: true,
  });

  const handleSort = async (e) => {
    const column = e.target.getAttribute("column");
    if (searchParams.sortCol === column) {
      setSearchParams({
        ...searchParams,
        sortOrder: searchParams.sortOrder === "ASC" ? "DESC" : "ASC",
      });
    } else
      setSearchParams({
        ...searchParams,
        sortCol: column,
        sortOrder: searchParams.sortOrder,
      });
  };

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const categories = await getAllCategories();
      setOptions(categories.data);
      const response = await getAllStores();
      const stores = response.data;
      setStores(stores);
      const newListAttributes = { ...listAttributes };
      newListAttributes.pageCount = Math.ceil(
        stores.length / listAttributes.pageSize
      );
      setListAttributes(newListAttributes);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // getAllCategories()
    //   .then((response) => setOptions(response.data));
    // getAllStores()
    //   .then((response) => {
    //     const stores = response.data
    //     setStores(stores);
    //     const newListAttributes = {...listAttributes};
    //     newListAttributes.pageCount = Math.ceil(stores.length/listAttributes.pageSize);
    //     setListAttributes(newListAttributes);
    //     setLoading(false);
    //   })
    fetchAllData();
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [searchParams]);

  useEffect(() => {
    console.log("Display List", displayList);
  }, [displayList]);

  useEffect(() => {
    console.log("List Attributes", listAttributes);
    const start =
      parseInt(listAttributes.pageNumber) * parseInt(listAttributes.pageSize);
    const end = start + listAttributes.pageSize;
    let storeList = [...stores];

    if (listAttributes.sortBy !== undefined) {
      const column = listAttributes.sortBy;

      if (listAttributes.sortDirection)
        storeList.sort((a, b) => {
          if (a[column] < b[column]) return -1;
          if (a[column] > b[column]) return 1;
          return 0;
        });
      else
        storeList.sort((a, b) => {
          if (a[column] < b[column]) return 1;
          if (a[column] > b[column]) return -1;
          return 0;
        });
    }

    const displayList = [...storeList.slice(start, end)];
    setDisplayList(displayList);
  }, [listAttributes, stores]);

  return (
    <div className="settings-wrapper">
      <div className="list-controls">
        <Link to={`${match.path}new`} style={{ float: "right" }}>
          <button className="button is-solid accent-button">New Store</button>
        </Link>
        <h1 className="admin-title">Stores</h1>
      </div>
      <div className="list-controls">
        <div className="small-input">
          <button className="input is-rounded" placeholder="Type">
            {" "}
            <FiSearch className="mr-2" />
            Search
          </button>
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
          <select
            className="input is-rounded"
            type="text"
            style={{ paddingLeft: "30px", textAlign: "center" }}>
            <option disabled selected value>
              Select Category
            </option>
            {categoryOptions.map((item) => (
              <option>{item.CategoryName}</option>
            ))}
          </select>
          <div className="search-icon">
            <FiChevronDown />
          </div>
        </div>
      </div>
      <div class="flex-table">
        <div class="flex-table-header">
          <span
            class="name sort-column"
            onClick={handleSort}
            column="StoreName">
            Name
            {listAttributes.sortBy === "StoreName" &&
              (listAttributes.sortDirection ? (
                <FiArrowUp className="ml-2" />
              ) : (
                <FiArrowDown className="ml-2" />
              ))}
          </span>
          {/* <span class="location sort-column" onClick={handleSort} column="TotalStores">
                      Store Count
                      {
                        listAttributes.sortBy === "TotalStores" && 
                        (listAttributes.sortDirection ? <FiArrowUp className="ml-2"/> : <FiArrowDown className="ml-2"/>)
                      }
                    </span> */}
          <span
            class="type sort-column"
            onClick={handleSort}
            column="StoreCode">
            Store Code
            {listAttributes.sortBy === "StoreCode" &&
              (listAttributes.sortDirection ? (
                <FiArrowUp className="ml-2" />
              ) : (
                <FiArrowDown className="ml-2" />
              ))}
          </span>
          <span
            class="category sort-column"
            onClick={handleSort}
            column="StoreType">
            Store Type
            {listAttributes.sortBy === "StoreType" &&
              (listAttributes.sortDirection ? (
                <FiArrowUp className="ml-2" />
              ) : (
                <FiArrowDown className="ml-2" />
              ))}
          </span>
          <span
            class="status sort-column"
            onClick={handleSort}
            column="IsActive">
            Active
            {listAttributes.sortBy === "IsActive" &&
              (listAttributes.sortDirection ? (
                <FiArrowUp className="ml-2" />
              ) : (
                <FiArrowDown className="ml-2" />
              ))}
          </span>
          <span class="edit sort-column" column="IsActive">
            Edit
          </span>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          displayList.map((item) => (
            <StoreListItem store={item} key={item.OrgId} match={match} />
          ))
        )}
      </div>
      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={listAttributes.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={(x) =>
          setListAttributes({ ...listAttributes, pageNumber: x.selected })
        }
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default StoreList;
