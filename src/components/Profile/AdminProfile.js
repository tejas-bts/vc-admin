import React from "react";
import NavBar from "../core/NavBar/NavBar";

function AdminProfile() {
  return (
    <div>
      <NavBar />
      <div className="view-wrapper is-full">
        <div className="videos-wrapper is-home">
          {/* /html/partials/pages/videos/videos-sidebar.html */}
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
                <div className="user-stats">
                  <div className="stat-block">
                    <span>Videos</span>
                    <span>49</span>
                  </div>
                  <div className="stat-block">
                    <span>Followers</span>
                    <span>2.3K</span>
                  </div>
                </div>
              </div>
              <div className="user-menu">
                <div className="user-menu-inner has-slimscroll">
                  <div className="menu-block">
                    <ul>
                      <li className="is-active">
                        <a>
                          <i data-feather="smile" />
                          <span>Live Events</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <i data-feather="youtube" />
                          <span>Upcoming Events</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <i data-feather="cast" />
                          <span>Past Events</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="separator" />
                  <div className="menu-block">
                    <ul>
                      <li>
                        <a href="admin-profile-about.html">
                          <i data-feather="check-square" />
                          <span>About</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <i data-feather="copy" />
                          <span>Related Stores</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="separator" />
                  <div className="menu-block">
                    <ul>
                      <li>
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
          {/* Homepage content */}
          <div className="home-wrapper">
            <a className="mobile-sidebar-trigger is-home-v2">
              <i data-feather="menu" />
            </a>
            {/* Home content */}
            <div className="home-content">
              <div className="collections-header is-home-v2">
                <a className="is-active">Latest</a>
                <a>Subscribed</a>
                <a>Related</a>
                <div className="search-button">
                  <i data-feather="search" />
                </div>
              </div>
              <div className="collections-wrap is-active">
                <div className="collection">
                  <div className="header">
                    <h4>Shows &amp; Movies</h4>
                    <a>Show More</a>
                  </div>
                  <div className="video-collection">
                    {/* Episode */}
                    <a className="episode">
                      <div className="episode-thumbnail">
                        <div className="episode-overlay" />
                        <div className="episode-duration">01:39:43</div>
                        <div className="play-button">
                          <i data-feather="play-circle" />
                        </div>
                        <img
                          src="https://via.placeholder.com/320x200"
                          data-demo-src="assets/img/demo/video/home/collections/c17.jpg"
                          alt=""
                        />
                      </div>
                      <div className="episode-meta">
                        <img
                          src="https://via.placeholder.com/150x150"
                          data-demo-src="assets/img/icons/logos/metamovies.svg"
                          data-page-popover={2}
                          alt=""
                        />
                        <div className="info">
                          <span>The Old Caban</span>
                          <span>Meta Movies</span>
                        </div>
                      </div>
                    </a>
                    {/* Episode */}
                    <a className="episode">
                      <div className="episode-thumbnail">
                        <div className="episode-overlay" />
                        <div className="episode-duration">01:26:17</div>
                        <div className="play-button">
                          <i data-feather="play-circle" />
                        </div>
                        <img
                          src="https://via.placeholder.com/320x200"
                          data-demo-src="assets/img/demo/video/home/collections/c18.jpg"
                          alt=""
                        />
                      </div>
                      <div className="episode-meta">
                        <img
                          src="https://via.placeholder.com/150x150"
                          data-demo-src="assets/img/icons/logos/metamovies.svg"
                          data-page-popover={2}
                          alt=""
                        />
                        <div className="info">
                          <span>Eaten Alive</span>
                          <span>Meta Movies</span>
                        </div>
                      </div>
                    </a>
                    {/* Episode */}
                    <a className="episode">
                      <div className="episode-thumbnail">
                        <div className="episode-overlay" />
                        <div className="episode-duration">02:31:54</div>
                        <div className="play-button">
                          <i data-feather="play-circle" />
                        </div>
                        <img
                          src="https://via.placeholder.com/320x200"
                          data-demo-src="assets/img/demo/video/home/collections/c19.jpg"
                          alt=""
                        />
                      </div>
                      <div className="episode-meta">
                        <img
                          src="https://via.placeholder.com/150x150"
                          data-demo-src="assets/img/icons/logos/metamovies.svg"
                          data-page-popover={2}
                          alt=""
                        />
                        <div className="info">
                          <span>Forgotten</span>
                          <span>Meta Movies</span>
                        </div>
                      </div>
                    </a>
                    {/* Episode */}
                    <a className="episode">
                      <div className="episode-thumbnail">
                        <div className="episode-overlay" />
                        <div className="episode-duration">02:03:17</div>
                        <div className="play-button">
                          <i data-feather="play-circle" />
                        </div>
                        <img
                          src="https://via.placeholder.com/320x200"
                          data-demo-src="assets/img/demo/video/home/collections/c20.jpg"
                          alt=""
                        />
                      </div>
                      <div className="episode-meta">
                        <img
                          src="https://via.placeholder.com/150x150"
                          data-demo-src="assets/img/icons/logos/metamovies.svg"
                          data-page-popover={2}
                          alt=""
                        />
                        <div className="info">
                          <span>The Wastelands</span>
                          <span>Meta Movies</span>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                {/* Collection */}
                <div className="collection">
                  <div className="header">
                    <h4>Gaming</h4>
                    <a>Show More</a>
                  </div>
                  <div className="video-collection">
                    {/* Episode */}
                    <a className="episode">
                      <div className="episode-thumbnail">
                        <div className="episode-overlay" />
                        <div className="episode-duration">02:13:49</div>
                        <div className="play-button">
                          <i data-feather="play-circle" />
                        </div>
                        <img
                          src="https://via.placeholder.com/320x200"
                          data-demo-src="assets/img/demo/video/home/collections/c1.jpg"
                          alt=""
                        />
                      </div>
                      <div className="episode-meta">
                        <img
                          src="https://via.placeholder.com/150x150"
                          data-demo-src="assets/img/avatars/brian.jpg"
                          data-user-popover={19}
                          alt=""
                        />
                        <div className="info">
                          <span>The best keyboards for 2019!</span>
                          <span>Brian Stevenson</span>
                        </div>
                      </div>
                    </a>
                    {/* Episode */}
                    <a className="episode">
                      <div className="episode-thumbnail">
                        <div className="episode-overlay" />
                        <div className="episode-duration">00:26:17</div>
                        <div className="play-button">
                          <i data-feather="play-circle" />
                        </div>
                        <img
                          src="https://via.placeholder.com/320x200"
                          data-demo-src="assets/img/demo/video/home/collections/c2.jpg"
                          alt=""
                        />
                      </div>
                      <div className="episode-meta">
                        <img
                          src="https://via.placeholder.com/150x150"
                          data-demo-src="assets/img/avatars/dan.jpg"
                          data-user-popover={1}
                          alt=""
                        />
                        <div className="info">
                          <span>Exclusive limited unboxing</span>
                          <span>Dan Walker</span>
                        </div>
                      </div>
                    </a>
                    {/* Episode */}
                    <a className="episode">
                      <div className="episode-thumbnail">
                        <div className="episode-overlay" />
                        <div className="episode-duration">01:12:31</div>
                        <div className="play-button">
                          <i data-feather="play-circle" />
                        </div>
                        <img
                          src="https://via.placeholder.com/320x200"
                          data-demo-src="assets/img/demo/video/home/collections/c3.jpg"
                          alt=""
                        />
                      </div>
                      <div className="episode-meta">
                        <img
                          src="https://via.placeholder.com/150x150"
                          data-demo-src="assets/img/avatars/dan.jpg"
                          data-user-popover={1}
                          alt=""
                        />
                        <div className="info">
                          <span>I was at the VidCon 2019</span>
                          <span>Dan Walker</span>
                        </div>
                      </div>
                    </a>
                    {/* Episode */}
                    <a className="episode">
                      <div className="episode-thumbnail">
                        <div className="episode-overlay" />
                        <div className="episode-duration">00:12:06</div>
                        <div className="play-button">
                          <i data-feather="play-circle" />
                        </div>
                        <img
                          src="https://via.placeholder.com/320x200"
                          data-demo-src="assets/img/demo/video/home/collections/c4.jpg"
                          alt=""
                        />
                      </div>
                      <div className="episode-meta">
                        <img
                          src="https://via.placeholder.com/150x150"
                          data-demo-src="assets/img/avatars/david.jpg"
                          data-user-popover={5}
                          alt=""
                        />
                        <div className="info">
                          <span>Our plans for Alien Invasion</span>
                          <span>David Kim</span>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                {/* Load more posts */}
                <div className="load-more-wrap has-text-centered">
                  <a href="#" className="load-more-button">
                    Load More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
