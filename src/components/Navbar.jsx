import React from "react";
import ModalAyuda from "./ModalAyuda/ModalAyuda";
import DrawerNavBar from "./DrawerNavBar/DrawerNavBar";

const Navbar = () => {
	return (
		<nav className="navbar bg-base-100">
			<div className="navbar-start">
                <DrawerNavBar />
				<a className="text-inherit cursor-pointer normal-case text-xl font-bold select-none transition">Kanbanero</a>
			</div>
			<div className="navbar-end">
				<ModalAyuda />
			</div>
		</nav>
	);
};

export default Navbar;
