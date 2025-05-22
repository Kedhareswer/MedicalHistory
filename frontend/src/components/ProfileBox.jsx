import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileBox = () => {
	const user = useSelector((store) => store.currUser.user);
	console.log(user);
	return (
		<>
			{!user ? (
				<Link
					to="/signup"
					className="px-8 py-4 text-sm hover:bg-slate-100 bg-white text-black  rounded-full"
				>
					Login/SignUp
				</Link>
			) : (
				<Link
					to={"/profile"}
					className="rounded-full p-4 bg-green-500 text-white"
				>
					{user?.Name[0]}
				</Link>
			)}
		</>
	);
};

export default ProfileBox;
