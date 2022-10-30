import "./profile.css";
import { useIsLoggedInQuery, useViewProfileQuery } from "../../services/apiSlice";
import { useEffect, useState } from "react";
import { Avatar, Box, Button, Chip, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import NoProfile from "./NoProfile";
import Loading from "../../templates/loading/Loading";
import { Link } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { Edit } from "@mui/icons-material";

const Profile = () => {
	document.title = "Student Management | Profile";
	const responseInfo = useIsLoggedInQuery();
	const profileInfo = useViewProfileQuery();
	const [profileData, setProfileData] = useState({});

	useEffect(() => {
		if (responseInfo.isSuccess && profileInfo.isSuccess && responseInfo.data?.user?.profile)
			setProfileData(profileInfo.data?.userProfile?.profile);
		else setProfileData({});
	}, [responseInfo, profileInfo]);

	if (profileInfo.isLoading) return <Loading />;
	if (JSON.stringify(profileData) !== "{}") {
		return (
			<Paper sx={{ m: 3, p: 3, mt: "88px", maxWidth: 800, mx: "auto" }} elevation={2}>
				<Stack direction="row" mb={2} justifyContent="space-between" alignItems="center">
					<Typography variant="h5">PROFILE INFORMATION</Typography>
					<Link to="/profile/edit">
						<Button
							size="small"
							startIcon={<Edit />}
							variant="contained"
							sx={{ backgroundColor: blue["A400"] }}
						>
							Edit profile
						</Button>
					</Link>
				</Stack>
				<Divider />
				<Grid container>
					<Grid item xs={3}>
						<Avatar
							variant="rounded"
							sx={{
								width: "160px",
								height: "160px",
								my: 2,
								boxShadow:
									"0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
							}}
							src={profileData.profilePicture}
						/>
					</Grid>
					<Divider orientation="vertical" flexItem>
						<Chip label="BASIC" />
					</Divider>
					<Grid item>
						<Box m={2}>
							<Typography variant="h6">{profileData?.fullName}</Typography>
							<Typography variant="body1">{profileData?.email}</Typography>
							<Typography variant="body1">
								{profileData?.userId}{" "}
								{responseInfo.data?.user?.role === "student"
									? "(Student Id)"
									: "(Employee Id)"}
							</Typography>
						</Box>
					</Grid>
				</Grid>
				<Divider />
				<Typography my={2} variant="h5">
					ADDRESS INFORMATION
				</Typography>
				<Divider textAlign="left">
					<Chip label="PRESENT ADDRESS" />
				</Divider>
				<Typography my={3}>{profileData?.presentAddress}</Typography>
				<Divider textAlign="left">
					<Chip label="PERMANENT ADDRESS" />
				</Divider>
				<Typography my={3}>{profileData?.permanentAddress}</Typography>
				<Divider />
				<Typography my={2} variant="h5">
					CONTACT INFORMATION
				</Typography>
				<Divider textAlign="left">
					<Chip label="EMAIL & MOBILE" />
				</Divider>
				<Typography mt={3} mb={1}>
					<strong>Email:</strong> {profileData?.email}
				</Typography>
				<Typography mb={3}>
					<strong>Mobile:</strong> {profileData?.mobile}
				</Typography>
				{responseInfo.data?.user?.role === "student" && (
					<>
						<Divider />
						<Typography my={2} variant="h5">
							LOCAL GUARDIAN'S INFORMATION
						</Typography>
						<Divider textAlign="left">
							<Chip label="GUARDIAN INFO" />
						</Divider>
						<Typography mt={3} mb={1}>
							<strong>Name:</strong> {profileData?.localGuardianName}
						</Typography>
						<Typography mb={1}>
							<strong>Email:</strong> {profileData?.localGuardianEmail}
						</Typography>
						<Typography mb={3}>
							<strong>Mobile:</strong> {profileData?.localGuardianMobile}
						</Typography>
					</>
				)}
			</Paper>
		);
	}
	return <NoProfile />;
};

export default Profile;
