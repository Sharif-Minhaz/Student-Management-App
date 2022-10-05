import {Container, Box, Button, Divider, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./errorPage.css";

const NotFound404 = () => {
	document.title = "Student Management | Not Found";
	const navigate = useNavigate();
	return (
		<Container>
			<Paper sx={{ p: 2, position: "relative", top: 20, boxShadow: 2 }}>
				<Typography variant="h2" gutterBottom>
					Page not found :(
				</Typography>
				<Typography variant="body1" mb={1} gutterBottom>
					Maybe the page you are looking for has been removed, or you typed in the wrong
					URL
				</Typography>
				<Divider />
				<Box mt={1}>
					<Button onClick={() => navigate(-1)}>go back</Button>
					<Link to="/">
						<Button>go to homepage</Button>
					</Link>
					<Button href="mailto:minhazrabbi93041@gmail.com?subject=Report a problem">
						report us
					</Button>
				</Box>
			</Paper>
		</Container>
	);
};

export default NotFound404;
