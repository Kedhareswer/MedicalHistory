import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { validateDoctor, validatePatient } from "../utils/index";
import toast from "react-hot-toast";

const Signup = () => {
	const [isDoctor, setIsDoctor] = useState(false);
	const nameRef = useRef(null);
	const ageRef = useRef(null);
	const phoneNumberRef = useRef(null);
	const genderRef = useRef(null);
	const aadharRef = useRef(null);
	const passwordRef = useRef(null);
	const imrRef = useRef(null);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const commonData = {
			Name: nameRef.current.value.trim(),
			PhoneNumber: phoneNumberRef.current.value.trim(),
			Age: ageRef.current.value,
			Gender: genderRef.current.value.toLowerCase(),
			AadharNumber: aadharRef.current.value.trim(),
			password: passwordRef.current.value,
		};

		try {
			if (!isDoctor) {
				if (validatePatient(commonData)) {
					const response = await axios.post(
						`${
							import.meta.env.VITE_BASE_URL
						}/api/v1/users/register-patient`,
						commonData,
					);
					toast.success("Patient registered successfully");
					clearFields();
				}
			} else {
				const ImrNumber = imrRef.current?.value.trim();

				if (!ImrNumber) {
					toast.error("IMR Registration Number is required");
					return;
				}

				const doctorData = {
					...commonData,
					ImrNumber,
				};

				if (validateDoctor(doctorData)) {
					const response = await axios.post(
						`${
							import.meta.env.VITE_BASE_URL
						}/api/v1/users/register-doctor`,
						doctorData,
					);
					toast.success("Doctor registered successfully");
					clearFields();
				}
			}
		} catch (err) {
			handleErrorToast(err);
		}
	};

	const clearFields = () => {
		nameRef.current.value = "";
		phoneNumberRef.current.value = "";
		ageRef.current.value = "";
		genderRef.current.value = "";
		aadharRef.current.value = "";
		passwordRef.current.value = "";
		if (imrRef.current) imrRef.current.value = "";
		setIsDoctor(false);
	};

	const handleErrorToast = (err) => {
		const htmlContent = err.response?.data;
		if (htmlContent) {
			try {
				const parser = new DOMParser();
				const doc = parser.parseFromString(htmlContent, "text/html");
				const preTagContent = doc.querySelector("pre")?.innerHTML;
				const errorMessage = preTagContent
					?.split("<br>")[0]
					.replace("Error:", "")
					.trim();
				toast.error(errorMessage || "Registration failed");
			} catch {
				toast.error("An error occurred while parsing error message");
			}
		} else {
			toast.error("Unexpected error occurred");
		}
	};

	return (
		<div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 p-4">
			{/* Left: Form Section */}
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg md:mr-8">
				<h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
					Sign Up
				</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Name Input */}
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700"
						>
							Name
						</label>
						<input
							ref={nameRef}
							type="text"
							id="name"
							name="name"
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
							required
							placeholder="Enter you name"
						/>
					</div>

					{/* Phone Number Input */}
					<div>
						<label
							htmlFor="phone"
							className="block text-sm font-medium text-gray-700"
						>
							Phone Number
						</label>
						<input
							ref={phoneNumberRef}
							type="tel"
							id="phone"
							name="phone"
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
							required
							placeholder="Enter you phone number"
						/>
					</div>

					{/* Age Input */}
					<div>
						<label
							htmlFor="age"
							className="block text-sm font-medium text-gray-700"
						>
							Age
						</label>
						<input
							ref={ageRef}
							type="number"
							id="age"
							name="age"
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
							required
							placeholder="Enter you age"
						/>
					</div>

					{/* Gender Input */}
					<div>
						<label
							htmlFor="gender"
							className="block text-sm font-medium text-gray-700"
						>
							Gender
						</label>
						<select
							ref={genderRef}
							id="gender"
							name="gender"
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
							required
						>
							<option value="">Select Gender</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Other</option>
						</select>
					</div>

					{/* Aadhar Number Input */}
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
							placeholder="Enter your aadhar number"
						/>
					</div>

					{/* Password Input */}
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							ref={passwordRef}
							type="text"
							id="password"
							name="password"
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
							required
							placeholder="Enter your password"
						/>
					</div>

					{/* Are you a doctor? */}
					<div className="flex items-center">
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

					<div className={`${isDoctor ? " block " : " hidden "}`}>
						<label
							htmlFor="imr"
							className="block text-sm font-medium text-gray-700"
						>
							IMR Registration No
						</label>
						<input
							ref={imrRef}
							type="text"
							id="imr"
							name="imr"
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						/>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 cursor-pointer"
					>
						Register
					</button>
				</form>

				<Link
					to={"/login"}
					className="text-green-500 text-center mt-4 block hover:text-green-600 transition-all duration-300"
				>
					Already a user?
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

export default Signup;
