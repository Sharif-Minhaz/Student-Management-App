import { useEffect } from "react";
import {
	Box,
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListItemButton,
} from "@mui/material";
import SingleListItem from "./SingleListItem";
import {
	Task,
	Flag,
	Home,
	Login,
	VpnKey,
	HowToReg,
	Dashboard,
	AutoStories,
	AccountCircle,
	AppRegistration,
	SupervisedUserCircle,
} from "@mui/icons-material";
import { useIsLoggedInQuery, useLogoutMutation } from "../../services/apiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Lists = ({ setOpenDrawer }) => {
	const navigate = useNavigate();
	const responseInfo = useIsLoggedInQuery();
	const [logout, responseInfoLogout] = useLogoutMutation();

	useEffect(() => {
		if (responseInfoLogout.isSuccess && responseInfoLogout.data?.success) {
			toast.success("Successfully Logout");
			navigate("/login");
		} else if (responseInfoLogout.isSuccess && !responseInfoLogout.data?.success) {
			toast.error("Something went wrong");
		}
	}, [responseInfoLogout]);

	const handleLogout = async () => {
		await logout();
	};
	return (
		<Box sx={{ width: 250 }} role="presentation">
			<List>
				<SingleListItem
					setOpenDrawer={setOpenDrawer}
					text="Home"
					icon={<Home />}
					path="/"
				/>
				{responseInfo.data?.success && responseInfo.data?.user && (
					<SingleListItem
						setOpenDrawer={setOpenDrawer}
						text="Dashboard"
						icon={<Dashboard />}
						path="/dashboard"
					/>
				)}
				{responseInfo.data?.success && responseInfo.data?.user && (
					<SingleListItem
						setOpenDrawer={setOpenDrawer}
						text="Profile"
						icon={<AccountCircle />}
						path="/profile/view"
					/>
				)}
				{responseInfo.data?.success && responseInfo.data?.user?.role === "student" && (
					<SingleListItem
						setOpenDrawer={setOpenDrawer}
						text="Advising"
						icon={<SupervisedUserCircle />}
						path="/advising"
					/>
				)}
				<SingleListItem
					setOpenDrawer={setOpenDrawer}
					text="Available Courses"
					icon={<AutoStories />}
					path="/available-courses"
				/>
				{responseInfo.data?.success && responseInfo.data?.user?.role === "student" && (
					<SingleListItem
						setOpenDrawer={setOpenDrawer}
						text="Live Result"
						icon={<Task />}
						path="/live-result"
					/>
				)}
				{responseInfo.data?.success && responseInfo.data?.user?.role === "student" && (
					<SingleListItem
						setOpenDrawer={setOpenDrawer}
						text="Registered Courses"
						icon={<AppRegistration />}
						path="/registered-courses"
					/>
				)}
				{responseInfo.data?.success && responseInfo.data?.user?.role === "teacher" && (
					<SingleListItem
						setOpenDrawer={setOpenDrawer}
						text="Registered Students"
						icon={<HowToReg />}
						path="/registered-students"
					/>
				)}
				<SingleListItem
					setOpenDrawer={setOpenDrawer}
					text="Result"
					icon={<Task />}
					path="/result"
				/>
			</List>
			<Divider />
			<List>
				{!responseInfo.data?.success && !responseInfo.data?.user && (
					<SingleListItem
						setOpenDrawer={setOpenDrawer}
						text="Login"
						icon={<Login />}
						path="/login"
					/>
				)}
				{responseInfo.data?.success && responseInfo.data?.user && (
					<SingleListItem
						setOpenDrawer={setOpenDrawer}
						text="Change Password"
						icon={<VpnKey />}
						path="/password/change"
					/>
				)}
				<SingleListItem
					setOpenDrawer={setOpenDrawer}
					text="Report"
					icon={<Flag />}
					path="/report"
				/>
				{responseInfo.data?.success && responseInfo.data?.user && (
					<ListItem
						disablePadding
						onClick={() => {
							setOpenDrawer(false);
							handleLogout();
						}}
					>
						<ListItemButton>
							<ListItemIcon>
								<VpnKey />
							</ListItemIcon>
							<ListItemText primary="Logout" />
						</ListItemButton>
					</ListItem>
				)}
			</List>
		</Box>
	);
};

export default Lists;
