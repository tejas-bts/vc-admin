import React from "react";
import { Link } from "react-router-dom";

function Menu({ page }) {
  return (
    <div className="view-wrapper is-full">
      <div className="videos-wrapper is-home">
        <div className="videos-sidebar is-active">
          <div className="videos-sidebar-inner">
            <div className="user-block">
              <a className="close-videos-sidebar">
                <i data-feather="x" />
              </a>
              <div className="avatar-wrap">
                <img
                  src="https://via.placeholder.com/150x150"
                  data-demo-src="assets/img/avatars/jenna.png"
                  data-user-popover={0}
                  alt=""
                />
                <div className="badge">
                  <i data-feather="check" />
                </div>
              </div>
              <h4>Whole Foods</h4>
              <p>Melbourne, AU</p>
              {/* <div className="user-stats">
                  <div className="stat-block">
                    <span>Videos</span>
                    <span>49</span>
                  </div>
                  <div className="stat-block">
                    <span>Followers</span>
                    <span>2.3K</span>
                  </div>
                </div> */}
            </div>
            <div className="user-menu">
              <div className="user-menu-inner has-slimscroll">
                <div className="menu-block">
                  <ul>
                    <li className={page === "home" ? "is-active" : null}>
                      <a>
                        <i data-feather="home" />
                        <span>Home</span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="separator" />
                <div className="menu-block">
                  <ul>
                    <li className={page === "users" ? "is-active" : null}>
                      <Link to="/events">
                        <i data-feather="users" />
                        <span>User Management</span>
                      </Link>
                    </li>

                    <li className={page === "events" ? "is-active" : null}>
                      <Link to="/events">
                        <i data-feather="youtube" />
                        <span>Event Management</span>
                      </Link>
                    </li>

                    <li>
                      <a>
                        <i data-feather="copy" />
                        <span>Relations</span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="separator" />
                <div className="menu-block">
                  <ul>
                    <li className={page === "settings" ? "is-active" : null}>
                      <a>
                        <i data-feather="sliders" />
                        <span>Settings</span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <i data-feather="life-buoy" />
                        <span>Help &amp; Support</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
