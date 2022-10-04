import "./auth.css";
import { useState, useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../services/authSlice";
import { toast } from "react-toastify";

const defaultValue = { primaryName: "", userId: "", password: "" };

const Signup = () => {
	document.title = "Student Management | Signup";

	const [signup, responseInfo] = useSignupMutation();
	const [signupData, setSignupData] = useState(defaultValue);
	const navigate = useNavigate();

	useEffect(() => {
		if (responseInfo.isSuccess) {
			setSignupData(defaultValue);
			toast.success(responseInfo.data?.message);
			navigate("/login");
		} else if (responseInfo.isError) {
			toast.error("Something went wrong!");
		}
	}, [responseInfo, navigate]);

	const handleSignupSubmit = async (e) => {
		e.preventDefault();
		await signup(signupData);
	};

	const handleOnchange = (e) => {
		setSignupData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	if (responseInfo.isLoading) return <div>Loading....</div>;
	if (responseInfo.isError) return <h1>An error occurred {responseInfo.error.error}</h1>;

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
								name="primaryName"
								autoComplete="primaryName"
								onChange={handleOnchange}
								value={signupData.primaryName}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="userId"
								label="Student or Employee id"
								name="userId"
								autoComplete="userId"
								onChange={handleOnchange}
								value={signupData.userId}
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
								onChange={handleOnchange}
								value={signupData.password}
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
