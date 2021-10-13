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
import { getUserEvents, getAllEventsFields } from "../../services/events.services";
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
  const [events, setEvents] = useState([]);
  const [searchParams, setSearchParams] = useState(initalSearchParams);
  const [eventFields, setEventFields] = useState(initialEventFields)
  // const [paginationData, setPaginationData] = useState({})

  const fetchEvents = () => {
    setLoading(true);
    getUserEvents(searchParams)
      .then((response) => {
        console.log("Event Req Respo",response);
        setEvents(response.upcomingEvents);
        console.log("Upcoming Events",response.upcomingEvents)
        setLoading(false);
        // setPaginationData(response.pageDetails);
      }
    );
  }

  const handleSearch = (e) => {
    fetchEvents();
  } 
  
  const handleReset = () => {
    setSearchParams(initalSearchParams);
    fetchEvents(initalSearchParams);
  }

  const handleSort = async (e) => {
    const column = e.target.getAttribute("column");
    if(searchParams.sortCol === column) {
      setSearchParams({...searchParams, sortOrder: (searchParams.sortOrder === "ASC" ? "DESC" : "ASC")})
      fetchEvents(searchParams);
    }
    else {
      setSearchParams({...searchParams, sortCol: column, sortOrder: searchParams.sortOrder });
      fetchEvents(searchParams);
    }
  }

  // useEffect(() => {
  //   console.log("paginationData", paginationData);
  // }, [paginationData])

  useEffect(() => {
    getAllEventsFields()
      .then((eventFields) => {
        setEventFields(eventFields);
        console.log("Event Field",eventFields);
        getAllCategories()
        .then((response) => {
          setOptions(response.data.filter((item) => item.ParentCategoryId === 0))
          fetchEvents(initalSearchParams);
        });
    })
  }, []);

  return (
    <div>
      <div className="settings-wrapper">
        <div className="list-controls">
        <h1 className="admin-title">Events</h1>
          <div className="d-flex">
            <Link to={`${match.path}requests`} style={{ float: "right" }}>
              <button className="button is-solid accent-button">Event requests</button>
            </Link>  
            <Link to={`${match.path}new`} style={{ float: "right" }}>
              <button className="button is-solid accent-button ml-5">New Event</button>
            </Link>
          </div>
        </div>
        <div className="list-controls justify-content-center">
        <div className="d-flex flex-row">     
          <div className="small-input w-20">
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
          <div className="small-input">
            <input
              type="date"
              className="input is-rounded"
              name="eventStartDate"
              placeholder="Email"
              onChange = {(e) => setSearchParams({...searchParams, [e.target.name] : e.target.value})}
            />
          </div>
          <div className="small-input w-15">
            <select
                className="input is-rounded"
                type="text"
                name="eventStatus"
                value={searchParams.eventStatus}
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
              <FiChevronDown />
            </div>
          </div>
          <div className="small-input w-15">
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
              <FiChevronDown />
            </div>
          </div>
          <div className="small-input w-15">
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
              <FiChevronDown />
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
            <span
              class="name sort-column"
              onClick={handleSort}
              column="EventTitle">
              Name
              {searchParams.sortBy === "EventTitle" &&
                (searchParams.sortDirection ? (
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
              {searchParams.sortBy === "EventStartDateTime" &&
                (searchParams.sortDirection ? (
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
              {searchParams.sortBy === "eventTitle" &&
                (searchParams.sortDirection ? (
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
              {searchParams.sortBy === "PresenterType" &&
                (searchParams.sortDirection ? (
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
              {searchParams.sortBy === "EventNature" &&
                (searchParams.sortDirection ? (
                  <FiArrowUp className="ml-2" />
                ) : (
                  <FiArrowDown className="ml-2" />
                ))}
            </span>
            <span
              class="events-count sort-column"
              onClick={handleSort}
              column="EventSatusId">
              Event Status
              {searchParams.sortBy === "EventNature" &&
                (searchParams.sortDirection ? (
                  <FiArrowUp className="ml-2" />
                ) : (
                  <FiArrowDown className="ml-2" />
                ))}
            </span>
            <span class="w-10" column="PresenterType">
              Edit
            </span>
            <span class="w-10">
              QR
            </span>
            <span class="w-10">
              Feedback
            </span>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            events.map((item) => (
              <a href={`https://dev.virtualcata.com/landing/${item.EventId}`}>
                <EventItem event={item} key={item.EventId} match={match} />
              </a>
            ))
          )}
        </div>
        {/* <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={paginationData.totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={(x) =>
            setSearchParams({ ...searchParams, pageNumber: x.selected })
          }
          containerClassName={"pagination"}
          activeClassName={"active"}
        /> */}
      </div>
    </div>
  );
}

export default EventList;
