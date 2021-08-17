import { map } from "async";
import React, { useEffect, useState } from "react";
import {
  createNewStore,
  getAllStoreType,
} from "../../services/stores.services";
import { getAllSuppliers } from "../../services/suppliers.services";
import {
  createOrUpdateEvent,
  getAllEventsFields,
} from "../../services/events.services";

import { getAllContacts } from "../../services/contacts.services";

import Toast, { ToastStates } from "../core/Toast";

function NewEvent() {
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastAttr, setToastAttr] = useState({});
  const [eventDetails, setEvent] = useState({
    loggedInUserId: 73,
    isActive: 1,
    eventSatusId: 1,
    hostType: "Retailer",
    hostId: 1,
  });

  const [eventLevel, setEventLevel] = useState([]);
  const [eventNature, setEventNature] = useState([]);
  const [eventStatus, setEventStatus] = useState([]);
  const [eventType, setEventType] = useState([]);
  const [suppliersList, setSuppliersList] = useState([]);
  const [suppliersContacts, setSuppliersContacts] = useState([]);

  const handleInput = (e) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Submit");
    setSubmitting(true);
    console.log("Event Details Before Submit :: 📺 ", eventDetails);
    createOrUpdateEvent(eventDetails)
      .then((response) => {
        console.log("Error", response);
        if (response.data) {
          console.log("errororor");
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
            message: "Store added successfully",
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
      // console.log(data);
      setEventLevel(data.eventLevel);
      setEventNature(data.eventNature);
      setEventStatus(data.eventStatus);
      setEventType(data.eventType);
    });

    getAllSuppliers().then((suppliersReturned) => {
      console.log(":: Resp Suppliers ::", suppliersReturned.data);

      setSuppliersList(suppliersReturned.data);
    });
  }, []);

  useEffect(() => {
    // console.log(eventDetails);
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
              <h2>Add new Event</h2>
            </div>
            <div className="settings-form-wrapper">
              <form className="settings-form" onSubmit={handleSubmit}>
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
                          type="datetime"
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
                      <label>Event Tags</label>
                      <div className="control has-icon">
                        <input
                          type="text"
                          className="input is-fade"
                          name="eventTags"
                          placeholder="Enter tags separated with commas"
                          onChange={handleInput}
                          required
                        />
                        <div className="form-icon">
                          <i data-feather="tag" />
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
                          name="address1"
                          onChange={handleInput}
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
                          defaultValue={"null"}
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
                    {/* <div className="field field-group">
                      <label>Select Yes/No</label>
                      <div className="control has-icon">
                        <div
                          className="switch-block mb-3"
                          style={{ justifyContent: "space-between" }}>
                          <label className="mr-5 pl-5 ml-4">
                            Is event active?
                          </label>
                          <label className="f-switch is-accent">
                            <input
                              type="checkbox"
                              name="isActive"
                              className="is-switch"
                              onChange={handleSwitch}
                            />
                            <i></i>
                          </label>
                        </div>
                        <div className="form-icon">
                          <i data-feather="settings" />
                        </div>
                      </div>
                    </div> */}
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
                    <div className="field field-group">
                      <label>Presenter Type</label>
                      <div className="control has-icon">
                        <select
                          type="text"
                          className="input is-fade"
                          name="presenterType"
                          onChange={handleSupplier}
                          required>
                          <option disabled selected value>
                            {" "}
                            -- Select a Presenter Type --{" "}
                          </option>

                          {suppliersList.map((sup) => (
                            <option
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

                    <div className="field field-group">
                      <label>Presenter Contact</label>
                      <div className="control has-icon">
                        <select
                          type="text"
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
                            Slould user be necessarily registered to attend the
                            event?
                          </label>
                          <label className="f-switch is-accent">
                            <input
                              type="checkbox"
                              name="isCollectFeedback"
                              className="is-switch"
                              onChange={handleSwitch}
                            />
                            <i></i>
                          </label>
                        </div>
                        <div className="form-icon">
                          <i data-feather="settings" />
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
                        onClick={handleSubmit}
                        disabled={submitting}>
                        {submitting ? "Adding..." : "Add"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewEvent;
