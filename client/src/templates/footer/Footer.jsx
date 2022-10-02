import "./footer.css";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer = () => (
	<AppBar position="static" elevation={0} component="footer" color="default">
		<Toolbar style={{ justifyContent: "center" }}>
			<Typography variant="caption" fontSize={14}>
				@ 2021-2022{" "}
				<a target="_blank" rel="noreferrer" href="https://github.com/MERN-Coders">
					MERN-Coder
				</a>{" "}
				| All Rights Reserved
			</Typography>
		</Toolbar>
	</AppBar>
);

export default Footer;
