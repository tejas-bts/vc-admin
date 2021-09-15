import { map } from "async";
import React, { useEffect, useState } from "react";
import {
  createNewStore,
  getAllStoreType,
} from "../../../services/stores.services";
import { getAllSuppliers } from "../../../services/suppliers.services";
import {
  createOrUpdateEvent,
  getAllEventsFields,
  getEventDetail,
} from "../../../services/events.services";

import { getAllContacts } from "../../../services/contacts.services";

import Toast, { ToastStates } from "../../core/Toast";
import { useParams } from "react-router-dom";
import { getCurrentUser } from "../../../utils/user";
import Spinner from "../../core/Spinner";

function EventDetails() {

  const currentUser = getCurrentUser();

  const { eventId } = useParams();

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastAttr, setToastAttr] = useState({});
  const [eventDetails, setEvent] = useState({
    loggedInUserId: currentUser.userId ,
    // isActive: 1,
    // eventSatusId: 1,
    // hostType: "Retailer",
    // hostId: 1,
    // eventCategoryId: 1,
    // eventThumbnail: 'https://i.stack.imgur.com/y9DpT.jpg',
  });

  const [eventLevel, setEventLevel] = useState([]);
  const [eventNature, setEventNature] = useState([]);
  const [eventStatus, setEventStatus] = useState([]);
  const [eventType, setEventType] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [suppliersList, setSuppliersList] = useState([]);
  const [suppliersContacts, setSuppliersContacts] = useState([]);

  const formatDate = (in_date) => {
    let date_ob = new Date(in_date);

    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = ("0" + date_ob.getHours()).slice(-2);

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    const returnDate = year + "-" + month + "-" + date + "T" + hours + ":" + minutes;
    console.log("Formatted Date", returnDate)
    return returnDate;
  }



  const handleInput = (e) => {
    if(e.target.name === "eventDuration") {
      console.log("Event Duration", e.target.value);
      const duration = e.target.value;
      let endTime = new Date(eventDetails.eventStartDateTime);
      endTime = new Date((endTime.getTime() || 0) + duration*60000);
      console.log("End time", endTime);
      const newEvent = {...eventDetails};
      newEvent['eventEndDateTime'] = endTime.toISOString();
      newEvent['eventDuration'] = duration;
      setEvent(newEvent);
      return;
    }
    const newEvent = { ...eventDetails };
    newEvent[e.target.name] = e.target.value;
    setEvent(newEvent);
  };

  const handleSwitch = (e) => {
    const newEvent = { ...eventDetails };
    newEvent[e.target.name] = e.target.checked ? 1 : 0;
    setEvent(newEvent);
  };

  const onToastHide = () => {
    setShowToast(false);
  };

  const handleApprove = (e) => {
    e.preventDefault();
    // console.log("Submit");
    setSubmitting(true);
    console.log("Event Details Before Submit :: 📺 ", eventDetails);
    eventDetails['eventSatusId'] = 2;
    eventDetails['loggedinUserId'] = currentUser.userId;
    createOrUpdateEvent(eventDetails)
      .then((response) => {
        console.log("Error", response.error);
        if (response.error) {
          console.log("errororor",response);
          setToastAttr({
            ...toastAttr,
            title: "Opps!",
            message: response.data.data[0],
            state: ToastStates.FAIL,
          });
          setShowToast(true);
        } else {
          setToastAttr({
            ...toastAttr,
            title: "Great!",
            message: "Event saved successfully",
            state: ToastStates.SUCCESS,
          });
          setShowToast(true);
          e.target.reset();
        }
      })
      .catch((error) => {
        setToastAttr({
          ...toastAttr,
          title: "Oops!",
          message: "Something went wrong. Please try again after sometime",
          state: ToastStates.FAIL,
        });
        setShowToast(true);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };


  const handleClose = (e) => {
    e.preventDefault();
    // console.log("Submit");
    setSubmitting(true);
    console.log("Event Details Before Submit :: 📺 ", eventDetails);
    eventDetails['eventSatusId'] = 4;
    eventDetails['loggedinUserId'] = currentUser.userId;
    createOrUpdateEvent(eventDetails)
      .then((response) => {
        console.log("Error", response.error);
        // if (response.error) {
        //   console.log("errororor",response);
        //   setToastAttr({
        //     ...toastAttr,
        //     title: "Opps!",
        //     message: response.data.data[0],
        //     state: ToastStates.FAIL,
        //   });
        //   setShowToast(true);
        // } else {
          setToastAttr({
            ...toastAttr,
            title: "Great!",
            message: "Event saved successfully",
            state: ToastStates.SUCCESS,
          });
          setShowToast(true);
          e.target.reset();
        // }
      })
      .catch((error) => {
        setToastAttr({
          ...toastAttr,
          title: "Oops!",
          message: "Something went wrong. Please try again after sometime",
          state: ToastStates.FAIL,
        });
        setShowToast(true);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };


  const handleSupplier = (e) => {
    let values = JSON.parse(e.target.value);
    setEvent({ ...eventDetails, presenterType: values.supplierType });

    let dataToSend = { supplierId: values.supplierId };

    console.log("Data to Send :: ", dataToSend);
    getAllContacts({ supplierId: values.supplierId }).then(
      (supplierContacts) => {
        setSuppliersContacts(supplierContacts.data);
      }
    );
  };

  useEffect(() => {
    getAllEventsFields().then((data) => {
      setEventLevel(data.eventLevel);
      setEventNature(data.eventNature);
      setEventStatus(data.eventStatus);
      setEventType(data.eventType);

      getAllSuppliers().then((suppliersReturned) => {
        console.log(":: Resp Suppliers ::", suppliersReturned.data);
        setSuppliersList(suppliersReturned.data);

        getEventDetail(eventId).then((values) => {
          setLoading(false);
          console.log("Incoming Values", values);
          setEvent({
            ...eventDetails,
            eventId: values.Eventguid,
            eventTitle: values.EventTitle,
            eventStartDateTime: formatDate(values.EventStartDateTime),
            eventEndDateTime: values.EventEndDateTime,
            eventDuration: new Date(values.EventEndDateTime || 0).getMinutes() - new Date(values.EventStartDateTime).getMinutes(),
            maxParticipants: values.MaxParticipants,
            eventTags: values.EventTags,
            hostId: values.HostId,
            description: values.Description,
            // eventType: (eventType.find((item) => item.EventType == values.EventType)|| {}).EventTypeId,
            eventType: values.EventType,
            eventCategoryId: values.EventCategory,
            presenterType: values.PresenterType,
            hostType: values.HostType,
            eventNature: values.EventNature,
            presenterId: values.PresenterId,
            presenterSupplierId: values.PresenterSupplierId, 
            isAgeRestricted: values.IsAgeRistriction,
            isRegistrationRequired: values.IsRegistrationRequired,
            isEvenAvailableToView: values.IsEvenAvailableToView,
            isCollectFeedback: values.IsCollectFeedback,
          })
          setInitialValues(values);
        })
      });
    });

  }, []);

  useEffect(() => {
    console.log("Event Details", eventDetails);
  }, [eventDetails]);

  return (
    <>
      <Toast
        toastState={toastAttr.state}
        title={toastAttr.title}
        message={toastAttr.message}
        show={showToast}
        onClose={onToastHide}
      />
      <div className="settings-wrapper">
        <div id="general-settings" className="settings-section is-active">
          <div className="settings-panel">
            <div className="title-wrap">
              <a className="mobile-sidebar-trigger">
                <i data-feather="menu" />
              </a>
              <h2>Event Details</h2>
            </div>
            {loading ? <Spinner/>
            :
            <div className="settings-form-wrapper">
              <form className="settings-form">
                <div className="columns is-multiline">
                  <div className="column is-6">
                    {/*Field*/}
                    <div className="field field-group">
                      <label>Event Title</label>
                      <div className="control has-icon">
                        <input
                          type="text"
                          className="input is-fade"
                          name="eventTitle"
                          onChange={handleInput}
                          value={eventDetails.eventTitle}
                          required
                        />
                        <div className="form-icon">
                          <i data-feather="user" />
                        </div>
                      </div>
                    </div>
                    {/*Field*/}
                    <div className="field field-group">
                      <label>Max Participants</label>
                      <div className="control has-icon">
                        <input
                          type="number"
                          className="input is-fade"
                          name="maxParticipants"
                          onChange={handleInput}
                          value={eventDetails.maxParticipants}
                          required
                        />
                        <div className="form-icon">
                          <i data-feather="mail" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="column is-6">
                    {/*Field*/}
                    <div className="field field-group">
                      <label>Date & Time</label>
                      <div className="control has-icon">
                        <input
                          type="datetime-local"
                          className="input is-fade"
                          name="eventStartDateTime"
                          onChange={handleInput}
                          value={eventDetails.eventStartDateTime}
                          required
                        />
                        <div className="form-icon">
                          <i data-feather="link" />
                        </div>
                      </div>
                    </div>
                    {/*Field*/}
                    <div className="field field-group">
                      <label>Event Duration</label>
                      <div className="control has-icon">
                        <input
                          type="number"
                          className="input is-fade"
                          name="eventDuration"
                          placeholder="Duration of event in minutes"
                          onChange={handleInput}
                          // value={eventDetails.eventDuration}
                          required
                        />
                        <div className="form-icon">
                          <i data-feather="clock" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="column is-12">
                    {/*Field*/}
                    <div className="field field-group">
                      <label>Description</label>
                      <div className="control">
                        <textarea
                          type="text"
                          className="textarea is-fade"
                          rows={1}
                          placeholder="Description for event..."
                          style={{ height: "70px" }}
                          name="description"
                          onChange={handleInput}
                          value={eventDetails.description}
                          name="description"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column is-6">
                    {/*Field*/}
                    <div className="field field-group">
                      <label>Event Type</label>
                      <div className="control has-icon">
                        <select
                          type="text"
                          className="input is-fade"
                          name="eventType"
                          onChange={handleInput}
                          value={eventDetails.eventType}
                          required>
                          <option disabled selected value="null">
                            {" "}
                            -- Select a Event type --{" "}
                          </option>
                          {eventType.map((item) => (
                            <option value={item.EventType} key={map.key}>
                              {item.EventType}
                            </option>
                          ))}
                        </select>
                        <div className="form-icon">
                          <i data-feather="settings" />
                        </div>
                      </div>
                    </div>

                    <div className="field field-group">
                      <label>Event Nature</label>
                      <div className="control has-icon">
                        <select
                          type="text"
                          className="input is-fade"
                          name="eventNature"
                          onChange={handleInput}
                          value={eventDetails.eventNature}
                          defaultValue={"null"}
                          required>
                          <option disabled selected value="null">
                            {" "}
                            -- Select a Event Nature --{" "}
                          </option>
                          {eventNature.map((item) => (
                            <option value={item.EventNature} key={map.key}>
                              {item.EventNature}
                            </option>
                          ))}
                        </select>
                        <div className="form-icon">
                          <i data-feather="settings" />
                        </div>
                      </div>
                    </div>
                    {/*Field*/}
                    <div className="field field-group">
                      <label>Select Yes/No</label>
                      <div className="control has-icon">
                        <div
                          className="switch-block mb-3"
                          style={{ justifyContent: "space-between" }}>
                          <label className="mr-5 pl-5 ml-4">
                            Is event age restricted?
                          </label>
                          <label className="f-switch is-accent">
                            <input
                              type="checkbox"
                              name="isAgeRestricted"
                              className="is-switch"
                              onChange={handleSwitch}
                              checked={eventDetails.isAgeRestricted}
                            />
                            <i></i>
                          </label>
                        </div>
                        <div className="form-icon">
                          <i data-feather="settings" />
                        </div>
                      </div>
                    </div>
                    {/*Field*/}
                    <div className="field field-group">
                      <label>Select Yes/No</label>
                      <div className="control has-icon">
                        <div
                          className="switch-block mb-3"
                          style={{ justifyContent: "space-between" }}>
                          <label className="mr-5 pl-5 ml-4">
                            Should event be availble to view after live stream
                          </label>
                          <label className="f-switch is-accent">
                            <input
                              type="checkbox"
                              name="isEvenAvailableToView"
                              className="is-switch"
                              onChange={handleSwitch}
                              checked={eventDetails.isEvenAvailableToView}
                            />
                            <i></i>
                          </label>
                        </div>
                        <div className="form-icon">
                          <i data-feather="settings" />
                        </div>
                      </div>
                    </div>
    
                  </div>
                  <div className="column is-6">
                    {/*Field*/}
                    {/* <div className="field field-group">
                      <label>Event Status</label>
                      <div className="control has-icon">
                        <select
                          type="text"
                          className="input is-fade"
                          name="eventSatusId"
                          onChange={handleInput}
                          required>
                          <option disabled selected value>
                            {" "}
                            -- Select a Event Status --{" "}
                          </option>
                          {eventStatus.map((item) => (
                            <option value={item.EventStatusId} key={map.key}>
                              {item.EventStatus}
                            </option>
                          ))}
                        </select>
                        <div className="form-icon">
                          <i data-feather="settings" />
                        </div>
                      </div>
                    </div> */}

                    {/*Field*/}
                    <div className="field field-group" style={{display:'none'}}>
                      <label>Presenter Type</label>
                      <div className="control has-icon">
                        <select
                          type="text"
                          disabled={!(eventDetails.hostId === currentUser.userId)}
                          className="input is-fade"
                          name="presenterType"
                          onChange={handleSupplier}
                          required>
                          <option disabled selected>
                            {" "}
                            -- Select a Presenter Type --{" "}
                          </option>

                          {suppliersList.map((sup) => (
                            <option
                            selected={eventDetails.presenterId == sup.SupplierID}
                              value={JSON.stringify({
                                supplierId: sup.SupplierID,
                                supplierType: sup.SupplierType,
                              })}
                              key={map.key}>
                              {sup.SupplierName} | {sup.SupplierType}
                            </option>
                          ))}
                        </select>
                        <div className="form-icon">
                          <i data-feather="settings" />
                        </div>
                      </div>
                    </div>
                    {/*Field*/}

                    <div className="field field-group" style={{display:'none'}}>
                      <label>Presenter Contact</label>
                      <div className="control has-icon">
                        <select
                          type="text"
                          disabled={!(eventDetails.hostId === currentUser.userId)}
                          className="input is-fade"
                          name="presenterId"
                          onChange={handleInput}
                          required>
                          <option disabled selected value>
                            {" "}
                            -- Select a Presenter Contact --{" "}
                          </option>

                          {suppliersContacts.map((sup) => (
                            <option value={sup.ContactId} key={map.key}>
                              {sup.FirstName} {sup.LastName} | {sup.Email} |{" "}
                              {sup.StoreName}
                            </option>
                          ))}
                        </select>
                        <div className="form-icon">
                          <i data-feather="settings" />
                        </div>
                      </div>
                    </div>


                    {/*Field*/}
                    <div className="field field-group">
                      <label>Select Yes/No</label>
                      <div className="control has-icon">
                        <div
                          className="switch-block mb-3"
                          style={{ justifyContent: "space-between" }}>
                          <label className="mr-5 pl-5 ml-4">
                            Do you want to collect feedbacks?
                          </label>
                          <label className="f-switch is-accent">
                            <input
                              type="checkbox"
                              name="isCollectFeedback"
                              className="is-switch"
                              onChange={handleSwitch}
                              checked={eventDetails.isCollectFeedback}
                            />
                            <i></i>
                          </label>
                        </div>
                        <div className="form-icon">
                          <i data-feather="settings" />
                        </div>
                      </div>
                    </div>
                    {/*Field*/}
                    <div className="field field-group">
                      <label>Select Yes/No</label>
                      <div className="control has-icon">
                        <div
                          className="switch-block mb-3"
                          style={{ justifyContent: "space-between" }}>
                          <label className="mr-5 pl-5 ml-4">
                            Should user be necessarily registered to attend the
                            event?
                          </label>
                          <label className="f-switch is-accent">
                            <input
                              type="checkbox"
                              name="isCollectFeedback"
                              className="is-switch"
                              onChange={handleSwitch}
                              checked={eventDetails.isCollectFeedback}
                            />
                            <i></i>
                          </label>
                        </div>
                        <div className="form-icon">
                          <i data-feather="settings" />
                        </div>
                      </div>
                    </div>
                    
                    {/*Field*/}
                    <div className="field field-group">
                      <label>Event Tags</label>
                      <div className="control has-icon">
                        <input
                          type="text"
                          className="input is-fade"
                          name="eventTags"
                          placeholder="Enter tags separated with commas"
                          onChange={handleInput}
                          value={eventDetails.eventTags}
                          required
                        />
                        <div className="form-icon">
                          <i data-feather="tag" />
                        </div>
                      </div>
                    </div>
                  {/* </div>

                  <div className="column is-6"> */}
                    
                  </div>

                  <div className="column is-12">
                    <div className="buttons">
                      <button
                        type="submit"
                        className="button is-solid accent-button form-button"
                        onClick={handleApprove}
                        disabled={submitting}>
                        {submitting ? "Sending..." : "Send for publish"}
                      </button>
                      <button
                        type="submit"
                        className="button is-solid danger-btn form-button"
                        onClick={handleClose}
                        disabled={submitting}>
                        {submitting ? "Sending..." : "Send for Closing"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default EventDetails;
