import { Navigate } from "react-router-dom";
import { useIsLoggedInQuery } from "../services/apiSlice";
import Loading from "../templates/loading/Loading";

const NotLoggedIn = ({ children }) => {
	const responseInfo = useIsLoggedInQuery();
	
	if (responseInfo.isSuccess && responseInfo.data?.user) {
		return <Navigate to="/dashboard" replace />;
	} else if (responseInfo.isLoading) return <Loading />;
	return children;
};

export default NotLoggedIn;
