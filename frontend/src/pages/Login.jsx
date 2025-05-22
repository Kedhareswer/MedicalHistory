import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { authActions } from "../store/AuthSlice";
import { userActions } from "../store/UserSlice";

const Login = () => {
	const aadharRef = useRef(null);
	const passwordRef = useRef(null);
	const [isDoctor, setIsDoctor] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const AadharNumber = aadharRef.current?.value.trim();
		const password = passwordRef.current?.value;

		if (!AadharNumber || !password) {
			toast.error("Please fill in all fields");
			return;
		}

		const endpoint = isDoctor
			? "/api/v1/users/login-doctor"
			: "/api/v1/users/login-patient";

		try {
			const res = await axios.post(
				`${import.meta.env.VITE_BASE_URL}${endpoint}`,
				{ AadharNumber, password },
				{ withCredentials: true },
			);

			const { user, accessToken } = res.data.data;

			dispatch(userActions.AddUser({ curruser: user }));
			dispatch(authActions.setCredentials({ AccessToken: accessToken }));
			localStorage.setItem("isDoctor", user.isDoctor);
			navigate("/");
		} catch (err) {
			console.error(err);
			const htmlContent = err.response?.data || "";
			const parser = new DOMParser();
			const doc = parser.parseFromString(htmlContent, "text/html");
			const preTag = doc.querySelector("pre");
			const message = preTag
				? preTag.innerHTML.split("<br>")[0].replace("Error:", "").trim()
				: "Login failed. Please try again.";
			toast.error(message);
		}
	};

	return (
		<div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 p-4">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg md:mr-8">
				<h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
					Login
				</h1>
				<form className="space-y-4" onSubmit={handleSubmit}>
					<div>
						<label
							htmlFor="aadhar"
							className="block text-sm font-medium text-gray-700"
						>
							Aadhar Number
						</label>
						<input
							ref={aadharRef}
							type="text"
							id="aadhar"
							name="aadhar"
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
							required
							placeholder="Enter you aadhar number"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							ref={passwordRef}
							type="password"
							id="password"
							name="password"
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
							required
							minLength={6}
							placeholder="Enter your password"
						/>
					</div>

					<div className="flex items-center mt-4">
						<input
							checked={isDoctor}
							type="checkbox"
							id="doctor"
							name="doctor"
							className="form-checkbox h-4 w-4"
							onChange={() => setIsDoctor((prev) => !prev)}
						/>
						<label
							htmlFor="doctor"
							className="ml-2 text-sm text-gray-700"
						>
							Are you a doctor?
						</label>
					</div>

					<button
						type="submit"
						className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
					>
						Register
					</button>
				</form>

				<Link
					to={"/signup"}
					className="text-green-500 text-center mt-4 block hover:text-green-600 transition-all duration-300"
				>
					New user?
				</Link>
			</div>

			{/* Right: Information Section */}
			<div className="bg-green-100 p-8 rounded-lg shadow-lg w-full max-w-lg mt-8 md:mt-0">
				<div className="flex flex-col items-center space-y-4">
					{/* Government Logo */}
					<img
						src="/gov-logo.png"
						alt="Government Logo"
						className="h-20"
					/>

					<h2 className="text-xl font-semibold text-gray-800 text-center">
						Patient Medical History Portal
						<br />
						Government of India
					</h2>

					{/* Logos */}
					<div className="flex justify-center space-x-4">
						<img
							src="/institute-logo.png"
							alt="Institute Logo"
							className="h-16"
						/>
						<img
							src="/digital-india-logo.png"
							alt="Digital India Logo"
							className="h-16"
						/>
					</div>

					{/* Info Text */}
					<p className="text-center text-sm text-gray-600">
						This portal allows doctors to securely access and manage
						the medical treatment history of patients using their
						Aadhar card. Established by the Government of India in
						2024, this initiative aims to streamline healthcare
						records and ensure continuity of care across medical
						facilities.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
