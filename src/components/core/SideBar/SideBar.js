import React from "react";
import { FiMonitor, FiCalendar, FiLayout, FiArchive, FiCheck, FiSettings, FiUsers, FiBarChart2,FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function SideBar() {
	return (
		<div className="view-wrapper is-full">
			<div className="videos-wrapper has-player">
				<div className="videos-sidebar is-active">
					<div className="videos-sidebar-inner">
						<div className="user-block">
							<a className="close-videos-sidebar">
								<FiX />
							</a>
							<div className="avatar-wrap">
								<img src="https://via.placeholder.com/150x150" data-demo-src="assets/img/avatars/jenna.png" data-user-popover={0} alt="" />
								<div className="badge">
									<FiCheck />
								</div>
							</div>
							<h4>Jenna Davis</h4>
							<p>Melbourne, AU</p>
							<div className="user-stats">
								<div className="stat-block">
									<span>Events</span>
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
											<Link to="/template">
												<FiLayout />
												<span>Dashboard</span>
											</Link>
										</li>
										<li>
											<a>
												<FiArchive />
												<span>Manage Departments</span>
											</a>
										</li>
										<li>
											<a>
												<FiCalendar />
												<span>Manage Events</span>
											</a>
										</li>
										<li>
											<a>
												<FiMonitor />
												<span>Manage Inventory</span>
											</a>
										</li>
										<li>
											<a>
												<FiBarChart2 />
												<span>Analytics</span>
											</a>
										</li>
										<li>
											<a>
												<FiUsers />
												<span>Manage Relations</span>
											</a>
										</li>
									</ul>
								</div>
								<div className="separator" />
								<div className="menu-block">
									<ul>
										<li>
											<a>
												<FiSettings />
												<span>Settings</span>
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