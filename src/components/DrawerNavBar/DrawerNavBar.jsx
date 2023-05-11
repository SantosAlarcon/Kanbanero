import React, { useState } from "react";
import { Button } from "react-daisyui";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import "../../styles/Drawer.css";
import { bottom } from "./DrawerArgs";
import IconoMovil from "../IconoMovil";

const DrawerNavBar = () => {
	const [visible, setVisible] = useState(false);
	const toggleDrawer = () => setVisible(!visible);

	return (
		<>
			<Button className="px-4 shadow-md" color="ghost" onClick={toggleDrawer}>
				<IconoMovil />
			</Button>
			<Drawer className="drawer" open={visible} onClose={toggleDrawer} direction="left" duration={250}>
                <div className="drawer-upper">
                    Esta es la parte superior del drawer.
                </div>
                <div className="drawer-bottom">
                    {bottom}
                </div>
            </Drawer>
		</>
	);
};

export default DrawerNavBar;
