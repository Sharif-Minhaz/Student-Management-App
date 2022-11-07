import { Navigate } from "react-router-dom";
import { useIsLoggedInQuery } from "../services/apiSlice";
import Loading from "../templates/loading/Loading";

const StudentAccess = ({ children }) => {
	const responseInfo = useIsLoggedInQuery();

	if (responseInfo.data?.success && responseInfo.data?.user?.role === "user") {
		return children;
	} else if (responseInfo.isLoading) return <Loading />;
	return <Navigate to="/" replace />;
};

export default StudentAccess;
