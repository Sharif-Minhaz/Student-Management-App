import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CommonData } from "../contexts/CommonData";

const Protected = ({ children }) => {
	const { isLoggedIn } = useContext(CommonData);
	if (!isLoggedIn) {
		return <Navigate to="/login" replace />;
	}
	return children;
};

export default Protected;
