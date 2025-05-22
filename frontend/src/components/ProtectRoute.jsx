import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = ({ children, token, redirect = "/home" }) => {
	if (!token) {
		return <Navigate to={redirect} />;
	}
	return <>{children ? children : <Outlet />};</>;
};

export default ProtectRoute;
