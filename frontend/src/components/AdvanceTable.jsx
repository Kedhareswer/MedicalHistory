import { useSelector } from "react-redux";
import { FaUser, FaIdCard } from "react-icons/fa";

export function AdvanceTable() {
	const patientDetails = useSelector((store) => store.patient.patient);
	return (
		<div className="flex items-center justify-between bg-gray-100 p-4 rounded-t-lg text-gray-500 font-medium">
			{/* Patient Icon and Text */}
			<div className="flex items-center space-x-4 flex-grow">
				<FaUser />
				<span>Patient</span>
			</div>

			{/* Treatment Status */}
			<div className="flex items-center space-x-4 flex-grow">
				<span>Treatment Status</span>
			</div>

			{/* Aadhar Card Icon and Text */}
			<div className="flex items-center space-x-2 flex-grow justify-center">
				<FaIdCard />
				<span>Aadhar Card</span>
			</div>

			{/* Diagnosed With */}
			<div className="flex-grow text-right">
				<span>Diagnosed With</span>
			</div>
		</div>
	);
}
