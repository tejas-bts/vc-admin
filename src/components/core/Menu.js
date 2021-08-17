import React from "react";
import { Link } from "react-router-dom";

function Menu(props) {
  const path = props.location.pathname;
  console.log("Menu Props");
  const { page } = props;
  return (
    // <div className="view-wrapper is-full">
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
                    <li className={path.includes("contacts") ? "is-active" : null}>
                      <Link to="/home/contacts">
                        <span>User Management</span>
                      </Link>
                    </li>
                    <li className={path.includes("events") ? "is-active" : null}>
                      <Link to="/home/events">
                        <span>Event Management</span>
                      </Link>
                    </li>
                    <li className={path.includes("suppliers") ? "is-active" : null}>
                      <Link to="/home/suppliers">
                        <span>Suppliers Management</span>
                      </Link>
                    </li>
                    <li className={path.includes("organizations") ? "is-active" : null}>
                      <Link to="/home/organizations">
                        <span>Organizations Management</span>
                      </Link>
                    </li>
                    <li className={path.includes("stores") ? "is-active" : null}>
                      <Link to="/home/stores">
                        <span>Stores Management</span>
                      </Link>
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
    // </div>
  );
}

export default Menu;
