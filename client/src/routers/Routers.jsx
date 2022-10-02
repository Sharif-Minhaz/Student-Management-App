import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Advising from "../pages/advising/Advising";
import AvailableCourse from "../pages/availableCourse/AvailableCourse";
import LiveResult from "../pages/liveResult/LiveResult";
import Profile from "../pages/profile/Profile";
import CreateProfile from "../pages/profile/CreateProfile";
import UpdateProfile from "../pages/profile/UpdateProfile";
import RegisteredCourse from "../pages/registeredCourse/RegisteredCourse";
import RegisteredStudent from "../pages/registeredStudent/RegisteredStudent";
import Result from "../pages/result/Result";
import Report from "../pages/report/Report";
import ChangePassword from "../pages/auth/ChangePassword";

const Routers = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/advising" element={<Advising />} />
			<Route path="/available-course" element={<AvailableCourse />} />
			<Route path="/live-result" element={<LiveResult />} />
			<Route path="/profile/view" element={<Profile />} />
			<Route path="/profile/create" element={<CreateProfile />} />
			<Route path="/profile/edit" element={<UpdateProfile />} />
			<Route path="/registered-course" element={<RegisteredCourse />} />
			<Route path="/registered-student" element={<RegisteredStudent />} />
			<Route path="/result" element={<Result />} />
			<Route path="/report" element={<Report />} />
			<Route path="/password/change" element={<ChangePassword />} />
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
};

export default Routers;
