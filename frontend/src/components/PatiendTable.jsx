import { useSelector } from "react-redux";

const PatientTable = ({ data }) => {
	const patientDetails = useSelector((store) => store.patient.patient);
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
					</tr>
				</thead>
				<tbody>
					{patientDetails.map((patient, index) => (
						<tr key={index} className="hover:bg-gray-50">
							<td className="py-3 px-4 border-b">
								{patient.PatientName}
							</td>
							<td className="py-3 px-4 border-b">
								{patient.iscompleted ? "Completed" : "Ongoing"}
							</td>
							<td className="py-3 px-4 border-b">
								{patient.DiagonsedWith}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default PatientTable;
