import "./profile.css";
import { useCreateProfileMutation, useIsLoggedInQuery } from "../../services/apiSlice";
import Loading from "../../templates/loading/Loading";
import { useEffect, useState } from "react";
import ProfileInputBoxes from "./ProfileInputBoxes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
	const navigate = useNavigate();

	const responseInfo = useIsLoggedInQuery();
	const [createProfile, profileResInfo] = useCreateProfileMutation();

	const [imgKey, setImgKey] = useState("initial_key_value");
	const [profileData, setProfileData] = useState(initialData);
	const [cancelProfilePic, setCancelProfilePic] = useState(false);

	const handleClearProfilePic = () => {
		setCancelProfilePic(false);
		setProfileData((prev) => ({ ...prev, profilePicture: defaultProfilePic }));
		setImgKey(Date.now());
	};

	useEffect(() => {
		if (responseInfo.data?.user?.profile) {
			navigate("/profile/view", { replace: true });
		} else setProfileData((prev) => ({ ...prev, userId: responseInfo.data?.user?.userId }));
		// eslint-disable-next-line
	}, [responseInfo]);

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
		if (profileData.userId === responseInfo.data?.user?.userId) {
			return createProfile(profileData);
		}
		toast.error("Invalid user id!");
	};

	if (responseInfo.isSuccess) {
		return (
			<ProfileInputBoxes
				profileResInfo={profileResInfo}
				handleOnChange={handleOnChange}
				handleSubmit={handleSubmit}
				profileData={profileData}
				cancelProfilePic={cancelProfilePic}
				handleClearProfilePic={handleClearProfilePic}
				imgKey={imgKey}
			/>
		);
	}
};

export default CreateProfile;
