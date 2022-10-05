import "./navbar.css";
import brandImage from "../../assets/images/brand.png";
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ setOpenDrawer }) => {
	const navigate = useNavigate();
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
					<Button onClick={() => navigate("/login")} color="inherit">
						Login
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
