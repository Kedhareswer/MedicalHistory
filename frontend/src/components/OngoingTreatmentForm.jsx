import React, { useRef } from "react";
import { CgClose } from "react-icons/cg";
import { useAddReportsMutation } from "../store/ApiSlice";

const OngoingTreatmentForm = ({ isVisible, setIsFromVisible, TreatmentId }) => {
	const reportRef = useRef(null);
	const prescriptionRef = useRef(null);
	const remarksRef = useRef(null);
	const [addReports] = useAddReportsMutation();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const reportFile = reportRef.current.files;
		const prescriptionFile = prescriptionRef.current.files;
		const remarks = remarksRef.current.value;
		const myformdata = new FormData();
		// reportFile.forEach((file) => {
		// 	myformdata.append("reports", file);
		// });
		for (let i = 0; i < reportFile.length; i++) {
			myformdata.append("reports", reportFile[i]);
		}
		for (let i = 0; i < prescriptionFile.length; i++) {
			myformdata.append("prescriptions", prescriptionFile[i]);
		}

		myformdata.append("Remarks", remarks);
		myformdata.append("TreatmentId", TreatmentId);
		// Handle form submission logic here
		console.log(reportFile);
		try {
			const res = await addReports(myformdata);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
		setIsFromVisible(false);
	};

	return (
		<div
			className={` ${
				!isVisible && " hidden "
			} fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center`}
		>
			<div className="bg-white relative rounded-lg shadow-lg p-8 w-1/2">
				<h2 className="text-lg font-bold mb-4"></h2>
				<button
					onClick={() => {
						setIsFromVisible(false);
					}}
					className="absolute top-4 text-2xl  right-4"
				>
					<CgClose />
				</button>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="report"
						>
							Report
						</label>
						<input
							ref={reportRef}
							id="report"
							type="file"
							multiple
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="prescription"
						>
							Prescription
						</label>
						<input
							ref={prescriptionRef}
							id="prescription"
							type="file"
							multiple
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="remarks"
						>
							Remarks
						</label>
						<textarea
							ref={remarksRef}
							id="remarks"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Enter remarks"
						/>
					</div>
					<button
						onClick={() => setIsFromVisible(false)}
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default OngoingTreatmentForm;
