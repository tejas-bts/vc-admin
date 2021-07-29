import React from "react";
import NavBar from "../core/NavBar/NavBar";

function AdminAbout() {
  return (
    <div>
      <NavBar />
      <div className="view-wrapper">
        {/* Container */}
        <div className="container is-custom">
          {/* Profile page main wrapper */}
          <div id="pages-about" className="view-wrap is-headless">
            <div className="columns is-multiline no-margin">
              {/* Left side column */}
              <div className="column is-paddingless">
                {/* Timeline Header */}
                {/* html/partials/pages/pages/page-profile-header.html */}
                <div className="cover-bg">
                  <img
                    className="cover-image"
                    src="https://via.placeholder.com/1600x460"
                    data-demo-src="assets/img/demo/bg/4.jpg"
                    alt=""
                  />
                  <div className="avatar">
                    <img
                      id="user-avatar"
                      className="avatar-image"
                      src="https://via.placeholder.com/300x300"
                      data-demo-src="assets/img/icons/logos/fastpizza.svg"
                      alt=""
                    />
                    <div className="avatar-button">
                      <i data-feather="plus" />
                    </div>
                    <div
                      className="pop-button is-far-left has-tooltip modal-trigger"
                      data-modal="change-profile-pic-modal"
                      data-placement="right"
                      data-title="Change profile picture">
                      <a className="inner">
                        <i data-feather="camera" />
                      </a>
                    </div>
                    <div
                      id="follow-pop"
                      className="pop-button pop-shift is-left has-tooltip"
                      data-placement="top"
                      data-title="Subscription">
                      <a className="inner">
                        <i className="inactive-icon" data-feather="bell" />
                        <i className="active-icon" data-feather="bell-off" />
                      </a>
                    </div>
                    <div
                      id="invite-pop"
                      className="pop-button pop-shift is-center has-tooltip"
                      data-placement="top"
                      data-title="Relationship">
                      <a href="#" className="inner">
                        <i className="inactive-icon" data-feather="plus" />
                        <i className="active-icon" data-feather="minus" />
                      </a>
                    </div>
                    <div
                      id="chat-pop"
                      className="pop-button is-right has-tooltip"
                      data-placement="top"
                      data-title="Chat">
                      <a className="inner">
                        <i data-feather="message-square" />
                      </a>
                    </div>
                    <div
                      className="pop-button is-far-right has-tooltip"
                      data-placement="right"
                      data-title="Send message">
                      <a href="messages-inbox.html" className="inner">
                        <i data-feather="mail" />
                      </a>
                    </div>
                  </div>
                  <div className="cover-overlay" />
                  <div
                    className="cover-edit modal-trigger"
                    data-modal="change-cover-modal">
                    <i className="mdi mdi-camera" />
                    <span>Edit cover image</span>
                  </div>
                  {/*/html/partials/pages/pages/dropdowns/page-timeline-mobile-dropdown.html*/}
                  <div className="dropdown is-spaced is-right is-accent dropdown-trigger timeline-mobile-dropdown is-hidden-desktop">
                    <div>
                      <div className="button">
                        <i data-feather="more-vertical" />
                      </div>
                    </div>
                    <div className="dropdown-menu" role="menu">
                      <div className="dropdown-content">
                        <a href="/pages-main.html" className="dropdown-item">
                          <div className="media">
                            <i data-feather="activity" />
                            <div className="media-content">
                              <h3>Timeline</h3>
                              <small>Open Timeline.</small>
                            </div>
                          </div>
                        </a>
                        <a href="/pages-about.html" className="dropdown-item">
                          <div className="media">
                            <i data-feather="align-right" />
                            <div className="media-content">
                              <h3>About</h3>
                              <small>See about info.</small>
                            </div>
                          </div>
                        </a>
                        <a
                          href="/pages-community.html"
                          className="dropdown-item">
                          <div className="media">
                            <i data-feather="globe" />
                            <div className="media-content">
                              <h3>Community</h3>
                              <small>See community.</small>
                            </div>
                          </div>
                        </a>
                        <a href="/pages-photos.html" className="dropdown-item">
                          <div className="media">
                            <i data-feather="image" />
                            <div className="media-content">
                              <h3>Photos</h3>
                              <small>See all photos.</small>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="profile-menu is-hidden-mobile">
                  <div className="menu-start">
                    <a
                      href="admin-profile-listing.html"
                      className="button has-min-width">
                      Home
                    </a>
                    <a
                      href="admin-profile-about.html"
                      className="button has-min-width">
                      About
                    </a>
                  </div>
                </div>
                <div className="profile-subheader">
                  <div className="subheader-start is-hidden-mobile">
                    <span>148K</span>
                    <span>Followers</span>
                  </div>
                  <div className="subheader-middle">
                    <h2>Whole Foods</h2>
                    <span>Riverdale park, MD</span>
                  </div>
                  <div className="subheader-end is-hidden-mobile">
                    <div className="subheader-start is-hidden-mobile">
                      <span>250</span>
                      <span>Videos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns has-portrait-padding">
              <div className="column is-4">
                {/* Community widget */}
                {/* html/partials/pages/widgets/page-community-widget.html */}
                <div className="box-heading">
                  <h4>Info</h4>
                  <div className="dropdown is-neutral is-spaced is-right dropdown-trigger">
                    <div>
                      <div className="button">
                        <i data-feather="more-vertical" />
                      </div>
                    </div>
                    <div className="dropdown-menu" role="menu">
                      <div className="dropdown-content">
                        <a href="profile-about.html" className="dropdown-item">
                          <div className="media">
                            <i data-feather="eye" />
                            <div className="media-content">
                              <h3>View</h3>
                              <small>View user details.</small>
                            </div>
                          </div>
                        </a>
                        <a href="#" className="dropdown-item">
                          <div className="media">
                            <i data-feather="search" />
                            <div className="media-content">
                              <h3>Related</h3>
                              <small>Search for related users.</small>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="basic-infos-wrapper">
                  <div className="card is-community">
                    <h4>Community</h4>
                    <div className="flex-block">
                      <i data-feather="users" />
                      <p>
                        <a>Invite your friends</a> to follow this page
                      </p>
                    </div>
                    <div className="flex-block">
                      <i data-feather="thumbs-up" />
                      <p>150K people like this page</p>
                    </div>
                    <div className="flex-block">
                      <i data-feather="cast" />
                      <p>90K people are following this</p>
                    </div>
                  </div>
                  <div className="card is-about">
                    <h4>About</h4>
                    <div className="flex-block">
                      <i data-feather="message-circle" />
                      <p>
                        <a>Send a Message</a>
                      </p>
                    </div>
                    <div className="flex-block">
                      <i data-feather="shopping-bag" />
                      <p>
                        <a>Commercial Company</a>
                      </p>
                    </div>
                    <div className="flex-block">
                      <i data-feather="edit-3" />
                      <p>
                        <a>Retailer</a>
                      </p>
                    </div>
                  </div>
                  <div className="card is-friendkit">
                    <div className="title-wrap">
                      <img src="assets/img/logo/friendkit-bold.svg" alt="" />
                      <h4>Security</h4>
                    </div>
                    <p>
                      Idem iste, inquam, de voluptate quid sentit? Re mihi non
                      aeque satisfacit, et quidem locis pluribus. Consequens
                      enim est et post oritur, ut dixi.
                    </p>
                    <div className="created">
                      <i data-feather="flag" />
                      <span>Page created on May 6th 2019</span>
                    </div>
                  </div>
                </div>
                {/* Related pages widget */}
                {/* html/partials/pages/widgets/pages-related-pages-widget.html */}
                <div className="card">
                  <div className="card-heading is-bordered">
                    <h4>Related Pages</h4>
                    <div className="dropdown is-spaced is-neutral is-right dropdown-trigger">
                      <div>
                        <div className="button">
                          <i data-feather="more-vertical" />
                        </div>
                      </div>
                      <div className="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                          <a href="#" className="dropdown-item">
                            <div className="media">
                              <i data-feather="file-text" />
                              <div className="media-content">
                                <h3>All Recommandations</h3>
                                <small>View all recommandations.</small>
                              </div>
                            </div>
                          </a>
                          <a className="dropdown-item">
                            <div className="media">
                              <i data-feather="settings" />
                              <div className="media-content">
                                <h3>Settings</h3>
                                <small>Access widget settings.</small>
                              </div>
                            </div>
                          </a>
                          <hr className="dropdown-divider" />
                          <a href="#" className="dropdown-item">
                            <div className="media">
                              <i data-feather="trash-2" />
                              <div className="media-content">
                                <h3>Remove</h3>
                                <small>
                                  Removes this widget from your feed.
                                </small>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body no-padding">
                    {/* Recommended Page */}
                    <div className="page-block transition-block">
                      <img
                        src="https://via.placeholder.com/300x300"
                        data-demo-src="assets/img/icons/logos/gopizza.svg"
                        data-page-popover={13}
                        alt=""
                      />
                      <div className="page-meta">
                        <span>Whole Foods</span>
                        <span>Austin</span>
                      </div>
                      <div className="add-page add-transition">
                        <i data-feather="bookmark" />
                      </div>
                    </div>
                    {/* Recommended Page */}
                    <div className="page-block transition-block">
                      <img
                        src="https://via.placeholder.com/300x300"
                        data-demo-src="assets/img/icons/logos/oreilly.svg"
                        data-page-popover={14}
                        alt=""
                      />
                      <div className="page-meta">
                        <span>Whole Foods</span>
                        <span>Nagpur</span>
                      </div>
                      <div className="add-page add-transition">
                        <i data-feather="bookmark" />
                      </div>
                    </div>
                    {/* Recommended Page */}
                    <div className="page-block transition-block">
                      <img
                        src="https://via.placeholder.com/300x300"
                        data-demo-src="assets/img/icons/logos/epicburger.svg"
                        data-page-popover={15}
                        alt=""
                      />
                      <div className="page-meta">
                        <span>Whole Foods</span>
                        <span>Marryland</span>
                      </div>
                      <div className="add-page add-transition">
                        <i data-feather="bookmark" />
                      </div>
                    </div>
                    {/* Recommended Page */}
                    <div className="page-block transition-block">
                      <img
                        src="https://via.placeholder.com/300x300"
                        data-demo-src="assets/img/icons/logos/subs.svg"
                        data-page-popover={16}
                        alt=""
                      />
                      <div className="page-meta">
                        <span>Whole Foods</span>
                        <span>UK</span>
                      </div>
                      <div className="add-page add-transition">
                        <i data-feather="bookmark" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-8">
                <div className="card page-about-card">
                  <div className="card-title">
                    <h4>About Whole Foods</h4>
                    <a
                      href="https://www.wholefoodsmarket.co.uk/"
                      target="_blank"
                      className="button is-solid grey-button raised">
                      Go to Website
                    </a>
                  </div>
                  <div className="about-body">
                    <div className="columns">
                      <div className="column is-5">
                        <div className="about-block">
                          <div className="block-header">
                            <h4>Contact Info</h4>
                          </div>
                          <div className="block-content">
                            <div className="flex-inner">
                              <i data-feather="phone" />
                              <span>
                                Call <a>+555-654-545-88</a>
                              </span>
                            </div>
                            <div className="flex-inner">
                              <i data-feather="message-circle" />
                              <span>
                                Start a <a>Conversation</a>
                              </span>
                            </div>
                            <div className="flex-inner">
                              <i data-feather="globe" />
                              <span>
                                <a>https://www.wholefoodsmarket.co.uk/</a>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="about-block">
                          <div className="block-header">
                            <h4>More Info</h4>
                          </div>
                          <div className="block-content">
                            <div className="flex-inner has-meta">
                              <i className="mdi mdi-office-building" />
                              <div className="meta">
                                <span>Company</span>
                                <span>Whole Foods is a global Food market</span>
                              </div>
                            </div>
                            <div className="flex-inner has-meta">
                              <i className="mdi mdi-earth" />
                              <div className="meta">
                                <span>Around the world</span>
                                <span>
                                  WholeFoods has 28,489 stores around the world
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="column is-6">
                        <div className="about-block">
                          <div className="block-header">
                            <h4>History</h4>
                          </div>
                          <div className="block-content">
                            <div className="history-block">
                              <div className="date">1960's</div>
                              <div className="timeline">
                                <ul>
                                  <li>
                                    ABC and his brother XYZ purchase "Small E
                                    Store", a pizza restaurant in Saratoga,
                                    Michigan.
                                  </li>
                                  <li>
                                    The first Fast Pizza franchise restaurant
                                    opens in Saratoga, Michigan.
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="history-block">
                              <div className="date">1970's</div>
                              <div className="timeline">
                                <ul>
                                  <li>
                                    Amstar Corp., maker of Fast Pace, institutes
                                    a trademark infringement lawsuit against
                                    Fast Pizza.
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="history-block">
                              <div className="date">1980's</div>
                              <div className="timeline">
                                <ul>
                                  <li>
                                    Fast Pizza's first international restaurant
                                    opens in Winnipeg, Canada. The 1000th Fast
                                    Pizza's restaurant opens.
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAbout;
