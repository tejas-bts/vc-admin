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
import { useParams, useHistory } from "react-router-dom";
import { getCurrentUser } from "../../../utils/user";
import Spinner from "../../core/Spinner";

import Toaster from "../../core/Toaster";

import Confetti from "react-confetti";

function EventDetails() {
  const currentUser = getCurrentUser();

  const history = useHistory();

  const { eventId } = useParams();

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastAttr, setToastAttr] = useState({});
  const [eventDetails, setEvent] = useState({
    loggedInUserId: currentUser.userId,
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

  const [showConfetti, setShowConfetti] = useState(false);

  const formatDate = (in_date) => {
    let date_ob = new Date(in_date);

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = ("0" + date_ob.getHours()).slice(-2);
    let minutes = ("0" + date_ob.getMinutes()).slice(-2);
    let seconds = date_ob.getSeconds();
    const returnDate =
      year + "-" + month + "-" + date + "T" + hours + ":" + minutes;
    console.log("Formatted Date", returnDate);
    return returnDate;
  };

  const handleInput = (e) => {
    if (e.target.name === "eventDuration") {
      console.log("Event Duration", e.target.value);
      const duration = e.target.value;
      let endTime = new Date(eventDetails.eventStartDateTime);
      endTime = new Date((endTime.getTime() || 0) + duration * 60000);
      console.log("End time", endTime);
      const newEvent = { ...eventDetails };
      newEvent["eventEndDateTime"] = endTime.toISOString();
      newEvent["eventDuration"] = duration;
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



const handlePublishRequest = (e) => {
  e.preventDefault();
  setSubmitting(true);
  console.log("Event Details Before Submit :: 📺 ", eventDetails);
  createOrUpdateEvent({eventSatusId: 1, loggedinUserId: currentUser.userId, ...eventDetails})
    .then((response) => {
      console.log("Error", response.error);
      Toaster.success("Great!", "Event saved successfully");
    })
    .catch((error) => {
      console.error(error);
      Toaster.fail("Oops!", "Something went wrong. Please try again after sometime");
    })
    .finally(() => {
      setSubmitting(false);
    });
};


const handlePublishApproval = (e) => {
  e.preventDefault();
  setSubmitting(true);
  console.log("Event Details Before Submit :: 📺 ", eventDetails);
  createOrUpdateEvent({eventSatusId: 1, loggedinUserId: currentUser.userId, ...eventDetails})
    .then((response) => {
      console.log("Error", response.error);
      Toaster.success("Great!", "Event saved successfully");
    })
    .catch((error) => {
      console.error(error);
      Toaster.fail("Oops!", "Something went wrong. Please try again after sometime");
    })
    .finally(() => {
      setSubmitting(false);
    });
};


const handleCloseRequest = (e) => {
  e.preventDefault();
  setSubmitting(true);
  console.log("Event Details Before Submit :: 📺 ", eventDetails);
  createOrUpdateEvent({eventSatusId: 1, loggedinUserId: currentUser.userId, ...eventDetails})
    .then((response) => {
      console.log("Error", response.error);
      Toaster.success("Great!", "Event saved successfully");
    })
    .catch((error) => {
      console.error(error);
      Toaster.fail("Oops!", "Something went wrong. Please try again after sometime");
    })
    .finally(() => {
      setSubmitting(false);
    });
};


const handleCloseApproval = (e) => {
  e.preventDefault();
  setSubmitting(true);
  console.log("Event Details Before Submit :: 📺 ", eventDetails);
  createOrUpdateEvent({eventSatusId: 1, loggedinUserId: currentUser.userId, ...eventDetails})
    .then((response) => {
      console.log("Error", response.error);
      Toaster.success("Great!", "Event saved successfully");
    })
    .catch((error) => {
      console.error(error);
      Toaster.fail("Oops!", "Something went wrong. Please try again after sometime");
    })
    .finally(() => {
      setSubmitting(false);
    });
};






  const handleApprove = (e) => {
    e.preventDefault();
    // console.log("Submit");
    setSubmitting(true);
    console.log("Event Details Before Submit :: 📺 ", eventDetails);
    eventDetails["eventSatusId"] = 5;
    eventDetails["loggedinUserId"] = currentUser.userId;
    createOrUpdateEvent(eventDetails)
      .then((response) => {
        console.log("Error", response.error);
        if (response.error) {
          console.log("errororor", response);
          setToastAttr({
            ...toastAttr,
            title: "Opps!",
            message: response.data.data[0],
            state: ToastStates.FAIL,
          });
          setShowToast(true);
        } else {
          setShowConfetti(true);
          setToastAttr({
            ...toastAttr,
            title: "Great!",
            message: "Event saved successfully",
            state: ToastStates.SUCCESS,
          });
          setShowToast(true);
          setTimeout(() => history.push("../"), 4000);
        }
      })
      .catch((error) => {
        console.error(error);
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
    eventDetails["eventSatusId"] = 4;
    eventDetails["loggedinUserId"] = currentUser.userId;
    createOrUpdateEvent(eventDetails)
      .then((response) => {
        console.log("Error", response.error);
        setToastAttr({
          ...toastAttr,
          title: "Great!",
          message: "Event saved successfully",
          state: ToastStates.SUCCESS,
        });
        setShowToast(true);
      })
      .catch((error) => {
        console.error(error);
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

  const handleApprovalRequest = (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log("Event Details Before Submit :: 📺 ", eventDetails);
    createOrUpdateEvent({eventSatusId: 1, loggedinUserId: currentUser.userId, ...eventDetails})
      .then((response) => {
        console.log("Error", response.error);
        Toaster.success("Great!", "Event saved successfully");
      })
      .catch((error) => {
        console.error(error);
        Toaster.fail("Oops!", "Something went wrong. Please try again after sometime");
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
          console.log(
            "Duration",
            Math.abs(
              new Date(values.EventEndDateTime || 0).getTime() -
                new Date(values.EventStartDateTime).getTime()
            ) / 60000
          );
          setLoading(false);
          console.log("Incoming Values", values);
          setEvent({
            ...eventDetails,
            eventId: values.Eventguid,
            eventTitle: values.EventTitle,
            eventStartDateTime: formatDate(values.EventStartDateTime),
            eventEndDateTime: formatDate(values.EventEndDateTime),
            eventDuration:
              Math.abs(
                new Date(values.EventEndDateTime || 0).getTime() -
                  new Date(values.EventStartDateTime).getTime()
              ) / 60000,
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
          });
          setInitialValues(values);
        });
      });
    });
  }, []);

  useEffect(() => {
    console.log("Event Details", eventDetails);
  }, [eventDetails]);

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.screen.width}
          height={window.screen.height}
          numberOfPieces={1000}
          gravity={0.1}
          initialVelocityY={20}
          confettiSource={{x:0, y:0}}
        />
      )}
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
            {loading ? (
              <Spinner />
            ) : (
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
                          <select
                            type="text"
                            className="input is-fade"
                            name="eventDuration"
                            onChange={handleInput}
                            value={eventDetails.eventDuration}
                            required
                          >
                            <option value={15}>15 minutes</option>
                            <option value={20}>20 minutes</option>
                            <option value={25}>25 minutes</option>
                            <option value={30}>30 minutes</option>
                            <option value={35}>35 minutes</option>
                            <option value={40}>40 minutes</option>
                            <option value={45}>45 minutes</option>
                            <option value={50}>50 minutes</option>
                            <option value={60}>1 hour</option>
                            <option value={65}>1 hour 5 minutes</option>
                            <option value={70}>1 hour 10 minutes</option>
                            <option value={75}>1 hour 15 minutes</option>
                            <option value={80}>1 hour 20 minutes</option>
                            <option value={85}>1 hour 25 minutes</option>
                            <option value={90}>1 hour 30 minutes</option>
                          </select>
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
                            value={eventDetails.eventNature}
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
                      <div
                        className="field field-group"
                        style={{ display: "none" }}
                      >
                        <label>Presenter Type</label>
                        <div className="control has-icon">
                          <select
                            type="text"
                            disabled={
                              !(eventDetails.hostId === currentUser.userId)
                            }
                            className="input is-fade"
                            name="presenterType"
                            onChange={handleSupplier}
                            required
                          >
                            <option disabled selected>
                              {" "}
                              -- Select a Presenter Type --{" "}
                            </option>

                            {suppliersList.map((sup) => (
                              <option
                                selected={
                                  eventDetails.presenterId == sup.SupplierID
                                }
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

                      <div
                        className="field field-group"
                        style={{ display: "none" }}
                      >
                        <label>Presenter Contact</label>
                        <div className="control has-icon">
                          <select
                            type="text"
                            disabled={
                              !(eventDetails.hostId === currentUser.userId)
                            }
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
                            style={{ justifyContent: "space-between" }}
                          >
                            <label className="mr-5 pl-5 ml-4">
                              Should user be necessarily registered to attend
                              the event?
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
                      {eventDetails.hostId === currentUser.userId && (
                        <div className="buttons">
                          <button
                            type="submit"
                            className="button is-solid accent-button form-button"
                            onClick={handleApprove}
                            disabled={submitting}
                          >
                            {submitting ? "Publishing..." : "Publish"}
                          </button>
                          <button
                            type="submit"
                            className="button is-solid danger-btn form-button"
                            onClick={handleClose}
                            disabled={submitting}
                          >
                            {submitting ? "Closing..." : "Close"}
                          </button>
                          <button
                            type="submit"
                            className="button is-solid danger-btn form-button"
                            onClick={handleApprovalRequest}
                            disabled={submitting}
                          >
                            {submitting ? "Sending..." : "   Review"}
                          </button>
                        </div>
                      )}
                      {eventDetails.presenterId === currentUser.userId && (
                        <div className="buttons">
                          <button
                            type="submit"
                            className="button is-solid accent-button form-button"
                            onClick={handleApprove}
                            disabled={submitting}
                          >
                            {submitting ? "Please wait.." : "Request to be published"}
                          </button>
                          <button
                            type="submit"
                            className="button is-solid danger-btn form-button"
                            onClick={handleClose}
                            disabled={submitting}
                          >
                            {submitting ? "Please wait..." : "Request to be closed"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EventDetails;
