import { map } from "async";
import React, { useEffect, useState } from "react";
import { getAllSuppliers } from "../../services/suppliers.services";
import {
  createOrUpdateEvent,
  getAllEventsFields,
} from "../../services/events.services";

import { useHistory } from "react-router";

import { getAllContacts } from "../../services/contacts.services";

import Toaster from "../core/Toaster";
import { getCurrentUser } from "../../utils/user";

function NewEvent() {
  
  const currentUser = getCurrentUser();
  const history = useHistory();

  const [submitting, setSubmitting] = useState(false);
  const [eventDetails, setEvent] = useState({
    loggedInUserId: currentUser.userId,
    presenterSupplierId: currentUser.supplierId,
    isActive: 1,
    eventSatusId: 1,
    hostType: "Retailer",
    hostId: 1,
    eventCategoryId: 1,
    eventThumbnail: "https://via.placeholder.com/920x600",
  });

  const [eventNature, setEventNature] = useState([]);
  const [eventType, setEventType] = useState([]);
  const [suppliersList, setSuppliersList] = useState([]);
  const [suppliersContacts, setSuppliersContacts] = useState([]);

  useEffect(() => {
    console.log("Suppliers Contact", suppliersContacts);
  }, [suppliersContacts]);

  const handleInput = (e) => {
    const newEvent = { ...eventDetails };
    newEvent[e.target.name] = e.target.value;
    if (e.target.name === "eventStartDateTime") {
      newEvent["eventEndDateTime"] = e.target.value;
    }
    setEvent(newEvent);
  };

  const handleSwitch = (e) => {
    const newEvent = { ...eventDetails };
    newEvent[e.target.name] = e.target.checked ? 1 : 0;
    setEvent(newEvent);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log("Event Details Before Submit :: 📺 ", eventDetails);
    createOrUpdateEvent(eventDetails)
      .then(() => {
        Toaster.success("Great!", "Event added successfully");
        history.push("../")
      })
      .catch((error) => {
        console.error("Error during event creation", error);
        Toaster.fail(
          "Opps",
          "Something went wrong. Please try again after sometime"
        );
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
        console.log("Suppliers contact", supplierContacts);
        setSuppliersContacts(supplierContacts);
      }
    );
  };

  useEffect(() => {
    getAllEventsFields().then((data) => {
      setEventNature(data.eventNature);
      setEventType(data.eventType);
    });

    getAllSuppliers().then((suppliersReturned) => {
      console.log(":: Resp Suppliers ::", suppliersReturned.data);
      setSuppliersList(suppliersReturned.data);
    });
  }, []);

  return (
    <>
      <div className="settings-wrapper">
        <div id="general-settings" className="settings-section is-active">
          <div className="settings-panel">
            <div className="title-wrap">
              <span className="mobile-sidebar-trigger">
                <i data-feather="menu" />
              </span>
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
                          required
                        >
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
                          required
                        >
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
                          style={{ justifyContent: "space-between" }}
                        >
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
                          style={{ justifyContent: "space-between" }}
                        >
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
                  </div>
                  <div className="column is-6">
                    {/*Field*/}
                    <div className="field field-group">
                      <label>Presenter Type</label>
                      <div className="control has-icon">
                        <select
                          type="text"
                          className="input is-fade"
                          name="presenterType"
                          onChange={handleSupplier}
                          required
                        >
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
                              key={map.key}
                            >
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
                          required
                        >
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
                          style={{ justifyContent: "space-between" }}
                        >
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
                          style={{ justifyContent: "space-between" }}
                        >
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
                        disabled={submitting}
                      >
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
