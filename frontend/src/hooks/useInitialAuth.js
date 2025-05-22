import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/AuthSlice";
import { userActions } from "../store/UserSlice";
import axios from "axios";

const useInitialAuth = (setLoading) => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const [authChecked, setAuthChecked] = useState(false);

	// Get isDoctor value safely with a default
	const isDoctor = localStorage.getItem("isDoctor") === "true";

	useEffect(() => {
		// Skip if we've already checked auth or if we have a valid token
		if (authChecked || token) {
			setLoading(false);
			return;
		}

		const refreshAccessToken = async () => {
			try {
				// Determine which endpoint to use based on user type
				const endpoint = isDoctor
					? `${
							import.meta.env.VITE_BASE_URL
					  }/api/v1/users/refresh-doctor-token`
					: `${
							import.meta.env.VITE_BASE_URL
					  }/api/v1/users/refresh-patient-token`;

				console.log(
					`Attempting to refresh token using endpoint: ${endpoint}`,
				);

				const result = await axios.get(endpoint, {
					withCredentials: true,
				});

				if (result?.data?.data?.accessToken) {
					console.log("Token refresh successful");

					// Update auth state with new token
					dispatch(
						authActions.setCredentials({
							AccessToken: result.data.data.accessToken,
						}),
					);

					// Update user information if available
					if (result.data.data.user) {
						dispatch(
							userActions.AddUser({
								curruser: result.data.data.user,
							}),
						);
					}
				} else {
					console.log("No token in response, logging out");
					dispatch(authActions.logout());
					dispatch(userActions.Logout());
				}
			} catch (error) {
				console.error("Token refresh failed:", error.message);
				dispatch(authActions.logout());
				dispatch(userActions.Logout());
			} finally {
				setAuthChecked(true);
				setLoading(false);
			}
		};

		refreshAccessToken();
	}, [dispatch, token, authChecked, isDoctor, setLoading]);

	return { isAuthenticated: !!token, isDoctor };
};

export default useInitialAuth;
