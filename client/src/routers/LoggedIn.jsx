import { Navigate } from "react-router-dom";
import { useIsLoggedInQuery } from "../services/authSlice";

const LoggedIn = ({ children }) => {
	const responseInfo = useIsLoggedInQuery();
	if (responseInfo.data?.success && responseInfo.data?.user) {
		return children;
	}
	return <Navigate to="/login" replace />;
};

export default LoggedIn;
