import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import SuppliersListItem from "./Supplier.ListItem";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../services/category.service";
import {
  FiArrowDown,
  FiArrowUp,
  FiChevronDown,
  FiSearch,
} from "react-icons/fi";
import { getAllSuppliers } from "../../services/suppliers.services";
import Spinner from "../../components/core/Spinner";
import { getCurrentUser, userPermissions } from "../../utils/user";
import { RenderWithPermission } from "../../utils/ConditionalRenderer";

function SuppliersList({ match }) {
  const initalSearchParams = {
    supplierID: "",
    supplierName: "",
    orgId: "",
    supplierType: "",
    firstRow: "1",
    lastRow: "10",
    sortColumn: "SupplierType",
    sortOrder: "DESC",
    pagesize: 10,
    pageNumber: 1,
  };

  const [loading, setLoading] = useState(true);
  const [categoryOptions, setOptions] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [searchParams, setSearchParams] = useState(initalSearchParams);
  const [displayList, setDisplayList] = useState([]);
  const [listAttributes, setListAttributes] = useState({
    pageNumber: 0,
    pageSize: 5,
    pageCount: 0,
    sortBy: "Zipcode",
    sortDirection: true,
  });

  const handleSort = (e) => {
    console.log(e.target.getAttribute("column"));
    const column = e.target.getAttribute("column");
    let currentListAttributes = listAttributes;
    if (currentListAttributes.sortBy === column)
      currentListAttributes = {
        ...currentListAttributes,
        sortDirection: !listAttributes.sortDirection,
      };
    setListAttributes({ ...currentListAttributes, sortBy: column });
  };

  const handleSearch = () => {
    fetchAllData(searchParams);
  };

  const handleReset = () => {
    fetchAllData();
  };

  const fetchAllData = (searchParams) => {
    getAllSuppliers(searchParams).then((response) => {
      const organizations = response.data;
      setSuppliers(organizations);
      const newListAttributes = { ...listAttributes };
      newListAttributes.pageCount = Math.ceil(
        organizations.length / listAttributes.pageSize
      );
      setListAttributes(newListAttributes);
      setLoading(false);
    });
  };

  useEffect(() => {
    console.log("Search Params", searchParams);
  }, [searchParams]);

  useEffect(() => {
    getAllCategories().then((response) => setOptions(response.data));
    fetchAllData();
  }, []);

  useEffect(() => {
    console.log("List Attributes", listAttributes);
    const start =
      parseInt(listAttributes.pageNumber) * parseInt(listAttributes.pageSize);
    const end = start + listAttributes.pageSize;
    let orgList = [...suppliers];

    if (listAttributes.sortBy !== undefined) {
      const column = listAttributes.sortBy;

      if (listAttributes.sortDirection)
        orgList.sort((a, b) => {
          if (a[column] < b[column]) return -1;
          if (a[column] > b[column]) return 1;
          return 0;
        });
      else
        orgList.sort((a, b) => {
          if (a[column] < b[column]) return 1;
          if (a[column] > b[column]) return -1;
          return 0;
        });
    }

    const displayList = [...orgList.slice(start, end)];
    setDisplayList(displayList);
  }, [listAttributes, suppliers]);

  return (
    <div className="settings-wrapper">
      <div className="list-controls">
        <h1 className="admin-title">Suppliers</h1>
        <RenderWithPermission permission={userPermissions.EDIT_SUPPLIERS}>
          <Link to={`${match.path}new`} style={{ float: "right" }}>
            <button className="button is-solid accent-button">
              New Supplier
            </button>
          </Link>
        </RenderWithPermission>
      </div>
      <div className="list-controls justify-content-center">
        <div className="small-input">
          <input
            className="input is-rounded"
            type="text"
            placeholder="Name"
            name="supplierName"
            onChange={(e) =>
              setSearchParams({
                ...searchParams,
                [e.target.name]: e.target.value,
              })
            }
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
            <FiSearch className="mr-2" />
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
      <div class="flex-table">
        <div class="flex-table-header">
          <span
            class="w-30 sort-column"
            onClick={handleSort}
            column="SupplierName"
          >
            Name
            {listAttributes.sortBy === "SupplierName" &&
              (listAttributes.sortDirection ? (
                <FiArrowUp className="ml-2" />
              ) : (
                <FiArrowDown className="ml-2" />
              ))}
          </span>
          <span class="w-20 sort-column" onClick={handleSort} column="OrgType">
            Type
            {listAttributes.sortBy === "OrgType" &&
              (listAttributes.sortDirection ? (
                <FiArrowUp className="ml-2" />
              ) : (
                <FiArrowDown className="ml-2" />
              ))}
          </span>
          <span class="w-30 sort-column" onClick={handleSort} column="OrgName">
            Organization
            {listAttributes.sortBy === "OrgName" &&
              (listAttributes.sortDirection ? (
                <FiArrowUp className="ml-2" />
              ) : (
                <FiArrowDown className="ml-2" />
              ))}
          </span>
          <span
            class="w-10 sort-column"
            onClick={handleSort}
            column="TotalSupplier"
          >
            Suppliers Count
            {listAttributes.sortBy === "TotalSupplier" &&
              (listAttributes.sortDirection ? (
                <FiArrowUp className="ml-2" />
              ) : (
                <FiArrowDown className="ml-2" />
              ))}
          </span>
          <RenderWithPermission permission={userPermissions.EDIT_SUPPLIERS}>
            <span class="w-10 sort-column" column="IsActive">
              Edit
            </span>
          </RenderWithPermission>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          displayList.map((item) => (
            <SuppliersListItem supplier={item} key={item.OrgId} match={match} />
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

export default SuppliersList;
