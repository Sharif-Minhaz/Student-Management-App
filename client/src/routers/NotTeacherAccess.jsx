import { Navigate } from "react-router-dom";
import { useIsLoggedInQuery } from "../services/apiSlice";

const NotTeacherAccess = ({ children }) => {
	const responseInfo = useIsLoggedInQuery();
	if (responseInfo.data?.success && responseInfo.data?.user?.role === "teacher") {
		return <Navigate to="/dashboard" replace />;
	}
	return children;
};

export default NotTeacherAccess;
