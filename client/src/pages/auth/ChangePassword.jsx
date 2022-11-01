import "./auth.css";
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
	Link,
} from "@mui/material";
import Loading from "../../templates/loading/Loading";
import { LockOutlined, NavigateNext } from "@mui/icons-material";
import {
	useChangePasswordMutation,
	useCheckPasswordMutation,
	useLogoutMutation,
} from "../../services/apiSlice";
import PasswordField from "../../templates/textFields/PasswordField";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
	document.title = "Student Management | Change Password";
	const navigate = useNavigate();

	const [checkPassword, responseInfo] = useCheckPasswordMutation();
	const [changePassword, responseChangeInfo] = useChangePasswordMutation();
	const [logout, responseInfoLogout] = useLogoutMutation();

	const [isAbleToNext, setIsAbleToNext] = useState(false);
	const [password, setPassword] = useState({ password: "" });
	const [newPassword, setNewPassword] = useState({ password: "" });
	const [confirmPassword, setConfirmPassword] = useState({ password: "" });

	useEffect(() => {
		if (responseInfoLogout.isSuccess && responseInfoLogout.data?.success) {
			navigate("/login");
		} else if (responseInfoLogout.isSuccess && !responseInfoLogout.data?.success) {
			toast.error("Something went wrong");
		}
	}, [responseInfoLogout]);

	const handleSubmit = (e) => {
		e.preventDefault();
		checkPassword(password);
	};

	const handleChangePasswordSubmit = (e) => {
		e.preventDefault();
		changePassword([newPassword, confirmPassword]);
	};

	const handleOnchange = (e) => {
		if (e.target.name === "password") {
			setPassword({ password: e.target.value });
		} else if (e.target.name === "newPassword") {
			setNewPassword({ password: e.target.value });
		} else if (e.target.name === "confirmPassword") {
			setConfirmPassword({ password: e.target.value });
		}
	};

	useEffect(() => {
		responseInfo.data?.success ? setIsAbleToNext(true) : setIsAbleToNext(false);
	}, [responseInfo]);

	useEffect(() => {
		if (responseChangeInfo.isSuccess & !responseChangeInfo.data?.isError) {
			toast.success(responseChangeInfo.data?.message);
			async function doLogout() {
				await logout();
			}
			doLogout();
		} else if (responseChangeInfo.isSuccess & responseChangeInfo.data?.isError) {
			toast.error(responseChangeInfo.data?.message);
		}
	}, [responseChangeInfo]);

	return (
		<Container component="div" maxWidth="xs" className="auth-base">
			{isAbleToNext ? (
				<>
					{responseInfo.isLoading && <Loading />}
					<CssBaseline />
					<Paper sx={{ p: 3 }} elevation={3}>
						<Stack direction="row" sx={{ alignItems: "center", mb: 2 }}>
							<Avatar>
								<LockOutlined />
							</Avatar>
							<Typography component="h1" variant="h5" sx={{ ml: 2 }}>
								Change Password
							</Typography>
						</Stack>
						<form onSubmit={handleChangePasswordSubmit}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Typography mb={1}>Provide new password:</Typography>
									<PasswordField
										name="newPassword"
										responseInfo={responseChangeInfo}
										data={newPassword}
										handleOnchange={handleOnchange}
									/>
									{responseChangeInfo.data?.error?.newPassword && (
										<FormHelperText error id="password-error-new">
											{responseChangeInfo.data?.error?.newPassword}
										</FormHelperText>
									)}
								</Grid>
								<Grid item xs={12} sx={{ mb: 2 }}>
									<Typography mb={1}>Confirm new password:</Typography>
									<PasswordField
										name="confirmPassword"
										responseInfo={responseChangeInfo}
										data={confirmPassword}
										handleOnchange={handleOnchange}
									/>
									{responseChangeInfo.data?.error?.confirmPassword && (
										<FormHelperText error id="password-error-confirm">
											{responseChangeInfo.data?.error?.confirmPassword}
										</FormHelperText>
									)}
									{responseChangeInfo.data?.isError && (
										<FormHelperText error id="password-error-confirm-error">
											{responseChangeInfo.data?.message}
										</FormHelperText>
									)}
								</Grid>
							</Grid>
							<Button type="submit" fullWidth variant="contained" color="primary">
								Change Password
							</Button>
						</form>
					</Paper>
				</>
			) : (
				<>
					{responseInfo.isLoading && <Loading />}
					<CssBaseline />
					<Paper sx={{ p: 3 }} elevation={3}>
						<Stack direction="row" sx={{ alignItems: "center", mb: 2 }}>
							<Avatar>
								<LockOutlined />
							</Avatar>
							<Typography component="h1" variant="h5" sx={{ ml: 2 }}>
								Change Password
							</Typography>
						</Stack>
						<form onSubmit={handleSubmit}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Typography mb={2}>Provide old password:</Typography>
									<PasswordField
										name="password"
										responseInfo={responseInfo}
										data={password}
										handleOnchange={handleOnchange}
									/>
									{responseInfo.data?.error?.password && (
										<FormHelperText error id="password-error-text">
											{responseInfo.data?.error?.password}
										</FormHelperText>
									)}
									{!responseInfo.data?.success && (
										<FormHelperText error id="password-error-invalid">
											{responseInfo.data?.message}
										</FormHelperText>
									)}
								</Grid>
								<Grid item sx={{ mb: 2 }}>
									<Typography component="small" fontSize={14}>
										Forgot password?{" "}
										<Link
											href="mailto: faculty@diu.edu.bd?subject=Changing password issue"
											underline="hover"
										>
											Contact faculty
										</Link>
									</Typography>
								</Grid>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								endIcon={<NavigateNext />}
							>
								Next
							</Button>
						</form>
					</Paper>
				</>
			)}
		</Container>
	);
};

export default ChangePassword;
