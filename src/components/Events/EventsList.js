import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import EventItem from "./Event.ListItem";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../services/category.service";
import {
  FiArrowDown,
  FiArrowUp,
  FiChevronDown,
  FiSearch,
} from "react-icons/fi";
import { getAllEvents, getAllEventsFields } from "../../services/events.services";
import Spinner from "../../components/core/Spinner";

const initalSearchParams = {
  eventTitle: "",
  eventStartDate: "",
  eventCategoryId: "",
  eventType: "",
  eventNature: "",
  hostType: "",
  hostId: "",
  presenterType: "",
  presenterId: "",
  limit: "",
  offset: "",
  sortCol: "",
  sortOrder: "",
};

const initialEventFields = { eventNature: [], eventStatus:[], eventLevel:[], eventType:[] }

function EventList({ match }) {
  const [loading, setLoading] = useState(true);
  const [categoryOptions, setOptions] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [searchParams, setSearchParams] = useState(initalSearchParams);
  const [eventFields, setEventFields] = useState(initialEventFields)
  const [listAttributes, setListAttributes] = useState({
    pageNumber: 0,
    pageSize: 5,
    pageCount: 0,
    sortBy: "Zipcode",
    sortDirection: true,
  });

  const fetchEvents = () => {
    setLoading(true);
    getAllEvents(searchParams).then((response) => {
      // console.log("Events List",response)
      const organizations = response.data;
      setOrganizations(organizations);
      const newListAttributes = { ...listAttributes };
      newListAttributes.pageCount = Math.ceil(
        organizations.length / listAttributes.pageSize
      );
      setListAttributes(newListAttributes);
      setLoading(false);
    });
  }

  const handleSearch = (e) => {
    fetchEvents();
  } 

  const handleSort = (e) => {
    // console.log(e.target.getAttribute('column'));
    const column = e.target.getAttribute("column");
    let currentListAttributes = listAttributes;
    if (currentListAttributes.sortBy === column)
      currentListAttributes = {
        ...currentListAttributes,
        sortDirection: !listAttributes.sortDirection,
      };
    setListAttributes({ ...currentListAttributes, sortBy: column });
  };

  useEffect(() => {
    console.log("searchParams", searchParams);
  }, [searchParams])

  useEffect(() => {
    getAllEventsFields()
      .then((eventFields) => {
        setEventFields(eventFields);
        console.log("Event Field",eventFields);
        getAllCategories()
        .then((response) => {
          setOptions(response.data.filter((item) => item.ParentCategoryId === 0))
          fetchEvents();
        });
    })
  }, []);

  useEffect(() => {
    console.log("Display List", displayList);
  }, [displayList]);

  useEffect(() => {
    console.log("List Attributes", listAttributes);
    const start =
      parseInt(listAttributes.pageNumber) * parseInt(listAttributes.pageSize);
    const end = start + listAttributes.pageSize;
    let orgList = [...organizations];

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
  }, [listAttributes, organizations]);

  return (
    <div>
      <div className="settings-wrapper">
        <div className="list-controls">
          <Link to={`${match.path}new`} style={{ float: "right" }}>
            <button className="button is-solid accent-button">New Event</button>
          </Link>
          <h1 className="admin-title">Events</h1>
        </div>
        <div className="list-controls">
          <div className="small-input">
            <button
              className="input is-rounded admin-search-button"
              placeholder="Type"
              onClick={handleSearch}
            >
              {" "}
              <FiSearch className="mr-2" />
              Search
            </button>
          </div>
          <div className="small-input">
            <input
              type="datetime-local"
              className="input is-rounded"
              name="eventStartDate"
              placeholder="Email"
              onChange = {(e) => setSearchParams({...searchParams, [e.target.name] : e.target.value})}
            />
            <div className="search-icon">
              <FiSearch />
            </div>
          </div>
          <div className="small-input">
            <select
                className="input is-rounded"
                type="text"
                name="eventStatus"
                style={{ paddingLeft: "30px", textAlign: "center" }}
                onChange = {(e) => setSearchParams({...searchParams, [e.target.name] : e.target.value})}
              >
                <option disabled selected value>
                  Select Status
                </option>
                {eventFields.eventStatus.map((item) => (
                  <option value={item.EventStatus}>{item.EventStatus}</option>
                ))}
            </select>
            <div className="search-icon">
              <FiSearch />
            </div>
          </div>
          <div className="small-input">
            <select
              className="input is-rounded"
              type="text"
              name="eventNature"
              style={{ paddingLeft: "30px", textAlign: "center" }}
              onChange = {(e) => setSearchParams({...searchParams, [e.target.name] : e.target.value})}
            >
              <option disabled selected value>
                Select Nature
              </option>
              {eventFields.eventNature.map((item) => (
                <option value={item.EventNature}>{item.EventNature}</option>
              ))}
            </select>
            <div className="search-icon">
              <FiSearch />
            </div>
          </div>
          <div className="small-input">
            <select
                className="input is-rounded"
                type="text"
                name="eventType"
                style={{ paddingLeft: "30px", textAlign: "center" }}
                onChange = {(e) => setSearchParams({...searchParams, [e.target.name] : e.target.value})}
                >
                <option disabled selected value>
                  Select Type
                </option>
                {eventFields.eventType.map((item) => (
                  <option value={item.EventType}>{item.EventType}</option>
                ))}
            </select>
            <div className="search-icon">
              <FiSearch />
            </div>
          </div>          
          <div className="small-input">
            <select
              className="input is-rounded"
              type="text"
              name="eventCategoryId"
              style={{ paddingLeft: "30px", textAlign: "center" }}
              onChange = {(e) => setSearchParams({...searchParams, [e.target.name] : e.target.value})}
              >
              <option disabled selected value>
                Select Category
              </option>
              {categoryOptions.map((item) => (
                <option value={item.CategoryId}>{item.CategoryName}</option>
              ))}
            </select>
            <div className="search-icon">
              <FiChevronDown />
            </div>
          </div>
          <div className="small-input">
            <input
              className="input is-rounded"
              name="eventTitle"
              type="text"
              placeholder="Title"
              onChange = {(e) => setSearchParams({...searchParams, [e.target.name] : e.target.value})}
            />
            <div className="search-icon">
              <FiSearch />
            </div>
          </div>
        </div>
        <div class="flex-table">
          <div class="flex-table-header">
            <span
              class="name sort-column"
              onClick={handleSort}
              column="EventTitle">
              Name
              {listAttributes.sortBy === "EventTitle" &&
                (listAttributes.sortDirection ? (
                  <FiArrowUp className="ml-2" />
                ) : (
                  <FiArrowDown className="ml-2" />
                ))}
            </span>
            <span
              class="location sort-column"
              onClick={handleSort}
              column="EventStartDateTime">
              Date
              {listAttributes.sortBy === "EventStartDateTime" &&
                (listAttributes.sortDirection ? (
                  <FiArrowUp className="ml-2" />
                ) : (
                  <FiArrowDown className="ml-2" />
                ))}
            </span>
            <span
              class="type sort-column"
              onClick={handleSort}
              column="eventTitle">
              Type
              {listAttributes.sortBy === "eventTitle" &&
                (listAttributes.sortDirection ? (
                  <FiArrowUp className="ml-2" />
                ) : (
                  <FiArrowDown className="ml-2" />
                ))}
            </span>
            <span
              class="category sort-column"
              onClick={handleSort}
              column="PresenterType">
              Presenter Type
              {listAttributes.sortBy === "PresenterType" &&
                (listAttributes.sortDirection ? (
                  <FiArrowUp className="ml-2" />
                ) : (
                  <FiArrowDown className="ml-2" />
                ))}
            </span>
            <span
              class="events-count sort-column"
              onClick={handleSort}
              column="EventNature">
              Event Nature
              {listAttributes.sortBy === "EventNature" &&
                (listAttributes.sortDirection ? (
                  <FiArrowUp className="ml-2" />
                ) : (
                  <FiArrowDown className="ml-2" />
                ))}
            </span>
            <span
              class="status sort-column"
              onClick={handleSort}
              column="PresenterType">
              Presenter Type
              {listAttributes.sortBy === "PresenterType" &&
                (listAttributes.sortDirection ? (
                  <FiArrowUp className="ml-2" />
                ) : (
                  <FiArrowDown className="ml-2" />
                ))}
            </span>
            <span class="edit sort-column" column="PresenterType">
              Edit
            </span>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            displayList.map((item) => (
              <a href={`https://dev.virtualcata.com/landing/${item.EventId}`}>
                <EventItem event={item} key={item.EventId} match={match} />
              </a>
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
    </div>
  );
}

export default EventList;
