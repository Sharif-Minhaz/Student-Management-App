import {
	Avatar,
	Box,
	Button,
	Divider,
	InputAdornment,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { AccountBox, AddCircleOutline, Clear, CloudUpload } from "@mui/icons-material";
import { useIsLoggedInQuery } from "../../services/apiSlice";

const ProfileInputBoxes = ({
	profileData,
	handleOnChange,
	handleSubmit,
	cancelProfilePic,
	handleClearProfilePic,
	imgKey,
}) => {
	const responseInfo = useIsLoggedInQuery();

	return (
		<Box sx={{ m: 3, mt: "88px" }}>
			<Paper sx={{ maxWidth: "500px", m: "auto", p: 3 }} elevation={2}>
				<form onSubmit={handleSubmit}>
					<Stack direction="row" gap={2} alignItems="center" mb={2}>
						<Avatar>
							<AccountBox />
						</Avatar>
						<Typography variant="h5">Create Profile</Typography>
					</Stack>
					<Divider />
					<Box mt={1}>
						<Stack gap={1}>
							<Typography variant="body1">Current profile picture</Typography>
							<Avatar variant="rounded" sx={{ width: "160px", height: "160px" }}>
								<img
									style={{ width: "100%" }}
									src={profileData.profilePicture}
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
						/>
					</Box>
					<Box my={2}>
						<TextField
							fullWidth
							label="Full name"
							required
							name="fullName"
							onChange={handleOnChange}
							value={profileData.fullName}
						/>
					</Box>
					<Box my={2}>
						<TextField
							type="email"
							fullWidth
							label="Email address"
							required
							name="email"
							onChange={handleOnChange}
							value={profileData.email}
						/>
					</Box>
					<Box my={2}>
						<TextField
							fullWidth
							label="Mobile Number"
							type="tel"
							name="mobile"
							onChange={handleOnChange}
							value={profileData.mobile}
						/>
					</Box>
					<Box my={2}>
						<TextField
							disabled
							fullWidth
							label="Student or Employee Id"
							value={profileData.userId}
							name="userId"
						/>
					</Box>
					<Box my={2}>
						<TextField
							fullWidth
							label="Present Address"
							name="presentAddress"
							onChange={handleOnChange}
							value={profileData.presentAddress}
						/>
					</Box>
					<Box my={2}>
						<TextField
							fullWidth
							label="Permanent Address"
							name="permanentAddress"
							onChange={handleOnChange}
							value={profileData.permanentAddress}
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
									value={profileData.localGuardianName}
								/>
							</Box>
							<Box my={2}>
								<TextField
									fullWidth
									type="email"
									label="Local guardian email address"
									name="localGuardianEmail"
									onChange={handleOnChange}
									value={profileData.localGuardianEmail}
								/>
							</Box>
							<Box my={2}>
								<TextField
									fullWidth
									type="tel"
									label="Local guardian mobile number"
									name="localGuardianMobile"
									onChange={handleOnChange}
									value={profileData.localGuardianMobile}
								/>
							</Box>
						</>
					)}
					<Button type="submit" variant="contained" endIcon={<AddCircleOutline />}>
						Create
					</Button>
				</form>
			</Paper>
		</Box>
	);
};

export default ProfileInputBoxes;
