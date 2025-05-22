import { useEffect } from "react";
import { patientActions } from "../store/PatientDetails";
import { useSelector, useDispatch } from "react-redux";
import { apiSlice } from "../store/ApiSlice";

const usePatient = () => {
	const isDoctor = localStorage.getItem("isDoctor");
	const dispatch = useDispatch();
	const [triggergetPatientDetails] =
		apiSlice.endpoints.getPatientDetails.useLazyQuery();
	useEffect(() => {
		const getPatient = async () => {
			if (isDoctor === "false") return;
			try {
				const response = await triggergetPatientDetails();
				console.log(response);
				dispatch(
					patientActions.AddPatient({
						patientArray: response?.data?.data,
					}),
				);
			} catch (error) {
				console.error("Error fetching patient data: ", error);
			}
		};
		getPatient();
	}, [dispatch]);
};

export default usePatient;
