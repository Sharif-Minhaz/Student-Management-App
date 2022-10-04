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
import { useLoginMutation } from "../../services/authSlice";
import { toast } from "react-toastify";

const defaultValue = { userId: "", password: "" };

const Login = () => {
	document.title = "Student Management | Login";
	const [login, responseInfo] = useLoginMutation();
	const [loginData, setLoginData] = useState(defaultValue);
	const navigate = useNavigate();

	useEffect(() => {
		if (responseInfo.isSuccess && responseInfo.data?.success) {
			setLoginData(defaultValue);
			toast.success(responseInfo.data?.message);
			navigate("/dashboard");
		} else if (responseInfo.isError) {
			toast.error("Something went wrong!");
		}
	}, [responseInfo, navigate]);

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		await login(loginData);
	};

	const handleOnchange = (e) => {
		setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
						Log in
					</Typography>
				</Stack>
				<form onSubmit={handleLoginSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="userId"
								label="Student or Employee id"
								name="userId"
								autoComplete="userId"
								value={loginData.userId}
								onChange={handleOnchange}
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
								value={loginData.password}
								onChange={handleOnchange}
							/>
						</Grid>
						<Grid item sx={{ mb: 2 }}>
							<Typography component="small" fontSize={14}>
								Don't have any account? <Link to="/signup">Signup</Link>
							</Typography>
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" color="primary">
						Login
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default Login;
