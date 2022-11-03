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
	FormHelperText,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../services/apiSlice";
import Loading from "../../templates/loading/Loading";
import { toast } from "react-toastify";
import UserIdField from "../../templates/textFields/UserIdField";
import PasswordField from "../../templates/textFields/PasswordField";
import ErrorPage from "../errorPage/ErrorPage";

const defaultValue = { primaryName: "", userId: "", password: "" };

const Signup = () => {
	document.title = "Student Management | Signup";

	const [signup, responseInfo] = useSignupMutation();
	const [signupData, setSignupData] = useState(defaultValue);
	const navigate = useNavigate();

	useEffect(() => {
		if (responseInfo.isSuccess && responseInfo.data?.success) {
			setSignupData(defaultValue);
			toast.success(responseInfo.data?.message);
			navigate("/login");
		} else if (responseInfo.isSuccess && responseInfo.data?.duplication) {
			toast.error(responseInfo.data?.message);
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
						Sign Up
					</Typography>
				</Stack>
				<form onSubmit={handleSignupSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								error={
									Boolean(responseInfo.data?.error?.primaryName) ||
									responseInfo.data?.isError
								}
								variant="outlined"
								fullWidth
								id="primaryName"
								label="Username"
								name="primaryName"
								autoComplete="primaryName"
								onChange={handleOnchange}
								value={signupData.primaryName}
								disabled={responseInfo.isLoading}
							/>
							{responseInfo.data?.error?.primaryName && (
								<FormHelperText error id="primaryName-error-text">
									{responseInfo.data?.error?.primaryName}
								</FormHelperText>
							)}
						</Grid>
						<Grid item xs={12}>
							<UserIdField
								responseInfo={responseInfo}
								data={signupData.userId}
								handleOnchange={handleOnchange}
							/>
							{responseInfo.data?.error?.userId && (
								<FormHelperText error id="userId-error-text">
									{responseInfo.data?.error?.userId}
								</FormHelperText>
							)}
							{responseInfo.data?.duplication && (
								<FormHelperText error id="userId-error-text">
									{responseInfo.data?.message}
								</FormHelperText>
							)}
						</Grid>
						<Grid item xs={12}>
							<PasswordField
								responseInfo={responseInfo}
								data={signupData}
								handleOnchange={handleOnchange}
							/>
							{responseInfo.data?.error?.password && (
								<FormHelperText error id="password-error-text">
									{responseInfo.data?.error?.password}
								</FormHelperText>
							)}
						</Grid>
						<Grid item sx={{ mb: 2 }}>
							<Typography component="small" fontSize={14}>
								Already have an account? <Link to="/login">Login</Link>
							</Typography>
						</Grid>
					</Grid>
					<Button
						disabled={responseInfo.isLoading}
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
					>
						Sign Up
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default Signup;
