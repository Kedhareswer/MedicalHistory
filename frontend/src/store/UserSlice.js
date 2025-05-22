import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
	name: "Curruser",
	initialState: {
		user: null,
	},
	reducers: {
		AddUser: (state, action) => {
			const { curruser } = action.payload;
			state.user = curruser;
		},
		Logout: (state) => {
			state.user = null;
		},
	},
});

export const userActions = UserSlice.actions;

export default UserSlice;
