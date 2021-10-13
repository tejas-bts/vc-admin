import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import EventItem from "./Event.ListItem";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../../services/category.service";
import {
  FiArrowDown,
  FiArrowUp,
  FiChevronDown,
  FiSearch,
} from "react-icons/fi";
import { getUserEvents, getAllEventsFields } from "../../../services/events.services";
import Spinner from "../../../components/core/Spinner";
import { getCurrentUser } from "../../../utils/user";


function EventList({ match }) {

  const currentUser = getCurrentUser()

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
    token: currentUser.token,
  };

  const initialEventFields = { eventNature: [], eventStatus:[], eventLevel:[], eventType:[] }

  const [loading, setLoading] = useState(true);
  const [categoryOptions, setOptions] = useState([]);
  const [events, setEvents] = useState([]);
  const [searchParams, setSearchParams] = useState(initalSearchParams);
  const [eventFields, setEventFields] = useState(initialEventFields)
  const [paginationData, setPaginationData] = useState({})

  useEffect(() => {
    setSearchParams({ token: currentUser.token });
    }, []);

  const fetchEvents = () => {
    setLoading(true);
    getUserEvents(searchParams)
      .then((response) => {
        console.log("Event Req Respo",response);
        setEvents(response.upcomingEvents);
        console.log("Upcoming Events",response.upcomingEvents)
        setLoading(false);
        setPaginationData(response.pageDetails);
      }
    );
  }

  const handleSearch = (e) => {
    fetchEvents();
  } 

  const handleSort = async (e) => {
    const column = e.target.getAttribute("column");
    if(searchParams.sortCol === column) {
      setSearchParams({...searchParams, sortOrder: (searchParams.sortOrder === "ASC" ? "DESC" : "ASC")});
      fetchEvents();
    }
    else {
      setSearchParams({...searchParams, sortCol: column, sortOrder: searchParams.sortOrder });
      fetchEvents();
    }
  }

  useEffect(() => {
    console.log("paginationData", paginationData);
  }, [paginationData])

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

  return (
    <div>
      <div className="settings-wrapper">
        <div className="list-controls">
          <h1 className="admin-title">Event Requests</h1>
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
            </span><span
              class="events-count sort-column"
              onClick={handleSort}
              column="EventStatus">
              Event Status
              {searchParams.sortBy === "EventStatus" &&
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
