import { Box, List, Divider } from "@mui/material";
import SingleListItem from "./SingleListItem";
import {
	Home,
	Dashboard,
	SupervisedUserCircle,
	AutoStories,
	Task,
	AccountCircle,
	HowToReg,
	Login,
	AppRegistration,
	VpnKey,
	Flag,
} from "@mui/icons-material";

const Lists = ({ setOpenDrawer }) => {
	return (
		<Box sx={{ width: 250 }} role="presentation">
			<List>
				<SingleListItem
					setOpenDrawer={setOpenDrawer}
					text="Home"
					icon={<Home />}
					path="/"
				/>
				<SingleListItem
					setOpenDrawer={setOpenDrawer}
					text="Dashboard"
					icon={<Dashboard />}
					path="/dashboard"
				/>
				<SingleListItem
					setOpenDrawer={setOpenDrawer}
					text="Advising"
					icon={<SupervisedUserCircle />}
					path="/advising"
				/>
				<SingleListItem
					setOpenDrawer={setOpenDrawer}
					text="Available Course"
					icon={<AutoStories />}
					path="/available-course"
				/>
				<SingleListItem
					setOpenDrawer={setOpenDrawer}
					text="Live Result"
					icon={<Task />}
					path="/live-result"
				/>
				<SingleListItem
					setOpenDrawer={setOpenDrawer}
					text="Profile"
					icon={<AccountCircle />}
					path="/profile/view"
				/>
				<SingleListItem
					setOpenDrawer={setOpenDrawer}
					text="Registered Course"
					icon={<AppRegistration />}
					path="/registered-course"
				/>
				<SingleListItem
					setOpenDrawer={setOpenDrawer}
					text="Registered Student"
					icon={<HowToReg />}
					path="/registered-student"
				/>
				<SingleListItem
					setOpenDrawer={setOpenDrawer}
					text="Result"
					icon={<Task />}
					path="/result"
				/>
			</List>
			<Divider />
			<List>
				<SingleListItem
					setOpenDrawer={setOpenDrawer}
					text="Login"
					icon={<Login />}
					path="/login"
				/>
				<SingleListItem
					setOpenDrawer={setOpenDrawer}
					text="Change Password"
					icon={<VpnKey />}
					path="/password/change"
				/>
				<SingleListItem
					setOpenDrawer={setOpenDrawer}
					text="Report"
					icon={<Flag />}
					path="/report"
				/>
			</List>
		</Box>
	);
};

export default Lists;
