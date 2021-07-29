import React from "react";
import MobileNavBar from "./MobileNavBar";
import DesktopNavBar from "./DesktopNavBar";

export default function NavBar() {
	return (
		<div>
			<DesktopNavBar />
			<MobileNavBar />
		</div>
	);
}
