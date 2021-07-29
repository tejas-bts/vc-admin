import React, { useState, useContext } from "react";
import NavBar from "../core/NavBar/NavBar";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import authContext from "../../Context/authContext";

function Home() {
  let { allData, setAllData } = useContext(authContext);

  const tabs = {
    liveEvents: 0,
    upcomingEvents: 1,
    subscribedEvents: 2,
  };

  const [activeTab, setActiveTab] = useState(tabs.liveEvents);

  const userData = {
    profilePicture: allData.userDetails.profilePicture
      ? allData.userDetails.profilePicture
      : "https://via.placeholder.com/150x150",
    firstName: allData.userDetails.firstName
      ? allData.userDetails.firstName
      : "Chandler",
    lastName: allData.userDetails.lastName
      ? allData.userDetails.lastName
      : "Bing",
    emailAddress: allData.userDetails.emailAddress
      ? allData.userDetails.emailAddress
      : "something@something.com",
  };

  const userStats = {
    eventsCount: 20,
    interestsCount: 12,
    followingsCount: 36,
  };

  const upcomingEventsList = [
    {
      id: 1,
      brandLogo: "assets/img/icons/shop/brands/1.svg",
      eventTitle: "Wine tasting for ABC brand by John Doe",
      eventSubTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      eventDate: "10 - 12 - 2021",
      eventTime: "20: 00",
      eventHost: "Whole Foods",
      eventPresenter: "Trade Winds",
    },
    {
      id: 2,
      brandLogo: "assets/img/icons/shop/brands/2.svg",
      eventTitle: "Wine tasting for ABC brand by John Doe",
      eventSubTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      eventDate: "10 - 12 - 2021",
      eventTime: "20: 00",
      eventHost: "Whole Foods",
      eventPresenter: "Trade Winds",
    },
    {
      id: 3,
      brandLogo: "assets/img/icons/shop/brands/3.svg",
      eventTitle: "Wine tasting for ABC brand by John Doe",
      eventSubTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      eventDate: "10 - 12 - 2021",
      eventTime: "20: 00",
      eventHost: "Whole Foods",
      eventPresenter: "Trade Winds",
    },
    {
      id: 4,
      brandLogo: "assets/img/icons/shop/brands/4.svg",
      eventTitle: "Wine tasting for ABC brand by John Doe",
      eventSubTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      eventDate: "10 - 12 - 2021",
      eventTime: "20: 00",
      eventHost: "Whole Foods",
      eventPresenter: "Trade Winds",
    },
  ];

  const liveEventsList = [
    {
      id: 1,
      eventTitle: "Wine tasting for ABC brand by John Doe",
      eventSubTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      liveUsersCount: 137,
      streamThumbnail: "https://via.placeholder.com/400x200",
    },
    {
      id: 2,
      eventTitle: "Wine tasting for ABC brand by John Doe",
      eventSubTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      liveUsersCount: 137,
      streamThumbnail: "https://via.placeholder.com/400x200",
    },
    {
      id: 3,
      eventTitle: "Wine tasting for ABC brand by John Doe",
      eventSubTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      liveUsersCount: 137,
      streamThumbnail: "https://via.placeholder.com/400x200",
    },
    {
      id: 4,
      eventTitle: "Wine tasting for ABC brand by John Doe",
      eventSubTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      liveUsersCount: 137,
      streamThumbnail: "https://via.placeholder.com/400x200",
    },
    {
      id: 5,
      eventTitle: "Wine tasting for ABC brand by John Doe",
      eventSubTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      liveUsersCount: 137,
      streamThumbnail: "https://via.placeholder.com/400x200",
    },
  ];

  const filterCategories = [
    {
      categoryImage: "assets/img/icons/shop/all.svg",
      categoryTitle: "All",
    },
    {
      categoryImage: "assets/img/icons/shop/men.svg",
      categoryTitle: "Men",
    },
    {
      categoryImage: "assets/img/icons/shop/skirt.svg",
      categoryTitle: "Women",
    },
    {
      categoryImage: "assets/img/icons/shop/hat.svg",
      categoryTitle: "Hats",
    },
    {
      categoryImage: "assets/img/icons/shop/backpack.svg",
      categoryTitle: "Bags",
    },
    {
      categoryImage: "assets/img/icons/shop/shoes.svg",
      categoryTitle: "Shoes",
    },
    {
      categoryImage: "assets/img/icons/shop/clock.svg",
      categoryTitle: "Accessories",
    },
  ];

  return (
    <div>
      <NavBar />
      <div className="view-wrapper">
        <div className="products-navigation">
          <div className="container">
            <div className="navigation-inner">
              <div className="shop-info">
                <img src="assets/img/icons/logos/store.svg" alt="" />
                <h3>Iconic's Store</h3>
              </div>
              <div className="shop-actions">
                <a data-panel="categories-panel" className="shop-action">
                  <span>Categories</span>
                  <i data-feather="chevron-down" />
                </a>
                <a data-panel="filters-panel" className="shop-action">
                  <span>Filters</span>
                  <i data-feather="chevron-down" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div id="categories-panel" className="navigation-panel is-categories">
          <div className="navigation-panel-inner">
            <div className="container">
              <div className="panel-title">
                <h3>Categories</h3>
              </div>
              <div className="shop-categories">
                {/*Category*/}
                {filterCategories.map((item) => (
                  <div className="category-item">
                    <input type="radio" name="category_selection" />
                    <div className="item-inner">
                      <img
                        className="light-image"
                        src={item.categoryImage}
                        alt=""
                      />
                      <img
                        className="dark-image"
                        src={item.categoryImage}
                        alt=""
                      />
                      <h4>{item.categoryTitle}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div id="filters-panel" className="navigation-panel is-filters">
          <div className="navigation-panel-inner">
            <div className="container">
              <div className="search-filter">
                <div className="control has-icon">
                  <input
                    type="text"
                    className="input is-fade"
                    placeholder="Filter products..."
                  />
                  <div className="form-icon">
                    <i data-feather="filter" />
                  </div>
                </div>
              </div>
              <div className="filter-group">
                {/*Filter*/}
                <div className="control is-combo">
                  <div className="combo-box">
                    <div className="box-inner">
                      <div className="combo-item">
                        <i className="mdi mdi-currency-usd" />
                        <span className="selected-item">Price</span>
                      </div>
                    </div>
                    <div className="box-chevron">
                      <i data-feather="chevron-down" />
                    </div>
                    <div className="box-dropdown">
                      <div className="dropdown-inner has-slimscroll">
                        <ul>
                          <li>
                            <span className="item-icon">
                              <i className="mdi mdi-chevron-right" />
                            </span>
                            <span className="item-name">Free</span>
                            <span className="checkmark">
                              <i data-feather="check" />
                            </span>
                          </li>
                          <li>
                            <span className="item-icon">
                              <i className="mdi mdi-chevron-right" />
                            </span>
                            <span className="item-name">$0 - $25</span>
                            <span className="checkmark">
                              <i data-feather="check" />
                            </span>
                          </li>
                          <li>
                            <span className="item-icon">
                              <i className="mdi mdi-chevron-right" />
                            </span>
                            <span className="item-name">$26 - $100</span>
                            <span className="checkmark">
                              <i data-feather="check" />
                            </span>
                          </li>
                          <li>
                            <span className="item-icon">
                              <i className="mdi mdi-chevron-right" />
                            </span>
                            <span className="item-name">$100 +</span>
                            <span className="checkmark">
                              <i data-feather="check" />
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/*Filter*/}
                <div className="control is-combo">
                  <div className="combo-box">
                    <div className="box-inner">
                      <div className="combo-item">
                        <i className="mdi mdi-sort" />
                        <span className="selected-item">Sort</span>
                      </div>
                    </div>
                    <div className="box-chevron">
                      <i data-feather="chevron-down" />
                    </div>
                    <div className="box-dropdown">
                      <div className="dropdown-inner has-slimscroll">
                        <ul>
                          <li>
                            <span className="item-icon">
                              <i className="mdi mdi-sort-ascending" />
                            </span>
                            <span className="item-name">Ascending</span>
                            <span className="checkmark">
                              <i data-feather="check" />
                            </span>
                          </li>
                          <li>
                            <span className="item-icon">
                              <i className="mdi mdi-sort-descending" />
                            </span>
                            <span className="item-name">Descending</span>
                            <span className="checkmark">
                              <i data-feather="check" />
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/*Filter*/}
                <div className="control is-combo">
                  <div className="combo-box">
                    <div className="box-inner">
                      <div className="combo-item">
                        <i className="mdi mdi-filter-outline" />
                        <span className="selected-item">Other</span>
                      </div>
                    </div>
                    <div className="box-chevron">
                      <i data-feather="chevron-down" />
                    </div>
                    <div className="box-dropdown">
                      <div className="dropdown-inner has-slimscroll">
                        <ul>
                          <li>
                            <span className="item-icon">
                              <i className="mdi mdi-comment-search-outline" />
                            </span>
                            <span className="item-name">Popular</span>
                            <span className="checkmark">
                              <i data-feather="check" />
                            </span>
                          </li>
                          <li>
                            <span className="item-icon">
                              <i className="mdi mdi-creation" />
                            </span>
                            <span className="item-name">Best Sellers</span>
                            <span className="checkmark">
                              <i data-feather="check" />
                            </span>
                          </li>
                          <li>
                            <span className="item-icon">
                              <i className="mdi mdi-comment-eye-outline" />
                            </span>
                            <span className="item-name">On Sale</span>
                            <span className="checkmark">
                              <i data-feather="check" />
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="shop-page" className="shop-wrapper">
          <div className="shop-header">
            <div className="container">
              <div className="header-inner">
                <div className="store-block">
                  <div className="img-container">
                    <img src={userData.profilePicture} alt="" />
                    <div className="follow-badge is-hidden">
                      <i data-feather="check" />
                    </div>
                  </div>
                  <div className="store-meta">
                    <h3>{`${userData.firstName} ${userData.lastName}`}</h3>
                    <span>{userData.emailAddress}</span>
                  </div>
                </div>
                <div className="activity-block">
                  <h3>Overview</h3>
                  <div className="inner-wrap">
                    <div className="stat-block">
                      <div className="stat-number">{userStats.eventsCount}</div>
                      <span>Events</span>
                    </div>
                    <div className="stat-block is-bordered">
                      <div className="stat-number">
                        {userStats.interestsCount}
                      </div>
                      <span>Interests</span>
                    </div>
                    <div className="stat-block">
                      <div className="stat-number">
                        {userStats.followingsCount}
                      </div>
                      <span>Following</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="store-tabs">
                <a
                  data-tab="live-tab"
                  className={`tab-control ${
                    activeTab === tabs.liveEvents ? "is-active" : ""
                  }`}
                  onClick={() => {
                    setActiveTab(tabs.liveEvents);
                  }}>
                  Live Events
                </a>
                <a
                  data-tab="upcoming-tab"
                  className={`tab-control ${
                    activeTab === tabs.upcomingEvents ? "is-active" : ""
                  }`}
                  onClick={() => {
                    setActiveTab(tabs.upcomingEvents);
                  }}>
                  Upcoming
                </a>
                <a
                  data-tab="subscribed-tab"
                  className={`tab-control ${
                    activeTab === tabs.subscribedEvents ? "is-active" : ""
                  }`}
                  onClick={() => {
                    setActiveTab(tabs.subscribedEvents);
                  }}>
                  Subscribed
                </a>
                <div className="store-naver" />
              </div>
            </div>
          </div>
          <div className="store-sections">
            <div className="container">
              {/*Live Events*/}
              <div
                id="live-tab"
                className={`store-tab-pane ${
                  activeTab === tabs.liveEvents ? "is-active" : ""
                }`}>
                <div className="columns is-multiline">
                  {/* /partials/commerce/products/products-list.html */}
                  {/*Product*/}

                  {liveEventsList.map((event) => (
                    <Link
                      to="/past"
                      className="column is-three-fifth-desktop is-two-quarter-widescreen is-two-third-desktop is-one-third-tablet is-half-mobile">
                      <div
                        className="product-card"
                        data-name="Wine tasting for XYZ brand"
                        data-host="Whole Foods"
                        data-colors="true"
                        data-variants="true"
                        data-path="assets/img/products/1">
                        <div className="video-collection">
                          <a className="episode">
                            <img
                              src={event.streamThumbnail}
                              data-demo-src="assets/img/demo/video/home/collections/c17.jpg"
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="product-info">
                          <h3>{event.eventTitle}</h3>
                          <p>{event.eventSubTitle}</p>
                        </div>
                        <div className="product-actions">
                          <div className="left">
                            {/* <i
                                data-feather="eye"
                                style={{
                                  stroke: "#5596e6 !important",
                                  fill: "transparent !important",
                                }}
                              /> */}
                            <FiEye
                              style={{
                                stroke: "#5596e6 !important",
                                fill: "transparent !important",
                              }}
                            />
                            <span>{event.liveUsersCount}</span>
                          </div>
                          <div
                            className="right"
                            data-name="Wine tasting for XYZ brand"
                            data-price="Trade Winds Speciality"
                            data-colors="true"
                            data-variants="true"
                            data-path="assets/img/products/1">
                            <a
                              className="button is-solid accent-button raised quickview-trigger"
                              style={{
                                position: "inherit",
                                top: "0 !important",
                                right: "0 !important",
                                width: "100% !important",
                              }}>
                              <i data-feather="eye" />
                              <span>Watch Now</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                  {/* <div className="column is-three-fifth-desktop is-two-quarter-widescreen is-two-third-desktop is-one-third-tablet is-half-mobile">
                    <div
                      className="product-card"
                      data-name="Wine tasting for XYZ brand"
                      data-host="Whole Foods"
                      data-colors="true"
                      data-variants="true"
                      data-path="assets/img/products/1">
                      <div className="video-collection">
                        <a className="episode">
                          <img
                            src="https://via.placeholder.com/400x200"
                            data-demo-src="assets/img/demo/video/home/collections/c17.jpg"
                            alt=""
                          />
                        </a>
                      </div>
                      <div className="product-info">
                        <h3>Wine tasting for XYZ brand</h3>
                        <p>
                          Event short details capped to 80 words including space
                          Event short details capped to 80 words including space
                        </p>
                      </div>
                      <div className="product-actions">
                        <div className="left">
                          <i
                            data-feather="eye"
                            style={{
                              stroke: "#5596e6 !important",
                              fill: "transparent !important",
                            }}
                          />
                          <span> 147</span>
                        </div>
                        <div
                          className="right"
                          data-name="Wine tasting for XYZ brand"
                          data-price="Trade Winds Speciality"
                          data-colors="true"
                          data-variants="true"
                          data-path="assets/img/products/1">
                          <a
                            className="button is-solid accent-button raised quickview-trigger"
                            style={{
                              position: "inherit",
                              top: "0 !important",
                              right: "0 !important",
                              width: "100% !important",
                            }}>
                            <i data-feather="eye" />
                            <span>Watch Now</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/*Product*/}
                </div>
              </div>
              {/*Upcoming Events*/}
              <div
                id="upcoming-tab"
                className={`store-tab-pane ${
                  activeTab === tabs.upcomingEvents ? "is-active" : ""
                }`}>
                <div className="columns is-multiline">
                  {/* /partials/commerce/products/products-brands.html */}
                  {/*Brand*/}
                  {upcomingEventsList.map((event) => (
                    <Link
                      to="/landing"
                      className="column is-three-fifth-fullhd is-three-quarter-widescreen is-half-desktop is-one-third-tablet is-half-mobile">
                      <div className="brand-card">
                        <img src={event.brandLogo} alt="" />
                        <div className="meta">
                          <h3>{event.eventTitle}</h3>
                          <p>{event.eventSubTitle}</p>
                        </div>
                        <div className="brand-stats">
                          <div className="brand-stat">
                            <span>{event.eventDate}</span>
                            <span>Date</span>
                          </div>
                          <div className="brand-stat">
                            <span>{event.eventTime}</span>
                            <span>Time</span>
                          </div>
                          <div className="brand-stat">
                            <span>{event.eventHost}</span>
                            <span>Host</span>
                          </div>
                          <div className="brand-stat">
                            <span>{event.eventPresenter}</span>
                            <span>Presenter</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              {/*Subscribed Events*/}
              <div
                id="subscribed-tab"
                className={`store-tab-pane ${
                  activeTab === tabs.subscribedEvents ? "is-active" : ""
                }`}>
                {/* /partials/commerce/products/products-followers.html */}
                {/* Messages list container */}
                {/* /partials/pages/inbox/inbox-center-container.html */}
                {/* Central inbox part that holds the messages list */}
                <div className="inbox-center-container is-both-opened">
                  <div className="inbox-center-container-inner">
                    <div className="messages">
                      {/* Button group */}
                      {/* Messages list */}
                      <div
                        id="inbox-messages"
                        className="inbox-messages has-slimscroll">
                        <div className="inbox-messages-inner">
                          {/* Message cards */}
                          {/* /partials/pages/inbox/messages-list/messages-list.html */}
                          {/* Message card */}
                          <div
                            id="msg-card-0"
                            data-preview-id={0}
                            className="card is-msg has-attachment is-active">
                            <div className="card-content">
                              <div className="msg-header">
                                <span className="msg-from">
                                  <small>
                                    From: <a>@Dan</a>
                                  </small>
                                </span>
                                <span className="msg-attachment">
                                  <i data-feather="paperclip" />
                                </span>
                                <span className="msg-timestamp">
                                  oct 23 2018
                                </span>
                              </div>
                              <div className="msg-subject">
                                <i data-feather="star" />
                                <span>Hey there</span>
                              </div>
                              <div className="msg-snippet">
                                <p>
                                  Corporis tempora id quae fuga. Perspiciatis
                                  quam magnam dolores ut quia. Neque vero non
                                  laudantium animi omnis qui debitis minus
                                  molestias. Est ut minus est dolores quo harum
                                  illum suscipit cumque.
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* /Message card */}
                          {/* Message card */}
                          <div
                            id="msg-card-1"
                            data-preview-id={1}
                            className="card is-msg">
                            <div className="card-content">
                              <div className="msg-header">
                                <span className="msg-from">
                                  <small>
                                    From: <a>@Nelly</a>
                                  </small>
                                </span>
                                <span className="msg-attachment">
                                  <i data-feather="paperclip" />
                                </span>
                                <span className="msg-timestamp">
                                  oct 19 2018
                                </span>
                              </div>
                              <div className="msg-subject">
                                <i data-feather="star" />
                                <span>Send me the files</span>
                              </div>
                              <div className="msg-snippet">
                                <p>
                                  Corporis tempora id quae fuga. Perspiciatis
                                  quam magnam dolores ut quia. Neque vero non
                                  laudantium animi omnis qui debitis minus
                                  molestias. Est ut minus est dolores quo harum
                                  illum suscipit cumque.
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* /Message card */}
                          {/* Message card */}
                          <div
                            id="msg-card-2"
                            data-preview-id={2}
                            className="card is-msg">
                            <div className="card-content">
                              <div className="msg-header">
                                <span className="msg-from">
                                  <small>
                                    From: <a>@Milly</a>
                                  </small>
                                </span>
                                <span className="msg-attachment">
                                  <i data-feather="paperclip" />
                                </span>
                                <span className="msg-timestamp">
                                  oct 18 2018
                                </span>
                              </div>
                              <div className="msg-subject">
                                <i data-feather="star" />
                                <span>About friday night</span>
                              </div>
                              <div className="msg-snippet">
                                <p>
                                  Corporis tempora id quae fuga. Perspiciatis
                                  quam magnam dolores ut quia. Neque vero non
                                  laudantium animi omnis qui debitis minus
                                  molestias. Est ut minus est dolores quo harum
                                  illum suscipit cumque.
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* /Message card */}
                          {/* /Message card */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Messages preview */}
                {/* /partials/pages/inbox/inbox-message-container.html */}
                {/* Message Preview */}
                <div className="inbox-message-container">
                  <div className="inbox-message-container-inner">
                    {/* Message Previews */}
                    <div className="message-body has-slimscroll">
                      {/* Message 0 preview */}
                      {/* /partials/pages/inbox/message-previews/message-preview-0.html */}
                      <div
                        id="message-preview-0"
                        className="message-body-inner is-active">
                        <div className="box message-preview">
                          <div className="box-inner">
                            <div className="header">
                              <div className="avatar">
                                <img
                                  src="https://via.placeholder.com/300x300"
                                  data-demo-src="assets/img/avatars/dan.jpg"
                                  alt=""
                                  data-user-popover={1}
                                />
                              </div>
                              <div className="meta">
                                <div className="name">Dan Walker</div>
                                <div className="date">oct 23 2018, 01:02pm</div>
                              </div>
                              <div className="meta-right">
                                <div>
                                  <span className="tag is-important">
                                    Important
                                  </span>
                                </div>
                                <div>
                                  <i data-feather="paperclip" />
                                  <small>2 attachments</small>
                                </div>
                              </div>
                            </div>
                            <hr />
                            <div className="content">
                              <p>Hi there!</p>
                              <p>
                                Corporis tempora id quae fuga. Perspiciatis quam
                                magnam dolores ut quia. Neque vero non
                                laudantium animi omnis qui debitis minus
                                molestias. Est ut minus est dolores quo harum
                                illum suscipit cumque.
                              </p>
                              <p>
                                Natus vel ipsam suscipit est possimus qui quia.
                                Distinctio aspernatur quia tenetur harum.
                                Tempore qui aut ratione earum quia nam. Et
                                asperiores officiis delectus. Optio quisquam
                                nulla.
                              </p>
                              <p>
                                Sincerely, <br />
                                Dan.
                              </p>
                            </div>
                            <div className="has-text-right">
                              <a className="button is-solid grey-button is-bold raised">
                                Reply to Message
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="attachments">
                          <div className="attachments-header">
                            <div className="paperclip">
                              <i data-feather="paperclip" />
                            </div>
                          </div>
                          <div className="attachments-inner">
                            <div className="box has-file img">
                              <div className="box-inner">
                                <i data-feather="image" />
                                <h5>cover.jpg</h5>
                              </div>
                              <div className="actions-group">
                                <a className="action">
                                  <i data-feather="download" />
                                </a>
                                <a className="action">
                                  <i data-feather="maximize" />
                                </a>
                              </div>
                            </div>
                            <div className="box has-file sheet">
                              <div className="box-inner">
                                <i data-feather="file-text" />
                                <h5>project_budget.xlsx</h5>
                              </div>
                              <div className="actions-group">
                                <a className="action">
                                  <i data-feather="download" />
                                </a>
                                <a className="action">
                                  <i data-feather="arrow-right" />
                                </a>
                              </div>
                            </div>
                            <div className="box has-file doc">
                              <div className="box-inner">
                                <i data-feather="file-text" />
                                <h5>project_abstract.docx</h5>
                              </div>
                              <div className="actions-group">
                                <a className="action">
                                  <i data-feather="download" />
                                </a>
                                <a className="action">
                                  <i data-feather="arrow-right" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="reply-wrapper">
                          <div className="reply-title">
                            Reply to conversation
                            <i data-feather="help-circle" className="has-tip" />
                            {/* Title Popover */}
                            <div className="webui-popover-content">
                              <div className="popover-flex-block">
                                <div className="icon-block">
                                  <i data-feather="info" />
                                </div>
                                <div className="content-block">
                                  <span>Format message, </span>
                                  <span>
                                    Select the text you want to edit to make the
                                    toolbar appear.
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="reply-wrapper-inner">
                            <div className="flex-form">
                              <img
                                src="https://via.placeholder.com/300x300"
                                data-demo-src="assets/img/avatars/jenna.png"
                                alt=""
                              />
                              <div className="control">
                                <div className="reply-textarea" />
                              </div>
                            </div>
                            <div className="has-text-right">
                              <button
                                type="button"
                                className="
                          button
                          is-solid
                          accent-button
                          is-bold
                          raised
                          send-message
                        ">
                                Send Message
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Message 1 preview */}
                      {/* /partials/pages/inbox/message-previews/message-preview-1.html */}
                      <div
                        id="message-preview-1"
                        className="message-body-inner">
                        <div className="box message-preview">
                          <div className="box-inner">
                            <div className="header">
                              <div className="avatar">
                                <img
                                  src="https://via.placeholder.com/300x300"
                                  data-demo-src="assets/img/avatars/nelly.png"
                                  alt=""
                                  data-user-popover={9}
                                />
                              </div>
                              <div className="meta">
                                <div className="name">Nelly Schwartz</div>
                                <div className="date">oct 19 2018, 09:32am</div>
                              </div>
                              <div className="meta-right">
                                <div>
                                  <span className="tag is-important">
                                    Important
                                  </span>
                                </div>
                                <div className="is-vhidden">
                                  <i data-feather="paperclip" />
                                  <small>2 attachments</small>
                                </div>
                              </div>
                            </div>
                            <hr />
                            <div className="content">
                              <p>Hello Jenna,</p>
                              <p>
                                Corporis tempora id quae fuga. Perspiciatis quam
                                magnam dolores ut quia. Neque vero non
                                laudantium animi omnis qui debitis minus
                                molestias. Est ut minus est dolores quo harum
                                illum suscipit cumque.
                              </p>
                              <p>
                                Sincerely, <br />
                                Nelly.
                              </p>
                            </div>
                            <div className="has-text-right">
                              <a className="button is-solid grey-button is-bold raised">
                                Reply to Message
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="reply-wrapper">
                          <div className="reply-title">
                            Reply to conversation
                            <i data-feather="help-circle" className="has-tip" />
                            {/* Title Popover */}
                            <div className="webui-popover-content">
                              <div className="popover-flex-block">
                                <div className="icon-block">
                                  <i data-feather="info" />
                                </div>
                                <div className="content-block">
                                  <span>Format message, </span>
                                  <span>
                                    Select the text you want to edit to make the
                                    toolbar appear.
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="reply-wrapper-inner">
                            <div className="flex-form">
                              <img
                                src="https://via.placeholder.com/300x300"
                                data-demo-src="assets/img/avatars/jenna.png"
                                alt=""
                              />
                              <div className="control">
                                <div className="reply-textarea" />
                              </div>
                            </div>
                            <div className="has-text-right">
                              <button
                                type="button"
                                className="
                          button
                          is-solid
                          accent-button
                          is-bold
                          raised
                          send-message
                        ">
                                Send Message
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="message-preview-transition is-first">
                          <div className="mail">
                            <i data-feather="mail" />
                          </div>
                        </div>
                        <div className="box message-preview">
                          <div className="box-inner">
                            <div className="header">
                              <div className="avatar">
                                <img
                                  src="https://via.placeholder.com/300x300"
                                  data-demo-src="assets/img/avatars/jenna.png"
                                  alt=""
                                  data-user-popover={0}
                                />
                              </div>
                              <div className="meta">
                                <div className="name">Jenna Davis</div>
                                <div className="date">oct 18 2018, 08:19pm</div>
                              </div>
                              <div className="meta-right">
                                <div>
                                  <span className="tag is-important">
                                    Important
                                  </span>
                                </div>
                                <div className="is-vhidden">
                                  <i data-feather="paperclip" />
                                  <small>2 attachments</small>
                                </div>
                              </div>
                            </div>
                            <hr />
                            <div className="content">
                              <p>Hello Nelly,</p>
                              <p>
                                Corporis tempora id quae fuga. Perspiciatis quam
                                magnam dolores ut quia. Neque vero non
                                laudantium animi omnis qui debitis minus
                                molestias. Est ut minus est dolores quo harum
                                illum suscipit cumque.
                              </p>
                              <p>
                                Thanks, <br />
                                Jenna.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="message-preview-transition">
                          <div className="mail">
                            <i data-feather="mail" />
                          </div>
                        </div>
                        <div className="box message-preview">
                          <div className="box-inner">
                            <div className="header">
                              <div className="avatar">
                                <img
                                  src="https://via.placeholder.com/300x300"
                                  data-demo-src="assets/img/avatars/nelly.png"
                                  alt=""
                                  data-user-popover={9}
                                />
                              </div>
                              <div className="meta">
                                <div className="name">Nelly Schwartz</div>
                                <div className="date">oct 18 2018, 02:42pm</div>
                              </div>
                              <div className="meta-right">
                                <div>
                                  <span className="tag is-important">
                                    Important
                                  </span>
                                </div>
                                <div className="is-vhidden">
                                  <i data-feather="paperclip" />
                                  <small>2 attachments</small>
                                </div>
                              </div>
                            </div>
                            <hr />
                            <div className="content">
                              <p>Hi again Jenna,</p>
                              <p>
                                Corporis tempora id quae fuga. Perspiciatis quam
                                magnam dolores ut quia. Neque vero non
                                laudantium animi omnis qui debitis minus
                                molestias. Est ut minus est dolores quo harum
                                illum suscipit cumque.
                              </p>
                              <p>
                                Hope we will sort it out, <br />
                                Nelly.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Message 2 preview */}
                      {/* /partials/pages/inbox/message-previews/message-preview-2.html */}
                      <div
                        id="message-preview-2"
                        className="message-body-inner">
                        <div className="box message-preview">
                          <div className="box-inner">
                            <div className="header">
                              <div className="avatar">
                                <img
                                  src="https://via.placeholder.com/300x300"
                                  data-demo-src="assets/img/avatars/milly.jpg"
                                  alt=""
                                  data-user-popover={7}
                                />
                              </div>
                              <div className="meta">
                                <div className="name">Milly Augustine</div>
                                <div className="date">oct 18 2018, 10:48pm</div>
                              </div>
                              <div className="meta-right">
                                <div className="is-vhidden">
                                  <span className="tag is-important">
                                    Important
                                  </span>
                                </div>
                                <div className="is-vhidden">
                                  <i data-feather="paperclip" />
                                  <small>2 attachments</small>
                                </div>
                              </div>
                            </div>
                            <hr />
                            <div className="content">
                              <p>Hey sweety,</p>
                              <p>
                                Corporis tempora id quae fuga. Perspiciatis quam
                                magnam dolores ut quia. Neque vero non
                                laudantium animi omnis qui debitis minus
                                molestias. Est ut minus est dolores quo harum
                                illum suscipit cumque.
                              </p>
                              <p>
                                I hope we will have fun, <br />
                                Milly.
                              </p>
                            </div>
                            <div className="has-text-right">
                              <a className="button is-solid grey-button is-bold raised">
                                Reply to Message
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="reply-wrapper">
                          <div className="reply-title">
                            Reply to conversation
                            <i data-feather="help-circle" className="has-tip" />
                            {/* Title Popover */}
                            <div className="webui-popover-content">
                              <div className="popover-flex-block">
                                <div className="icon-block">
                                  <i data-feather="info" />
                                </div>
                                <div className="content-block">
                                  <span>Format message, </span>
                                  <span>
                                    Select the text you want to edit to make the
                                    toolbar appear.
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="reply-wrapper-inner">
                            <div className="flex-form">
                              <img
                                src="https://via.placeholder.com/300x300"
                                data-demo-src="assets/img/avatars/jenna.png"
                                alt=""
                              />
                              <div className="control">
                                <div className="reply-textarea" />
                              </div>
                            </div>
                            <div className="has-text-right">
                              <button
                                type="button"
                                className="
                          button
                          is-solid
                          accent-button
                          is-bold
                          raised
                          send-message
                        ">
                                Send Message
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Message 3 preview */}
                      {/* /partials/pages/inbox/message-previews/message-preview-3.html */}
                      <div
                        id="message-preview-3"
                        className="message-body-inner">
                        <div className="box message-preview">
                          <div className="box-inner">
                            <div className="header">
                              <div className="avatar">
                                <img
                                  src="https://via.placeholder.com/300x300"
                                  data-demo-src="assets/img/avatars/dan.jpg"
                                  alt=""
                                  data-user-popover={1}
                                />
                              </div>
                              <div className="meta">
                                <div className="name">Dan Walker</div>
                                <div className="date">oct 12 2018, 05:12pm</div>
                              </div>
                              <div className="meta-right">
                                <div className="is-vhidden">
                                  <span className="tag is-important">
                                    Important
                                  </span>
                                </div>
                                <div>
                                  <i data-feather="paperclip" />
                                  <small>2 attachments</small>
                                </div>
                              </div>
                            </div>
                            <hr />
                            <div className="content">
                              <p>Hey Jenna!</p>
                              <p>
                                Corporis tempora id quae fuga. Perspiciatis quam
                                magnam dolores ut quia. Neque vero non
                                laudantium animi omnis qui debitis minus
                                molestias. Est ut minus est dolores quo harum
                                illum suscipit cumque.
                              </p>
                              <p>
                                See ya, <br />
                                Dan.
                              </p>
                            </div>
                            <div className="has-text-right">
                              <a className="button is-solid grey-button is-bold raised">
                                Reply to Message
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="attachments">
                          <div className="attachments-header">
                            <div className="paperclip">
                              <i data-feather="paperclip" />
                            </div>
                          </div>
                          <div className="attachments-inner">
                            <div className="box has-file pdf">
                              <div className="box-inner">
                                <i data-feather="file-text" />
                                <h5>ng_book.pdf</h5>
                              </div>
                              <div className="actions-group">
                                <a className="action">
                                  <i data-feather="download" />
                                </a>
                                <a className="action">
                                  <i data-feather="arrow-right" />
                                </a>
                              </div>
                            </div>
                            <div className="box has-file slides">
                              <div className="box-inner">
                                <i data-feather="file-text" />
                                <h5>ng_book2.opt</h5>
                              </div>
                              <div className="actions-group">
                                <a className="action">
                                  <i data-feather="download" />
                                </a>
                                <a className="action">
                                  <i data-feather="arrow-right" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="reply-wrapper">
                          <div className="reply-title">
                            Reply to conversation
                            <i data-feather="help-circle" className="has-tip" />
                            {/* Title Popover */}
                            <div className="webui-popover-content">
                              <div className="popover-flex-block">
                                <div className="icon-block">
                                  <i data-feather="info" />
                                </div>
                                <div className="content-block">
                                  <span>Format message, </span>
                                  <span>
                                    Select the text you want to edit to make the
                                    toolbar appear.
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="reply-wrapper-inner">
                            <div className="flex-form">
                              <img
                                src="https://via.placeholder.com/300x300"
                                data-demo-src="assets/img/avatars/jenna.png"
                                alt=""
                              />
                              <div className="control">
                                <div className="reply-textarea" />
                              </div>
                            </div>
                            <div className="has-text-right">
                              <button
                                type="button"
                                className="
                          button
                          is-solid
                          accent-button
                          is-bold
                          raised
                          send-message
                        ">
                                Send Message
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="product-quickview"
          className="modal product-quickview is-large has-light-bg">
          <div className="modal-background quickview-background" />
          <div className="modal-content">
            <div className="card">
              <div className="quickview-loader is-active">
                <div className="loader is-loading" />
              </div>
              <div className="left">
                <div className="product-image is-active">
                  <img src="assets/img/products/1.svg" alt="" />
                </div>
              </div>
              <div className="right">
                <div className="header">
                  <div className="product-info">
                    <h3 id="quickview-name">Product Name</h3>
                    <p id="quickview-host">Product tagline text</p>
                  </div>
                </div>
                <div className="properties">
                  {/*Colors*/}
                  {/* <div id="size-properties" class="property-group">
                          <h4>Sizes</h4>
                          <div class="property-box is-sizes">

                              <div class="property-item">
                                  <input type="radio" name="quickview_sizes" id="S">
                                  <div class="item-inner">
                                      <span class="size-label">S</span>
                                  </div>
                              </div>

                              <div class="property-item">
                                  <input type="radio" name="quickview_sizes" id="M" checked>
                                  <div class="item-inner">
                                      <span class="size-label">M</span>
                                  </div>
                              </div>

                              <div class="property-item">
                                  <input type="radio" name="quickview_sizes" id="L">
                                  <div class="item-inner">
                                      <span class="size-label">L</span>
                                  </div>
                              </div>

                              <div class="property-item">
                                  <input type="radio" name="quickview_sizes" id="XL">
                                  <div class="item-inner">
                                      <span class="size-label">XL</span>
                                  </div>
                              </div>
                          </div>
                      </div id="color-properties">
                  </div> */}
                  {/*Description*/}
                  <div className="quickview-description content has-slimscroll">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit.Scrupulum, inquam, abeunti; Ubi ut eam caperet aut
                      quando? Erat enim Polemonis. Utram tandem linguam nescio?
                      Duo Reges: constructio interrete.{" "}
                    </p>
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

export default Home;
