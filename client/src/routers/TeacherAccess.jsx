import { Navigate } from "react-router-dom";
import { useIsLoggedInQuery } from "../services/authSlice";

const TeacherAccess = ({ children }) => {
	const responseInfo = useIsLoggedInQuery();
	if (responseInfo.data?.success && responseInfo.data?.user?.role === "teacher") {
		return children;
	}
	return <Navigate to="/dashboard" replace />;
};

export default TeacherAccess;
