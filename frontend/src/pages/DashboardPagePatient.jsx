import { AiFillDropboxSquare } from "react-icons/ai";
import SideNav from "../components/SideNav";
import { useState } from "react";

const DashboardPagePatient = () => {
	const [currentPage, setCurrentPage] = useState(0);
console.log("lol")
	const handleOptionClick = (index) => {
		setCurrentPage(index);
	};
	return (
		<>
			<div className="h-[90vh] w-full flex">
				<SideNav
					logos={[
						<AiFillDropboxSquare />,
						<AiFillDropboxSquare />,
						<AiFillDropboxSquare />,
						<AiFillDropboxSquare />,
						<AiFillDropboxSquare />,
						<AiFillDropboxSquare />,
					]}
					options={[
						"dashboard",
						"treatment timeline",
						"ongoing treatment",
						"view prescriptions",
						"explain",
					]}
					setCurrentPage={handleOptionClick}
				/>
				<>
					<div className="w-full h-[90vh] grid gap-3 grid-cols-8 grid-rows-8 bg-white">
						<div className="rounded-lg bg-slate-500 col-span-4 row-span-3"></div>
						<div className="rounded-lg bg-slate-400 col-span-4 row-span-4"></div>
						<div className="rounded-lg bg-slate-400 col-span-4 row-span-5">
							<img
								src="/dummy-img.jpg"
								alt="dummy graph"
								className="w-full h-full object-fill"
							/>
						</div>
						<div className="rounded-lg bg-slate-500 col-span-4 row-span-4"></div>
					</div>
				</>
			</div>
		</>
	);
};

export default DashboardPagePatient;
