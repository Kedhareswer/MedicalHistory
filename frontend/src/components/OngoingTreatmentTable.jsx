import { useState } from "react";
import { useSelector } from "react-redux";
import OngoingTreatmentForm from "./OngoingTreatmentForm";
import { Link } from "react-router-dom";

const OngoingTreatmentTable = () => {
	const patientDetails = useSelector((store) => store.patient.patient);
	const [currentTreatmentId, setCurrentTreatmentId] = useState("");
	const [isFormVisible, setIsFromVisible] = useState(false);
	return (
		<div className="overflow-x-auto w-full h-full">
			<table className="min-w-full bg-white border border-gray-200">
				<thead className="bg-gray-100">
					<tr>
						<th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
							Patient Name
						</th>
						<th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
							IsActive
						</th>
						<th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
							Diagnosed With
						</th>
						<th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
							Update Treatment
						</th>
					</tr>
				</thead>
				<tbody>
					{patientDetails.map((patient, index) => (
						<tr key={index} className="hover:bg-gray-50">
							<td className="py-3 px-4 border-b">
								<Link
									className="text-blue-500 hover:text-blue-800"
									to={`/treatmentHistory/${patient._id}`}
								>
									{patient.PatientName}
								</Link>
							</td>
							<td className="py-3 px-4 border-b">
								{patient.iscompleted ? "Completed" : "Ongoing"}
							</td>
							<td className="py-3 px-4 border-b">
								{patient.DiagonsedWith}
							</td>
							<td className="py-3 px-4 border-b">
								<button
									onClick={() => {
										setCurrentTreatmentId(patient._id);
										setIsFromVisible(true);
									}}
									className=" p-2 text-sm bg-green-500 text-white hover:bg-green-600 transition-all duration-300 font-bold rounded-lg "
								>
									Add New Treatment
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<OngoingTreatmentForm
				TreatmentId={currentTreatmentId}
				setIsFromVisible={setIsFromVisible}
				isVisible={isFormVisible}
			/>
		</div>
	);
};

export default OngoingTreatmentTable;
