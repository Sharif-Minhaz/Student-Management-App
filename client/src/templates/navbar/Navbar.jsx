import "./navbar.css";
import brandImage from "../../assets/images/brand.png";
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Avatar } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useIsLoggedInQuery, useLogoutMutation } from "../../services/authSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Navbar = ({ setOpenDrawer }) => {
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
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={() => setOpenDrawer(true)}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, userSelect: "none" }}
					>
						<NavLink className="brand" to="/">
							<img src={brandImage} alt="brand" />
						</NavLink>
					</Typography>
					{responseInfo.isSuccess && responseInfo.data?.success ? (
						<>
							<Button onClick={handleLogout} color="inherit">
								Logout
							</Button>
							<Avatar />
							<Typography ml={1} color="inherit">
								{responseInfo.isSuccess && responseInfo.data?.user?.primaryName}
							</Typography>
						</>
					) : (
						<Button onClick={() => navigate("/login")} color="inherit">
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
