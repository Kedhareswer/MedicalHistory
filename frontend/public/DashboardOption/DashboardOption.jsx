import { Link } from "react-router-dom";

const DashboardOption = ({ color, title, link }) => {
	return (
		<Link
			to={link}
			className="flex justify-center items-center w-64 rounded-xl p-2  drop-shadow-xl h-44 hover:scale-110 transition-all duration-500 bg-slate-200"
		>
			<div className="w-full flex justify-center items-center bg-rose-300 h-40 rounded-xl">
				<h2 className="w-[80%] font-main font-bold">{title}</h2>
			</div>
		</Link>
	);
};

export default DashboardOption;
