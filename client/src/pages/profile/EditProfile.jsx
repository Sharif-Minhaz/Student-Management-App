import { useEffect, useState } from "react";
import {
	useEditProfileMutation,
	useIsLoggedInQuery,
	useViewProfileQuery,
} from "../../services/apiSlice";
import "./profile.css";
import ProfileInputBoxes from "./ProfileInputBoxes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const defaultProfilePic =
	"https://res.cloudinary.com/hostingimagesservice/image/upload/v1664446734/studentManagement/empty-user.png";

const EditProfile = () => {
	document.title = "Student Management | Edit-Profile";
	const navigate = useNavigate();

	const responseInfo = useIsLoggedInQuery();
	const currentProfileInfo = useViewProfileQuery();

	const [updateProfile, profileResInfo] = useEditProfileMutation();

	const [imgKey, setImgKey] = useState("initial_key_value");
	const [profileData, setProfileData] = useState(currentProfileInfo.data?.userProfile?.profile);
	const [cancelProfilePic, setCancelProfilePic] = useState(false);

	const handleClearProfilePic = () => {
		setCancelProfilePic(false);
		setProfileData((prev) => ({ ...prev, profilePicture: defaultProfilePic }));
		setImgKey(Date.now());
	};

	useEffect(() => {
		if (currentProfileInfo.isSuccess && currentProfileInfo.data) {
			setProfileData(currentProfileInfo.data?.userProfile?.profile);
		} else {
			navigate("/profile/view", { replace: true });
		}
		// eslint-disable-next-line
	}, [responseInfo, currentProfileInfo]);

	useEffect(() => {
		if (profileResInfo.isSuccess && !profileResInfo.data?.success) {
			toast.error("Check the input fields!");
		} else if (profileResInfo.isSuccess && profileResInfo.data?.success) {
			navigate("/profile/view");
			toast.success(profileResInfo.data?.message);
		}
		// eslint-disable-next-line
	}, [profileResInfo]);

	const handleOnChange = (e) => {
		if (e.target.type === "file") {
			const img = e.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(img);
			reader.onload = () => {
				setProfileData((prev) => ({
					...prev,
					profilePicture: reader.result,
				}));
				setCancelProfilePic(true);
			};
			reader.onerror = (error) => {
				console.error("Error: ", error);
			};
		} else setProfileData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setProfileData((prev) => ({ ...prev, userId: responseInfo.data?.user?.userId }));
		updateProfile(profileData);
	};

	return (
		<ProfileInputBoxes
			profileResInfo={profileResInfo}
			handleOnChange={handleOnChange}
			handleSubmit={handleSubmit}
			profileData={profileData}
			cancelProfilePic={cancelProfilePic}
			handleClearProfilePic={handleClearProfilePic}
			imgKey={imgKey}
			editingMode={true}
		/>
	);
};

export default EditProfile;
