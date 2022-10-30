import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Advising from "../pages/advising/Advising";
import AvailableCourse from "../pages/availableCourse/AvailableCourse";
import LiveResult from "../pages/liveResult/LiveResult";
import Profile from "../pages/profile/Profile";
import CreateProfile from "../pages/profile/CreateProfile";
import EditProfile from "../pages/profile/EditProfile";
import RegisteredCourse from "../pages/registeredCourse/RegisteredCourse";
import RegisteredStudent from "../pages/registeredStudent/RegisteredStudent";
import Result from "../pages/result/Result";
import Report from "../pages/report/Report";
import ChangePassword from "../pages/auth/ChangePassword";
import NotFound404 from "../pages/errorPage/NotFound404";
import NotLoggedIn from "./NotLoggedIn";
import LoggedIn from "./LoggedIn";
import TeacherAccess from "./TeacherAccess";
import NotTeacherAccess from "./NotTeacherAccess";

const Routers = () => {
		return (
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/dashboard"
					element={
						<LoggedIn>
							<Dashboard />
						</LoggedIn>
					}
				/>
				<Route
					path="/login"
					element={
						<NotLoggedIn>
							<Login />
						</NotLoggedIn>
					}
				/>
				<Route
					path="/signup"
					element={
						<NotLoggedIn>
							<Signup />
						</NotLoggedIn>
					}
				/>
				<Route
					path="/advising"
					element={
						<LoggedIn>
							<Advising />
						</LoggedIn>
					}
				/>
				<Route path="/available-courses" element={<AvailableCourse />} />
				<Route
					path="/live-result"
					element={
						<NotTeacherAccess>
							<LiveResult />
						</NotTeacherAccess>
					}
				/>
				<Route
					path="/profile/view"
					element={
						<LoggedIn>
							<Profile />
						</LoggedIn>
					}
				/>
				<Route
					path="/profile/create"
					element={
						<LoggedIn>
							<CreateProfile />
						</LoggedIn>
					}
				/>
				<Route
					path="/profile/edit"
					element={
						<LoggedIn>
							<EditProfile />
						</LoggedIn>
					}
				/>
				<Route
					path="/registered-courses"
					element={
						<LoggedIn>
							<RegisteredCourse />
						</LoggedIn>
					}
				/>
				<Route
					path="/registered-students"
					element={
						<TeacherAccess>
							<RegisteredStudent />
						</TeacherAccess>
					}
				/>
				<Route path="/result" element={<Result />} />
				<Route path="/report" element={<Report />} />
				<Route
					path="/password/change"
					element={
						<LoggedIn>
							<ChangePassword />
						</LoggedIn>
					}
				/>
				<Route path="*" element={<NotFound404 />} />
			</Routes>
		);
};

export default Routers;
