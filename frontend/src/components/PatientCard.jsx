import { useSelector } from "react-redux";

const UserCard = ({ patient }) => {
	const patientDetails = useSelector((store) => store.patient.patient);
	return (
		<div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md space-x-4 mb-4">
			{/* Profile Section */}
			<div className="flex items-center space-x-2">
				<img
					className="w-10 h-10 rounded-full"
					src="https://via.placeholder.com/150"
					alt="Profile"
				/>
				<span className="font-medium text-gray-800">
					{patient?.PatientName}
				</span>
			</div>

			{/* Status Section */}
			<span
				className={`text-sm px-2 py-1 rounded-full ${
					patient.iscompleted
						? "bg-green-100 text-green-600"
						: "bg-red-100 text-red-600"
				}`}
			>
				{!patient.iscompleted ? "Active" : "Inactive"}
			</span>

			{/* Phone Number */}
			<span className="font-semibold text-blue-500 underline">
				{patient.AadharNumber}
			</span>

			{/* Tag */}
			<span className="text-sm bg-blue-100 text-blue-500 px-2 py-1 rounded-full">
				{patient.DiagonsedWith}
			</span>
		</div>
	);
};
export default UserCard;
