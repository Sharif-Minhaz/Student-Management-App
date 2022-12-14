import { Container, Box, Button, Divider, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./errorPage.css";

const ErrorPage = ({ message }) => {
	document.title = "Student Management | Error";
	const navigate = useNavigate();
	return (
		<Container>
			<Paper sx={{ p: 2, position: "relative", top: 20, boxShadow: 2 }}>
				<Typography variant="h2" gutterBottom>
					{message || "Something Went Wrong"} :(
				</Typography>
				<Typography variant="body1" mb={1} gutterBottom>
					Network error or maybe our server messed up. Check your internet connection or
					reload the page
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

export default ErrorPage;
