import { createSlice } from "@reduxjs/toolkit";

const PatientSlice = createSlice({
	name: "PatientDetails",
	initialState: {
		patient: [],
	},
	reducers: {
		AddPatient: (state, action) => {
			const { patientArray } = action.payload;
			state.patient = patientArray;
		},
		Logout: (state) => {
			state.patient = [];
		},
	},
});

export const patientActions = PatientSlice.actions;

export default PatientSlice;
