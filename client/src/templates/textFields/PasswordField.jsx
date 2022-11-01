import { useState } from "react";
import { InputAdornment, IconButton, OutlinedInput, FormControl, InputLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordField = ({ responseInfo, data, handleOnchange, name = "password" }) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	const handleMouseDownPassword = (e) => {
		e.preventDefault();
	};

	return (
		<FormControl variant="outlined" fullWidth>
			<InputLabel htmlFor="password">Password</InputLabel>
			<OutlinedInput
				error={
					Boolean(
						responseInfo.data?.error?.password ||
							responseInfo.data?.error?.newPassword ||
							responseInfo.data?.error?.confirmPassword
					) || responseInfo.data?.isError
				}
				id="password"
				type={showPassword ? "text" : "password"}
				value={data.password}
				onChange={handleOnchange}
				name={name}
				label="Password"
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				disabled={responseInfo.isLoading}
				aria-describedby="password-error-text"
			/>
		</FormControl>
	);
};

export default PasswordField;
