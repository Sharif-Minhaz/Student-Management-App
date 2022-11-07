import { Navigate } from "react-router-dom";
import { useIsLoggedInQuery } from "../services/apiSlice";
import Loading from "../templates/loading/Loading";

const AdminAccess = ({ children }) => {
	const responseInfo = useIsLoggedInQuery();

	if (responseInfo.data?.success && responseInfo.data?.user?.role === "admin") {
		return children;
	} else if (responseInfo.isLoading) return <Loading />;
	return <Navigate to="/dashboard" replace />;
};

export default AdminAccess;
