import {
	Avatar,
	Box,
	Button,
	Divider,
	FormHelperText,
	InputAdornment,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import {
	AccountBox,
	AddCircleOutline,
	Clear,
	CloudUpload,
	PlaylistAddCheckCircle,
} from "@mui/icons-material";
import { useIsLoggedInQuery } from "../../services/apiSlice";
import Loading from "../../templates/loading/Loading";

const ProfileInputBoxes = ({
	profileResInfo,
	profileData,
	handleOnChange,
	handleSubmit,
	cancelProfilePic,
	handleClearProfilePic,
	imgKey,
	editingMode = false,
}) => {
	const responseInfo = useIsLoggedInQuery();

	return (
		<Box sx={{ m: 3, mt: "88px" }}>
			{profileResInfo.isLoading && <Loading />}
			<Paper sx={{ maxWidth: "500px", m: "auto", p: 3 }} elevation={2}>
				<form onSubmit={handleSubmit}>
					<Stack direction="row" gap={2} alignItems="center" mb={2}>
						<Avatar>
							<AccountBox />
						</Avatar>
						<Typography variant="h5">
							{editingMode ? "Update Profile" : "Create Profile"}
						</Typography>
					</Stack>
					<Divider />
					<Box mt={1}>
						<Stack gap={1}>
							<Typography variant="body1">Current profile picture</Typography>
							<Avatar
								variant="rounded"
								sx={{
									width: "160px",
									height: "160px",
									boxShadow:
										"0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
								}}
							>
								<img
									style={{
										width: "100%",
										height: "100%",
										objectFit: "cover",
									}}
									src={profileData?.profilePicture}
									alt="current_profile_pic"
								/>
							</Avatar>
						</Stack>
					</Box>
					<Box my={2} mt={3}>
						<TextField
							key={imgKey}
							fullWidth
							focused
							inputProps={{
								accept: "image/*",
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										{cancelProfilePic ? (
											<Clear
												sx={{ cursor: "pointer" }}
												onClick={handleClearProfilePic}
											/>
										) : (
											<CloudUpload />
										)}
									</InputAdornment>
								),
							}}
							type="file"
							label="Upload Profile Picture"
							name="profilePicture"
							onChange={handleOnChange}
							disabled={profileResInfo.isLoading}
						/>
					</Box>
					<Box my={2}>
						<TextField
							fullWidth
							label="Full name"
							name="fullName"
							onChange={handleOnChange}
							value={profileData?.fullName}
							disabled={profileResInfo.isLoading}
							error={Boolean(profileResInfo.data?.error?.fullName)}
						/>
						{profileResInfo.data?.error?.fullName && (
							<FormHelperText error id="userId-error-text">
								{profileResInfo.data?.error?.fullName}
							</FormHelperText>
						)}
					</Box>
					<Box my={2}>
						<TextField
							type="email"
							fullWidth
							label="Email address"
							name="email"
							onChange={handleOnChange}
							value={profileData?.email}
							disabled={profileResInfo.isLoading}
							error={Boolean(profileResInfo.data?.error?.email)}
						/>
						{profileResInfo.data?.error?.email && (
							<FormHelperText error id="userId-error-email">
								{profileResInfo.data?.error?.email}
							</FormHelperText>
						)}
					</Box>
					<Box my={2}>
						<TextField
							fullWidth
							label="Mobile Number"
							type="tel"
							name="mobile"
							onChange={handleOnChange}
							value={profileData?.mobile}
							disabled={profileResInfo.isLoading}
						/>
					</Box>
					<Box my={2}>
						<TextField
							disabled
							fullWidth
							label="Student or Employee Id"
							value={profileData?.userId}
							name="userId"
						/>
					</Box>
					<Box my={2}>
						<TextField
							fullWidth
							label="Present Address"
							name="presentAddress"
							onChange={handleOnChange}
							value={profileData?.presentAddress}
							disabled={profileResInfo.isLoading}
						/>
					</Box>
					<Box my={2}>
						<TextField
							fullWidth
							label="Permanent Address"
							name="permanentAddress"
							onChange={handleOnChange}
							value={profileData?.permanentAddress}
							disabled={profileResInfo.isLoading}
						/>
					</Box>
					{responseInfo.data?.user?.role === "student" && (
						<>
							<Box my={2}>
								<TextField
									fullWidth
									label="Local guardian name"
									name="localGuardianName"
									onChange={handleOnChange}
									value={profileData?.localGuardianName}
									disabled={profileResInfo.isLoading}
								/>
							</Box>
							<Box my={2}>
								<TextField
									fullWidth
									type="email"
									label="Local guardian email address"
									name="localGuardianEmail"
									onChange={handleOnChange}
									value={profileData?.localGuardianEmail}
									disabled={profileResInfo.isLoading}
								/>
							</Box>
							<Box my={2}>
								<TextField
									fullWidth
									type="tel"
									label="Local guardian mobile number"
									name="localGuardianMobile"
									onChange={handleOnChange}
									value={profileData?.localGuardianMobile}
									disabled={profileResInfo.isLoading}
								/>
							</Box>
						</>
					)}
					{editingMode ? (
						<Button
							color="success"
							type="submit"
							variant="contained"
							endIcon={<PlaylistAddCheckCircle />}
						>
							Update
						</Button>
					) : (
						<Button type="submit" variant="contained" endIcon={<AddCircleOutline />}>
							Create
						</Button>
					)}
				</form>
			</Paper>
		</Box>
	);
};

export default ProfileInputBoxes;
