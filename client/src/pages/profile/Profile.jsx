import "./profile.css";
import { useIsLoggedInQuery, useViewProfileQuery } from "../../services/apiSlice";
import { useEffect, useState } from "react";
import { Avatar, Paper, Stack } from "@mui/material";
import NoProfile from "./NoProfile";
import Loading from "../../templates/loading/Loading";

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
	if (profileData) {
		return (
			<Paper sx={{ m: 3, p: 3, mt: "88px", maxWidth: 800, mx: "auto" }} elevation={2}>
				<Stack>
					<Avatar variant="rounded" sx={{ width: "160px", height: "160px" }}>
						<img
							style={{ width: "100%", height: "100%", objectFit: "cover" }}
							src={profileData.profilePicture}
							alt="profile_pic"
						/>
					</Avatar>
				</Stack>
			</Paper>
		);
	}
	return <NoProfile />;
};

export default Profile;
