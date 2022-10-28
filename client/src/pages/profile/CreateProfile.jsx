import "./profile.css";
import { useCreateProfileMutation, useIsLoggedInQuery } from "../../services/apiSlice";
import Loading from "../../templates/loading/Loading";
import { useEffect, useState } from "react";
import ProfileInputBoxes from "./ProfileInputBoxes";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

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

	const [imgKey, setImgKey] = useState("initial_key_value");
	const responseInfo = useIsLoggedInQuery();
	const [createProfile, profileResInfo] = useCreateProfileMutation();

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

	useEffect(() => {
		if(profileResInfo.isSuccess && profileResInfo.data?.success) {
			navigate("/profile/view");
			toast.success(profileResInfo.data?.message)
		}
	}, [profileResInfo]);

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
		createProfile(profileData);
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
