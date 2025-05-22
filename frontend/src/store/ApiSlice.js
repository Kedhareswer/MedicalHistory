import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authActions } from "./AuthSlice";
import { userActions } from "./UserSlice";

const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:3001",
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}

		return headers;
	},
});
const baseQueryWithReAuth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	// console.log(result)
	const isDoctor = localStorage.getItem("isDoctor");
	let url = "";
	if (isDoctor === "true") {
		url = "/api/v1/users/refresh-doctor-token";
	} else {
		url = "/api/v1/users/refresh-patient-token";
	}

	if (result?.error?.originalStatus === 401) {
		console.log(url);
		const refreshResult = await baseQuery(url, api, extraOptions);
		console.log(refreshResult);
		if (refreshResult?.data) {
			api.dispatch(
				authActions.setCredentials({
					AccessToken: refreshResult.data.data.AccessToken,
				}),
			);
			api.dispatch(
				userActions.AddUser({
					curruser: refreshResult.data.data.currUser,
				}),
			);
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(authActions.logout());
			api.dispatch(userActions.Logout());
		}
	}
	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReAuth,
	endpoints: (builder) => ({
		PatientLogin: builder.mutation({
			query: (body) => ({
				url: "/api/v1/users/login-patient",
				method: "POST",
				body,
			}),
		}),

		DoctorLogin: builder.mutation({
			query: (body) => ({
				url: "/api/v1/users/login-doctor",
				method: "POST",
				body,
			}),
		}),

		PatinetSignup: builder.mutation({
			query: (body) => ({
				url: "/api/v1/users/register-patient",
				method: "POST",
				body,
			}),
		}),

		DoctorSignup: builder.mutation({
			query: (body) => ({
				url: "/api/v1/users/register-doctor",
				method: "POST",
				body,
			}),
		}),

		refreshAccessTokenPatient: builder.query({
			query: () => ({
				url: "/api/v1/users/refresh-patient-token",
				method: "GET",
			}),
		}),

		refreshAccessTokenDoctor: builder.query({
			query: () => ({
				url: "/api/v1/users/refresh-doctor-token",
				method: "GET",
			}),
		}),

		logoutPatient: builder.query({
			query: () => ({
				url: "/api/v1/users/logout-patient",
				method: "POST",
			}),
		}),

		logoutDoctor: builder.query({
			query: () => ({
				url: "/api/v1/users/logout-doctor",
				method: "POST",
			}),
		}),

		getPatientDetails: builder.query({
			query: () => ({
				url: "/api/v1/treatment/get-patient-details",
				method: "GET",
				credentials: "include",
			}),
		}),

		createTreatment: builder.mutation({
			query: (data) => ({
				url: "/api/v1/treatment/create-treatment",
				method: "POST",
				credentials: "include",
				body: data,
			}),
		}),

		addReports: builder.mutation({
			query: (data) => ({
				url: "/api/v1/treatment/add-report",
				method: "POST",
				credentials: "include",
				body: data,
			}),
		}),

		getTreatment: builder.query({
			query: ({ TreatmentId }) => ({
				url: `/api/v1/treatment/get-treatment-details/${TreatmentId}`,
				method: "GET",
				credentials: "include",
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	usePatinetsignupMutation,
	useCreateTreatmentMutation,
	useAddReportsMutation,
	useGetTreatmentQuery,
} = apiSlice;
