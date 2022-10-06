import { Navigate } from "react-router-dom";
import { useIsLoggedInQuery } from "../services/authSlice";

const NotLoggedIn = ({ children }) => {
	const responseInfo = useIsLoggedInQuery();
	if (responseInfo.data?.success && responseInfo.data?.user) {
		return <Navigate to="/dashboard" replace />;
	}
	return children;
};

export default NotLoggedIn;
