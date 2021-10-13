import React from "react";
import NavBar from "../../components/core/NavBar/NavBar";
import Menu from "../core/Menu";
import { FiFilm, FiShoppingCart, FiCalendar } from "react-icons/fi";

const frame = () => (
  <div className="settings-wrapper">
    <iframe
      height="1000"
      className="w-100 h-100"
      src="https://app.powerbi.com/view?r=eyJrIjoiYTVlYjA3NWYtMWQzNC00OWRjLWI1NzItNGFhODM5MGU1ODY2IiwidCI6ImMwMjUxMDg4LTgyMjAtNGIxNy1hNDc2LTY5YmZkMjE3NGQ2ZCIsImMiOjF9&pageName=ReportSectionb35d2a397c3724837762%22"
      frameborder="0"
      allowFullScreen="true"></iframe>
  </div>
);

const Analytics = (props) => {
  const { match } = props;
  return (
    <div className="view-wrapper is-full">
      <NavBar />
      <Menu {...props} />

      <div className="store-sections" style={{ paddingLeft: "5rem" }}>
        <div className="container">
          <center>
            {/*Brands*/}
            <div id="brands-tab" className="store-tab-pane is-active">
              <div className="columns is-multiline">
                {/* /partials/commerce/products/products-brands.html */}
                {/*Brand*/}
                <div className="column is-one-third-fullhd is-two-quarter-widescreen is-two-third-desktop is-two-third-tablet is-half-mobile">
                  <div className="brand-card">
                    <FiFilm style={{ width: "100%", fontSize: "80px" }} />
                    {/* <img src="assets/img/icons/shop/brands/1.svg" alt="" /> */}
                    <div className="meta">
                      <h3>By Events</h3>
                      <p>View Analytics by Events hosted</p>
                    </div>
                    <div className="brand-stats">
                      <div className="brand-stat">
                        <span>10</span>
                        <span>Events</span>
                      </div>
                      <div className="brand-stat">
                        <span>5</span>
                        <span>Published</span>
                      </div>
                      <div className="brand-stat">
                        <a className="button is-solid accent-button raised">
                          <span style={{ color: "white" }}>View</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/*Brand*/}
                <div className="column is-one-third-fullhd is-one-quarter-widescreen is-one-third-desktop is-one-third-tablet is-half-mobile">
                  <div className="brand-card">
                    <FiShoppingCart
                      style={{ width: "100%", fontSize: "80px" }}
                    />
                    {/* <img src="assets/img/icons/shop/brands/2.svg" alt="" /> */}
                    <div className="meta">
                      <h3>By Stores</h3>
                      <p>View Analytics by Stores</p>
                    </div>
                    <div className="brand-stats">
                      <div className="brand-stat">
                        <span>30</span>
                        <span>Events</span>
                      </div>
                      <div className="brand-stat">
                        <span>2</span>
                        <span>Stores</span>
                      </div>
                      <div className="brand-stat">
                        <a className="button is-solid accent-button raised">
                          <span style={{ color: "white" }}>View</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/*Brand*/}
                <div className="column is-one-third-fullhd is-one-quarter-widescreen is-one-third-desktop is-one-third-tablet is-half-mobile">
                  <div className="brand-card">
                    <FiCalendar style={{ width: "100%", fontSize: "80px" }} />
                    {/* <img src="assets/img/icons/shop/brands/3.svg" alt="" /> */}
                    <div className="meta">
                      <h3>By Date</h3>
                      <p>View Analytics by Dates / months</p>
                    </div>
                    <div className="brand-stats">
                      <div className="brand-stat">
                        <span>10</span>
                        <span>Events</span>
                      </div>
                      <div className="brand-stat">
                        <span>800</span>
                        <span>Published</span>
                      </div>
                      <div className="brand-stat">
                        <a className="button is-solid accent-button raised">
                          <span style={{ color: "white" }}>View</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/*Brand*/}
              </div>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
