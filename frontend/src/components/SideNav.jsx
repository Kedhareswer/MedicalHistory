import { CiLogout } from "react-icons/ci";
import { useSelector } from "react-redux";
import { apiSlice } from "../store/ApiSlice";
import { userActions } from "../store/UserSlice";
import { authActions } from "../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SideNav = ({ options, logos, currentPage, setCurrentPage }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((store) => store.currUser.user);
	const [triggerlogoutPatient] =
		apiSlice.endpoints.logoutPatient.useLazyQuery();
	const [triggerlogoutDoctor] =
		apiSlice.endpoints.logoutDoctor.useLazyQuery();
	console.log(user);
	const handleLogout = async () => {
		if (user?.isDoctor) {
			try {
				const res = await triggerlogoutDoctor();
				dispatch(userActions.Logout());
				dispatch(authActions.logout());
				navigate("/home");
			} catch (error) {
				console.log(error);
			}
		} else {
			try {
				const res = await triggerlogoutPatient();
				dispatch(userActions.Logout());
				dispatch(authActions.logout());
				navigate("/home");
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<div className="md:w-72  bg-slate-100 h-[90vh] hideScoll overflow-y-scroll">
			<ul className="md:p-4  pt-10 w-full h-full flex flex-col gap-4">
				{options.map((option, index) => (
					<li
						onClick={() => setCurrentPage(index)}
						key={index}
						className={`md:w-full capitalize w-10 h-10 md:h-12 flex item-center transition-all duration-300 hover:text-white rounded-xl hover:bg-orange-500 cursor-pointer text-black gap-2 text-xl  font-main ${
							currentPage === index
								? " bg-orange-500 text-white "
								: ""
						}`}
					>
						<span className="inline-flex justify-center items-center md:gap-2 md:ml-3">
							<span className="">{logos[index]}</span>{" "}
							<span className="hidden md:block md:text-base">
								{option}
							</span>
						</span>
					</li>
				))}
				<li
					className={`w-full mt-auto capitalize  h-12 flex item-center transition-all duration-300 hover:text-white rounded-xl hover:bg-orange-500 cursor-pointer text-black gap-2 text-xl  font-main `}
				>
					<button
						onClick={handleLogout}
						className="inline-flex justify-center items-center gap-2 ml-3"
					>
						<span className="">
							<CiLogout />
						</span>{" "}
						<span className="">logout</span>
					</button>
				</li>
			</ul>
		</div>
	);
};

export default SideNav;
