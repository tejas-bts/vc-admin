import React, { useState } from "react";
import { FiLifeBuoy, FiSettings, FiPower } from "react-icons/fi";
import DarkModeSwitch from "./DarkModeSwitch";
import Explorer from "./Explorer";
import NotificationDrop from "./NotificationDrop";
import { Link } from "react-router-dom";

function DesktopNavBar() {
  const [showNotification, setShowNotification] = useState(false);
  const [showExplorer, setShowExplorer] = useState(false);
  const toggleExplorer = () => {
    setShowExplorer(!showExplorer);
  };
  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  return (
    <div
      id="main-navbar"
      className="navbar navbar-v1 is-inline-flex is-transparent no-shadow is-hidden-mobile">
      <div className="container is-fluid">
        <div className="navbar-brand">
          <a href="/" className="navbar-item">
            <img
              className="logo light-image"
              src="assets/img/logo/friendkit-bold.svg"
              width={112}
              height={28}
              alt=""
            />
            <img
              className="logo dark-image"
              src="assets/img/logo/friendkit-white.svg"
              width={112}
              height={28}
              alt=""
            />
          </a>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            {/* Navbar Search */}
            <div className="navbar-item is-icon drop-trigger">
              <a className="icon-link" onClick={toggleNotification}>
                <i data-feather="bell" />
                <span className="indicator" />
              </a>
              <NotificationDrop isActive={showNotification} />
            </div>
            <div className="navbar-item is-icon">
              <a className="icon-link is-primary" onClick={toggleExplorer}>
                <i className="mdi mdi-apps" />
              </a>
            </div>
            <Explorer isActive={showExplorer} />
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div id="global-search" className="control">
                <input
                  id="tipue_drop_input"
                  className="input is-rounded"
                  type="text"
                  placeholder="Search"
                  required
                />
                <span id="clear-search" className="reset-search">
                  <i data-feather="x" />
                </span>
                <span className="search-icon">
                  <i data-feather="search" />
                </span>
                <div id="tipue_drop_content" className="tipue-drop-content" />
              </div>
            </div>
            <div
              id="account-dropdown"
              className="navbar-item is-account drop-trigger has-caret">
              <div className="user-image">
                <img
                  src="https://via.placeholder.com/400x400"
                  data-demo-src="assets/img/avatars/jenna.png"
                  alt=""
                />
                <span className="indicator" />
              </div>
              <div className="nav-drop is-account-dropdown">
                <div className="inner">
                  <div className="nav-drop-header">
                    <span className="username">Jenna Davos</span>
                      <DarkModeSwitch />
                  </div>
                  <div className="nav-drop-body account-items">
                    <Link
                      id="profile-link"
                      to="/userProfile"
                      className="account-item">
                      <div className="media">
                        <div className="media-left">
                          <div className="image">
                            <img
                              src="https://via.placeholder.com/400x400"
                              data-demo-src="assets/img/avatars/jenna.png"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="media-content">
                          <h3>Jenna Davis</h3>
                          <small>Main account</small>
                        </div>
                        <div className="media-right">
                          <i data-feather="check" />
                        </div>
                      </div>
                    </Link>
                    <hr className="account-divider" />
                    <a href="/pages-main.html" className="account-item">
                      <div className="media">
                        <div className="media-left">
                          <div className="image">
                            <img
                              src="https://via.placeholder.com/300x300"
                              data-demo-src="assets/img/avatars/hanzo.svg"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="media-content">
                          <h3>Css Ninja</h3>
                          <small>Company page</small>
                        </div>
                        <div className="media-right is-hidden">
                          <i data-feather="check" />
                        </div>
                      </div>
                    </a>
                    <a href="/pages-main.html" className="account-item">
                      <div className="media">
                        <div className="media-left">
                          <div className="image">
                            <img
                              src="https://via.placeholder.com/300x300"
                              data-demo-src="assets/img/icons/logos/fastpizza.svg"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="media-content">
                          <h3>Fast Pizza</h3>
                          <small>Company page</small>
                        </div>
                        <div className="media-right is-hidden">
                          <i data-feather="check" />
                        </div>
                      </div>
                    </a>
                    <a href="/pages-main.html" className="account-item">
                      <div className="media">
                        <div className="media-left">
                          <div className="image">
                            <img
                              src="https://via.placeholder.com/300x300"
                              data-demo-src="assets/img/icons/logos/slicer.svg"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="media-content">
                          <h3>Slicer</h3>
                          <small>Company page</small>
                        </div>
                        <div className="media-right is-hidden">
                          <i data-feather="check" />
                        </div>
                      </div>
                    </a>
                    <hr className="account-divider" />
                    <a href="/options-settings.html" className="account-item">
                      <div className="media">
                        <div className="icon-wrap">
                          {/* <i data-feather="settings" /> */}
                          <FiSettings />
                        </div>
                        <div className="media-content">
                          <h3>Settings</h3>
                          <small>Access widget settings.</small>
                        </div>
                      </div>
                    </a>
                    <a className="account-item">
                      <div className="media">
                        <div className="icon-wrap">
                          {/* <i data-feather="life-buoy" /> */}
                          <FiLifeBuoy />
                        </div>
                        <div className="media-content">
                          <h3>Help</h3>
                          <small>Contact our support.</small>
                        </div>
                      </div>
                    </a>
                    <a className="account-item">
                      <div className="media">
                        <div className="icon-wrap">
                          <i data-feather="power" />
                          <FiPower />
                        </div>
                        <div className="media-content">
                          <h3>Log out</h3>
                          <small>Log out from your account.</small>
                        </div>
                      </div>
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

export default DesktopNavBar;
