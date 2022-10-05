import "./auth.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
	Avatar,
	Button,
	CssBaseline,
	Grid,
	Typography,
	Container,
	Paper,
	Stack,
	FormHelperText,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useLoginMutation } from "../../services/authSlice";
import Loading from "../../templates/loading/Loading";
import PasswordField from "../../templates/textFields/PasswordField";
import UserIdField from "../../templates/textFields/UserIdField";
import ErrorPage from "../errorPage/ErrorPage";

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
		} else if (responseInfo.isSuccess && responseInfo.data?.isError) {
			toast.error(responseInfo.data?.message);
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

	if (responseInfo.isError) return <ErrorPage message={responseInfo.error?.error} />;

	return (
		<Container component="div" maxWidth="xs" className="auth-base">
			{responseInfo.isLoading && <Loading />}
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
							<UserIdField
								responseInfo={responseInfo}
								data={loginData.userId}
								handleOnchange={handleOnchange}
							/>
							{responseInfo.data?.error?.userId && (
								<FormHelperText error id="userId-error-text">
									{responseInfo.data?.error?.userId}
								</FormHelperText>
							)}
						</Grid>
						<Grid item xs={12}>
							<PasswordField
								responseInfo={responseInfo}
								data={loginData}
								handleOnchange={handleOnchange}
							/>
							{responseInfo.data?.error?.password && (
								<FormHelperText error id="password-error-text">
									{responseInfo.data?.error?.password}
								</FormHelperText>
							)}
							{responseInfo.isSuccess && !responseInfo.data?.success && (
								<FormHelperText error>{responseInfo.data?.message}</FormHelperText>
							)}
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
