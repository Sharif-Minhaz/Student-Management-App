import "./profile.css";

import { useIsLoggedInQuery } from "../../services/apiSlice";
import Loading from "../../templates/loading/Loading";
import { useEffect, useState } from "react";
import ProfileInputBoxes from "./ProfileInputBoxes";

const defaultProfilePic =
	"https://res.cloudinary.com/hostingimagesservice/image/upload/v1664446734/studentManagement/empty-user.png";
const initialData = {
	profilePicture: defaultProfilePic,
	fullName: "",
	email: "",
	mobile: "",
	userId: "",
	presentAddress: "",
	permanentAddress: "",
	localGuardianName: "",
	localGuardianEmail: "",
	localGuardianMobile: "",
};

const CreateProfile = () => {
	document.title = "Student Management | Create-Profile";
	const [imgKey, setImgKey] = useState("initial_key_value");

	const responseInfo = useIsLoggedInQuery();
	const [profileData, setProfileData] = useState(initialData);

	const [cancelProfilePic, setCancelProfilePic] = useState(false);

	const handleClearProfilePic = () => {
		setCancelProfilePic(false);
		setProfileData((prev) => ({ ...prev, profilePicture: defaultProfilePic }));
		setImgKey(Date.now());
	};

	useEffect(() => {
		setProfileData((prev) => ({ ...prev, userId: responseInfo.data?.user?.userId }));
	}, [responseInfo]);

	const handleOnChange = (e) => {
		if (e.target.type !== "file") {
			return setProfileData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		}
		setProfileData((prev) => ({
			...prev,
			profilePicture: URL.createObjectURL(e.target.files[0]),
		}));
		setCancelProfilePic(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	if (responseInfo.isSuccess) {
		return (
			<ProfileInputBoxes
				handleOnChange={handleOnChange}
				handleSubmit={handleSubmit}
				profileData={profileData}
				cancelProfilePic={cancelProfilePic}
				handleClearProfilePic={handleClearProfilePic}
				imgKey={imgKey}
			/>
		);
	}

	return <Loading />;
};

export default CreateProfile;
