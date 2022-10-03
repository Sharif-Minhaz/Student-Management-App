import "./footer.css";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer = () => (
	<AppBar className="footer-section" position="static" elevation={0} component="footer" color="default">
		<Toolbar style={{ justifyContent: "center" }}>
			<Typography variant="caption" fontSize={14} textAlign="center">
				@ 2021-2022{" "}
				<a target="_blank" rel="noreferrer" href="https://github.com/MERN-Coders">
					MERN-Coders
				</a>{" "}
				| All Rights Reserved
			</Typography>
		</Toolbar>
	</AppBar>
);

export default Footer;
