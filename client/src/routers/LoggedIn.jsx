import { Navigate } from "react-router-dom";
import { useIsLoggedInQuery } from "../services/apiSlice";
import Loading from "../templates/loading/Loading";

const LoggedIn = ({ children }) => {
	const responseInfo = useIsLoggedInQuery();
	
	if (responseInfo.isSuccess && responseInfo.data?.user) {
		return children;
	} else if (responseInfo.isLoading) return <Loading />;
	return <Navigate to="/login" replace />;
};

export default LoggedIn;
