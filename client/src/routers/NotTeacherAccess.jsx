import { Navigate } from "react-router-dom";
import { useIsLoggedInQuery } from "../services/apiSlice";
import Loading from './../templates/loading/Loading';

const NotTeacherAccess = ({ children }) => {
	const responseInfo = useIsLoggedInQuery();
	
	if (responseInfo.data?.success && responseInfo.data?.user?.role === "teacher") {
		return <Navigate to="/dashboard" replace />;
	} else if (responseInfo.isLoading) return <Loading />;
	return children;
};

export default NotTeacherAccess;
