import React, { useRef } from "react";
import { useCreateTreatmentMutation } from "../store/ApiSlice";
import toast from "react-hot-toast";

export const AddTreatment = () => {
	const [createTreatment] = useCreateTreatmentMutation();
	const nameRef = useRef();
	const aadharRef = useRef();
	const diseaseRef = useRef();
	const remarkRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const treatmentData = {
			PatientName: nameRef.current.value,
			AadharNumber: aadharRef.current.value,
			DiagonsedWith: diseaseRef.current.value,
			Remarks: remarkRef.current.value,
		};
		try {
			const res = await createTreatment(treatmentData);
			nameRef.current.value = "";
			aadharRef.current.value = "";
			diseaseRef.current.value = "";
			remarkRef.current.value = "";

			toast.success("Treatment added successfully");
		} catch (error) {
			toast.error("Failed to add treatment");
			console.log(error);
		}

		console.log(treatmentData); // Replace this with actual form submission logic
	};

	return (
		<section className="w-screen h-screen flex justify-center items-center bg-gray-50">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 flex flex-col gap-6 border border-gray-200"
			>
				<h2 className="text-3xl font-bold text-center text-gray-800">
					Add Treatment
				</h2>

				<div className="flex flex-col">
					<label
						htmlFor="name"
						className="text-lg text-gray-700 mb-1"
					>
						Patient Name:
					</label>
					<input
						type="text"
						id="name"
						ref={nameRef}
						className="p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
						placeholder="Enter patient name"
						required
					/>
				</div>

				<div className="flex flex-col">
					<label
						htmlFor="aadhar"
						className="text-lg text-gray-700 mb-1"
					>
						Patient Aadhar:
					</label>
					<input
						type="text"
						id="aadhar"
						ref={aadharRef}
						className="p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
						placeholder="Enter patient Aadhar number"
						required
					/>
				</div>

				<div className="flex flex-col">
					<label
						htmlFor="disease"
						className="text-lg text-gray-700 mb-1"
					>
						Disease:
					</label>
					<input
						type="text"
						id="disease"
						ref={diseaseRef}
						className="p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
						placeholder="Enter disease"
						required
					/>
				</div>

				<div className="flex flex-col">
					<label
						htmlFor="remark"
						className="text-lg text-gray-700 mb-1"
					>
						Add Remark:
					</label>
					<textarea
						id="remark"
						ref={remarkRef}
						className="p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
						placeholder="Enter any remarks"
						rows="4"
						required
					/>
				</div>

				<div className="flex justify-center">
					<button className="w-full py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-300">
						Submit Treatment
					</button>
				</div>
			</form>
		</section>
	);
};
