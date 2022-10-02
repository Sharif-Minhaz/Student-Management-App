import "./sidePanel.css";
import { Drawer } from "@mui/material";
import Lists from "./Lists";

const SidePanel = ({ openDrawer, setOpenDrawer }) => {
	return (
		<div>
			<Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
				<Lists setOpenDrawer={setOpenDrawer} />
			</Drawer>
		</div>
	);
};

export default SidePanel;
