import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import { apiSlice } from "./ApiSlice";
import authSlice from "./AuthSlice";
import PatientSlice from "./PatientDetails";

const appStore = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		currUser: UserSlice.reducer,
		auth: authSlice.reducer,
		patient: PatientSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

export default appStore;
