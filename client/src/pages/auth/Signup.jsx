import "./auth.css";
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Grid,
	Typography,
	Container,
	Paper,
	Stack,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Signup = () => {
	document.title = "Student Management | Signup";

	const handleSignupSubmit = () => {};

	return (
		<Container component="div" maxWidth="xs" className="auth-base">
			<CssBaseline />
			<Paper sx={{ p: 3 }}>
				<Stack direction="row" sx={{ alignItems: "center", mb: 2 }}>
					<Avatar>
						<LockOutlined />
					</Avatar>
					<Typography component="h1" variant="h5" sx={{ ml: 2 }}>
						Sign Up
					</Typography>
				</Stack>
				<form onSubmit={handleSignupSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="primaryName"
								label="Username"
								name="text"
								autoComplete="primaryName"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="userId"
								label="Student or Employee id"
								name="text"
								autoComplete="userId"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
						</Grid>
						<Grid item sx={{ mb: 2 }}>
							<Typography component="small" fontSize={14}>
								Already have an account? <Link to="/login">Login</Link>
							</Typography>
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" color="primary">
						Sign Up
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default Signup;
