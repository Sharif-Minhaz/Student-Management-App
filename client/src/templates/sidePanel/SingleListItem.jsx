import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

const SingleListItem = ({ text, icon, path, setOpenDrawer }) => {
	return (
		<NavLink
			onClick={() => setOpenDrawer(false)}
			className="single-list-item"
			to={path}
			end
		>
			<ListItem disablePadding>
				<ListItemButton>
					<ListItemIcon>{icon}</ListItemIcon>
					<ListItemText primary={text} />
				</ListItemButton>
			</ListItem>
		</NavLink>
	);
};

export default SingleListItem;
