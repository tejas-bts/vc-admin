import React, { useState } from "react";
import Explorer from "../Explorer/Explorer";
import NotificationDrop from "../Notifications/NotificationDrop";
import NavDrop from "../NavDrop/NavDrop";
import { FiBell } from "react-icons/fi";
import { IoAppsSharp } from "react-icons/io5";
import logo from  './vclogo.png';

function DesktopNavBar() {
	const [showNotification, setShowNotification] = useState(false);
	const [showExplorer, setShowExplorer] = useState(false);
	const [showNavDrop, setShowNavDrop] = useState(false);

	
	const toggleExplorer = () => {
		setShowExplorer(!showExplorer);
	};
	const toggleNotification = () => {
		setShowNotification(!showNotification);
	};
	const toggleNavDrop = () => {
		setShowNavDrop(!showNavDrop);
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
							src={logo}
							width={112}
							height={28}
							alt=""
						/>
						<img
							className="logo dark-image"
							src={logo}
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
								<FiBell />
								<span className="indicator" />
							</a>
							<NotificationDrop isActive={showNotification} />
						</div>
						<div className="navbar-item is-icon">
							<a className="icon-link is-primary" onClick={toggleExplorer}>
								<IoAppsSharp />
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
							className="navbar-item is-account drop-trigger has-caret"
							onClick={toggleNavDrop}
							>
							<div className="user-image">
								<img
									src="https://via.placeholder.com/400x400"
									data-demo-src="assets/img/avatars/jenna.png"
									alt=""
								/>
								<span className="indicator" />
							</div>
							<NavDrop isActive={showNavDrop}/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DesktopNavBar;
