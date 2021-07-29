import React, { useState } from "react";
import NotificationDrop from "./NotificationDrop";
import Explorer from "./Explorer";

export default function MobileNavBar() {
  const [showNotification,setShowNotification] = useState(false);
  const [showExplorer,setShowExplorer] = useState(false);
  const [searchActive,setSearchActive] = useState(false);
  const toggleExplorer = () => {setShowExplorer(!showExplorer)}
  const toggleNotification = () => {setShowNotification(!showNotification)}

    return (
        <div>
        <nav className="navbar mobile-navbar is-hidden-desktop" aria-label="main navigation">
          {/* Brand */}
          <div className={`navbar-brand ${searchActive? 'is-hidden' : ''}`}>
            <a className="navbar-item" href="/">
              <img className="light-image" src="assets/img/logo/friendkit-bold.svg" alt="" />
              <img className="dark-image" src="assets/img/logo/friendkit-white.svg" alt="" />
            </a>
            <NotificationDrop isActive={showNotification} />
          
          <div id="mobile-explorer-trigger" className="navbar-item is-icon">
            <a className="icon-link is-primary" onClick={toggleExplorer}>
              <i className="mdi mdi-apps" />
            </a>
          </div>
          <div id="open-mobile-search" className="navbar-item is-icon">
            <a className="icon-link is-primary" href="javascript:void(0);">
              <i data-feather="search" />
            </a>
          </div>
          {/* Mobile menu toggler icon */}
          <div className="navbar-burger">
            <span />
            <span />
            <span />
          </div>
        </div>
        {/* Navbar mobile menu */}
        <div className="navbar-menu">
          {/* Account */}
          <div className="navbar-item has-dropdown is-active">
            <a href="/navbar-v1-profile-main.html" className="navbar-link">
              <img
                src="https://via.placeholder.com/150x150"
                data-demo-src="assets/img/avatars/jenna.png"
                alt=""
              />
              <span className="is-heading">Jenna Davis</span>
            </a>
            {/* Mobile Dropdown */}
            <div className="navbar-dropdown">
              <a
                href="/navbar-v1-feed.html"
                className="navbar-item is-flex is-mobile-icon">
                <span>
                  <i data-feather="activity" />
                  Feed
                </span>
                <span className="menu-badge">87</span>
              </a>
              <a
                href="/navbar-v1-videos-home-v2.html"
                className="navbar-item is-flex is-mobile-icon">
                <span>
                  <i data-feather="play-circle" />
                  Watch
                </span>
                <span className="menu-badge">21</span>
              </a>
            </div>
            <div className="navbar-item is-icon">
              <a className="icon-link is-primary" onClick={() => setSearchActive(true)}>
                <i data-feather="search" />
              </a>
            </div>
          </div>
          {/* Navbar mobile menu */}
          <div className={`navbar-menu ${searchActive? 'is-hidden' : ''}`}>
            {/* Account */}
            <div className="navbar-item has-dropdown is-active">
              <a href="/navbar-v1-profile-main.html" className="navbar-link">
                <img src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/jenna.png" alt="" />
                <span className="is-heading">Jenna Davis</span>
              </a>
              <a
                href="/navbar-v1-settings.html"
                className="navbar-item is-flex is-mobile-icon">
                <span>
                  <i data-feather="settings" />
                  Settings
                </span>
              </a>
              <a href="#" className="navbar-item is-flex is-mobile-icon">
                <span>
                  <i data-feather="log-out" />
                  Logout
                </span>
              </a>
            </div>
          </div>
          {/*Search*/}
          <div className={`mobile-search ${searchActive? '' : 'is-hidden'}`}>
            <div className="control">
              <input id="tipue_drop_input_mobile" className="input" placeholder="Search..." />
              <div className="form-icon">
                <i data-feather="search" />
              </div>
              <div className="close-icon" onClick={() => {setSearchActive(false)}}>
                <i data-feather="x" />
              </div>
              <div id="tipue_drop_content_mobile" className="tipue-drop-content" />
            </div>
            <div
              id="tipue_drop_content_mobile"
              className="tipue-drop-content"
            />
          </div>
        </div>
      </nav>
      <Explorer isActive={showExplorer} />
    </div>
  );
}
