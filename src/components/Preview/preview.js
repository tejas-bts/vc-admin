import React from "react";
import NavBar from "../core/NavBar/NavBar";
import { useParams } from "react-router";
import QRCode from "react-qr-code";
import {
  FiInstagram,
  FiFacebook,
  FiLinkedin,
  FiTwitter,
  FiChevronRight,
  FiPlay,
  FiShare2,
  FiCalendar,
  FiMapPin,
} from "react-icons/fi";

function PreviewPage() {
  let { id } = useParams();
  console.log("ID", id);
  const event = {
    location: "123 Gilmore Street, Loise Lane, CA",
    coverPicture: "https://via.placeholder.com/1600x460",
    title: "Wine tasting with Estebe",
    dateTime: "Saturday, Jul 21 2021 @ 5:00 PM - 11:00 PM",
    phoneNumber: "+(1) 555-888-1265",
    emailAddress: "something@something.com",
    presenter: "Presenter Name",
    website: "https://www.something.com",
    eventDetails: `<p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum
                    id fugiunt, re eadem defendunt, quae Peripatetici, verba.
                    Scisse enim te quis coarguere possit? Quid de Platone aut de
                    Democrito loquar.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum
                    id fugiunt, re eadem defendunt, quae Peripatetici, verba.
                    Scisse enim te quis coarguere possit? Quid de Platone aut de
                    Democrito loquar? Duo Reges: constructio interrete. Quod
                    equidem non reprehendo; Bonum integritas corporis.
                  </p>`,
  };
  return (
    <div>
      <NavBar />
      <div className="view-wrapper is-full">
        {/*Wrapper*/}
        <div className="event-page-wrapper">
          {/*Cover*/}
          <div className="event-cover">
            <img
              className="cover-image"
              src={event.coverPicture}
              data-demo-src="assets/img/demo/unsplash/55.jpg"
              alt=""
            />
          </div>
          {/*Main infos*/}
          <div className="event-content">
            <div className="event-head">
              <div className="left">
                <h2>{event.title}</h2>
                <h3>{event.dateTime}</h3>
                <div className="button-separator">
                  <FiChevronRight />
                </div>
                <div className="info-block">
                  <div className="info-head">
                    <div className="event-icon">
                      {/* <i data-feather="calendar" /> */}
                      <FiCalendar />
                    </div>
                    <span>Host</span>
                  </div>
                  <div className="info-body">
                    <p>{event.hostName}</p>
                  </div>
                </div>
                <div className="info-block">
                  <div className="info-head">
                    <div className="event-icon">
                      {/* <i data-feather="map-pin" /> */}
                      <FiMapPin />
                    </div>
                    <span>Location (Live from)</span>
                  </div>
                  <div className="info-body">
                    <a>{event.location}</a>
                  </div>
                </div>
                <div className="info-block">
                  <div className="info-head">
                    <div className="event-icon">
                      {/* <i data-feather="share-2" /> */}
                      <FiShare2 />
                    </div>
                    <span>Share</span>
                  </div>
                  <div className="info-body">
                    <div className="socials">
                      <a>
                        <FiFacebook />
                      </a>
                      <a>
                        <FiTwitter />
                      </a>
                      <a>
                        <FiLinkedin />
                      </a>
                      <a>
                        <FiInstagram />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <h2>Subscribe Now</h2>
                <div className="subscribe-block">
                  <p>Add this event to your calendar</p>
                  <button className="button is-solid primary-button raised">
                    Add To Calendar
                  </button>
                </div>
                <div className="condition has-text-centered">
                  <span>Or</span>
                </div>
                <div className="subscribe-block">
                  <p className="mr-3">
                    Scan this QR code with your phone to automatically register
                    for this event.
                  </p>
                  <div>
                    <QRCode value={window.location.href} size={100} />
                  </div>
                  {/* <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.href}`}
                    alt=""
                  /> */}
                </div>
              </div>
            </div>
            {/*Details*/}
            <div className="event-details">
              {/*Left Side*/}
              <div className="left">
                <div className="details-block">
                  <h3>Event Details</h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: event.eventDetails }}
                  />
                </div>
                <div className="details-block">
                  <h3>Event Photos and Videos</h3>
                  <div className="video-block-wrapper">
                    <div
                      id="video-embed"
                      className="video-block-inner"
                      data-url="https://www.youtube.com/watch?v=Q_y1NVb4WP8"
                    >
                      <div className="video-overlay" />
                      <div className="playbutton">
                        <div className="icon-play">
                          <FiPlay />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="photo-group">
                    <a
                      href="https://via.placeholder.com/1600x900"
                      data-demo-href="assets/img/demo/unsplash/54.jpg"
                      data-fancybox
                      data-caption
                    >
                      <img
                        src="https://via.placeholder.com/1600x900"
                        data-demo-src="assets/img/demo/unsplash/54.jpg"
                        alt=""
                      />
                    </a>
                    <a
                      href="https://via.placeholder.com/1600x900"
                      data-demo-href="assets/img/demo/unsplash/7.jpg"
                      data-fancybox
                      data-caption
                    >
                      <img
                        src="https://via.placeholder.com/1600x900"
                        data-demo-src="assets/img/demo/unsplash/7.jpg"
                        alt=""
                      />
                    </a>
                    <a
                      href="https://via.placeholder.com/1600x900"
                      data-demo-href="assets/img/demo/unsplash/4.jpg"
                      data-fancybox
                      data-caption
                    >
                      <img
                        src="https://via.placeholder.com/1600x900"
                        data-demo-src="assets/img/demo/unsplash/4.jpg"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              </div>
              {/*Right side*/}
              <div className="right">
                <div className="event-owner mt-3">
                  <img
                    className="avatar"
                    src="https://via.placeholder.com/150x150"
                    data-demo-src="assets/img/avatars/stella.jpg"
                    data-user-popover={2}
                    alt=""
                  />
                  <div className="meta">
                    <span>Event presenter</span>
                    <span>{event.presenter}</span>
                  </div>
                </div>
                <div className="side-block">
                  <div className="side-head">
                    <span>Phone Number</span>
                  </div>
                  <div className="side-body">
                    <a>{event.phoneNumber}</a>
                  </div>
                </div>
                <div className="side-block">
                  <div className="side-head">
                    <span>Email Address</span>
                  </div>
                  <div className="side-body">
                    <a>{event.emailAddress}</a>
                  </div>
                </div>
                <div className="side-block">
                  <div className="side-head">
                    <span>Website</span>
                  </div>
                  <div className="side-body">
                    <a href={event.website} target="_blank">
                      {event.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewPage;
