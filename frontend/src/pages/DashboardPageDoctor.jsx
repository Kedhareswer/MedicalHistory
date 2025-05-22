import { useState } from "react";
import { AiFillDropboxSquare } from "react-icons/ai";
import SideNav from "../components/SideNav";
import DoctorDashboard from "../components/DoctorDashboard"; 
import { AddTreatment } from "../components/AddTreatment";
import PatientTable from "../components/PatiendTable";
import OngoingTreatmentTable from "../components/OngoingTreatmentTable";

const DashboardPageDoctor = () => {
	const [currentPage, setCurrentPage] = useState(0);

	const handleOptionClick = (index) => {
		setCurrentPage(index);
	};

	return (
		<div className="h-[90vh] w-full flex">
			<SideNav
				currentPage={currentPage}
				logos={[
					<AiFillDropboxSquare key={0} />,
					<AiFillDropboxSquare key={1} />,
					<AiFillDropboxSquare key={2} />,
					<AiFillDropboxSquare key={3} />,
					<AiFillDropboxSquare key={4} />,
					<AiFillDropboxSquare key={5} />,
				]}
				options={[
					"Dashboard",
					"Add New Treatment",
					"Patient List",
					"Ongoing Treatments",
					"Treatment Timeline",
				]}
				setCurrentPage={handleOptionClick} 
			/>
			<>
				{currentPage == 0 ? (
					<DoctorDashboard currentPage={currentPage} />
				) : currentPage == 1 ? (
					<AddTreatment />
				) : currentPage == 2 ? (
					// <AdvanceTable users={[]} />
					<PatientTable data={[]} />
				) : (
					<OngoingTreatmentTable />
				)}
			</>
		</div>
	);
};

export default DashboardPageDoctor;
