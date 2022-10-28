import { Navigate } from "react-router-dom";
import { useIsLoggedInQuery } from "../services/apiSlice";
import Loading from './../templates/loading/Loading';

const TeacherAccess = ({ children }) => {
	const responseInfo = useIsLoggedInQuery();

	if (responseInfo.isSuccess && responseInfo.data?.user?.role === "teacher") return children;
	else if (responseInfo.isLoading) return <Loading />;
	return <Navigate to="/" replace />;
};

export default TeacherAccess;
