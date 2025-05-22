import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/ApiHandler.js";
import { ApiError } from "../utils/Apierror.js";
import { Patient } from "../Models/Patient.model.js";
import { Doctor } from "../Models/Doctor.model.js";

/**
 * Helper to generate tokens for a patient
 */
const generateTokensForPatient = async (userId) => {
	try {
		const user = await Patient.findById(userId);
		if (!user) throw new ApiError(404, "Patient not found");

		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		console.error("Error generating tokens for patient:", error);
		throw new ApiError(500, error.message || "Error generating tokens");
	}
};

/**
 * Helper to generate tokens for a doctor
 */
const generateTokensForDoctor = async (userId) => {
	try {
		const user = await Doctor.findById(userId);
		if (!user) throw new ApiError(404, "Doctor not found");

		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		console.error("Error generating tokens for doctor:", error);
		throw new ApiError(500, error.message || "Error generating tokens");
	}
};

/**
 * Register a new patient
 */
const registerPatient = asyncHandler(async (req, res) => {
	const { Name, PhoneNumber, Age, Gender, AadharNumber, password } = req.body;

	// Validate required fields
	if (
		!Name ||
		!PhoneNumber ||
		!Age ||
		!Gender ||
		!AadharNumber ||
		!password
	) {
		throw new ApiError(400, "Please enter all the required details");
	}

	// Check if user already exists
	const existingUser = await Patient.findOne({ AadharNumber });
	if (existingUser) {
		throw new ApiError(409, "User with this Aadhar number already exists");
	}

	// Validate gender
	const validGenders = ["male", "female", "other"];
	if (!validGenders.includes(Gender.toLowerCase())) {
		throw new ApiError(
			400,
			"Invalid gender. Must be male, female, or transgender",
		);
	}

	// Create new patient
	const newPatient = await Patient.create({
		Name: Name.trim(),
		PhoneNumber: PhoneNumber.trim(),
		Age,
		Gender: Gender.toLowerCase(),
		AadharNumber: AadharNumber.trim(),
		password,
	});

	// Return response without sensitive data
	const createdPatient = await Patient.findById(newPatient._id).select(
		"-refreshToken -password",
	);

	return res
		.status(201)
		.json(
			new ApiResponse(
				"Patient registered successfully",
				201,
				createdPatient,
			),
		);
});

/**
 * Register a new doctor
 */
const registerDoctor = asyncHandler(async (req, res) => {
	const {
		Name,
		PhoneNumber,
		Age,
		Gender,
		AadharNumber,
		password,
		ImrNumber,
	} = req.body;

	// Validate required fields
	if (
		!Name ||
		!PhoneNumber ||
		!Age ||
		!Gender ||
		!AadharNumber ||
		!password ||
		!ImrNumber
	) {
		throw new ApiError(400, "Please enter all the required details");
	}

	// Check if user already exists
	const existingUser = await Doctor.findOne({ AadharNumber });
	if (existingUser) {
		throw new ApiError(409, "User with this Aadhar number already exists");
	}

	// Validate gender
	const validGenders = ["male", "female", "other"];
	if (!validGenders.includes(Gender.toLowerCase())) {
		throw new ApiError(
			400,
			"Invalid gender. Must be male, female, or other",
		);
	}

	// Create new doctor
	const newDoctor = await Doctor.create({
		Name: Name.trim(),
		PhoneNumber: PhoneNumber.trim(),
		Age,
		Gender: Gender.toLowerCase(),
		AadharNumber: AadharNumber.trim(),
		password,
		ImrNumber: ImrNumber.trim(),
	});

	// Return response without sensitive data
	const createdDoctor = await Doctor.findById(newDoctor._id).select(
		"-refreshToken -password",
	);

	return res
		.status(201)
		.json(
			new ApiResponse(
				"Doctor registered successfully",
				201,
				createdDoctor,
			),
		);
});

/**
 * Login for patients
 */
const patientLogin = asyncHandler(async (req, res) => {
	const { AadharNumber, password } = req.body;

	if (!AadharNumber && !password) {
		throw new ApiError(400, "Aadhar number and Password are required");
	}

	// Find patient by Aadhar number
	const patient = await Patient.findOne({ AadharNumber });
	if (!patient) {
		throw new ApiError(404, "Patient not found. Please register first");
	}

	const isPasswordValid = await patient.isPasswordCorrect(password);

	if (!isPasswordValid) {
		throw new ApiError(401, "Invalid user credentials");
	}

	// Generate tokens
	const { accessToken, refreshToken } = await generateTokensForPatient(
		patient._id,
	);

	// Get user data without sensitive info
	const loggedInPatient = await Patient.findById(patient._id).select(
		"-refreshToken -password",
	);

	// Set cookies
	const cookieOptions = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.cookie("AccessToken", accessToken, cookieOptions)
		.cookie("RefreshToken", refreshToken, cookieOptions)
		.json(
			new ApiResponse("Login successful", 200, {
				user: loggedInPatient,
				accessToken,
				refreshToken,
			}),
		);
});

/**
 * Login for doctors
 */
const doctorLogin = asyncHandler(async (req, res) => {
	const { AadharNumber, password } = req.body;

	if (!AadharNumber && !password) {
		throw new ApiError(400, "Aadhar number and Password are required");
	}

	// Find doctor by Aadhar number
	const doctor = await Doctor.findOne({ AadharNumber });
	if (!doctor) {
		throw new ApiError(404, "Doctor not found. Please register first");
	}

	const isPasswordValid = await doctor.isPasswordCorrect(password);

	if (!isPasswordValid) {
		throw new ApiError(401, "Invalid user credentials");
	}

	// Generate tokens
	const { accessToken, refreshToken } = await generateTokensForDoctor(
		doctor._id,
	);

	// Get user data without sensitive info
	const loggedInDoctor = await Doctor.findById(doctor._id).select(
		"-refreshToken -password",
	);

	// Set cookies
	const cookieOptions = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.cookie("AccessToken", accessToken, cookieOptions)
		.cookie("RefreshToken", refreshToken, cookieOptions)
		.json(
			new ApiResponse("Login successful", 200, {
				user: loggedInDoctor,
				accessToken,
				refreshToken,
			}),
		);
});

/**
 * Logout for patients
 */
const logoutPatient = asyncHandler(async (req, res) => {
	// Verify user is logged in
	if (!req.user) {
		throw new ApiError(401, "Unauthorized");
	}

	// Update database
	await Patient.findByIdAndUpdate(
		req.user._id,
		{
			$unset: { refreshToken: 1 },
		},
		{ new: true },
	);

	// Clear cookies
	const cookieOptions = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.clearCookie("AccessToken", cookieOptions)
		.clearCookie("RefreshToken", cookieOptions)
		.json(new ApiResponse("Logged out successfully", 200, {}));
});

/**
 * Logout for doctors
 */
const logoutDoctor = asyncHandler(async (req, res) => {
	// Verify user is logged in
	if (!req.user) {
		throw new ApiError(401, "Unauthorized");
	}

	// Update database
	await Doctor.findByIdAndUpdate(
		req.user._id,
		{
			$unset: { refreshToken: 1 },
		},
		{ new: true },
	);

	// Clear cookies
	const cookieOptions = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.clearCookie("AccessToken", cookieOptions)
		.clearCookie("RefreshToken", cookieOptions)
		.json(new ApiResponse("Logged out successfully", 200, {}));
});

/**
 * Refresh access token for patients
 */
const refreshPatientToken = asyncHandler(async (req, res) => {
	// Get refresh token from cookie
	const incomingRefreshToken =
		req.cookies?.refreshToken || req.body.refreshToken;

	if (!incomingRefreshToken) {
		throw new ApiError(401, "Refresh token missing");
	}

	// Verify token
	let decodedToken;
	try {
		decodedToken = jwt.verify(
			incomingRefreshToken,
			process.env.REFRESH_TOKEN_SECRET,
		);
	} catch (error) {
		throw new ApiError(401, "Invalid or expired refresh token");
	}

	// Find user
	const patient = await Patient.findById(decodedToken._id);
	if (!patient) {
		throw new ApiError(404, "Patient not found");
	}

	// Verify stored token matches
	if (patient.refreshToken !== incomingRefreshToken) {
		throw new ApiError(401, "Refresh token is used or expired");
	}

	// Generate new tokens
	const { accessToken, refreshToken } = await generateTokensForPatient(
		patient._id,
	);

	// Update refresh token in database
	patient.refreshToken = refreshToken;
	await patient.save({ validateBeforeSave: false });

	// Set cookies
	const cookieOptions = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.cookie("AccessToken", accessToken, cookieOptions)
		.cookie("RefreshToken", refreshToken, cookieOptions)
		.json(new ApiResponse("Access token refreshed", 200, { accessToken }));
});

/**
 * Refresh access token for doctors
 */
const refreshDoctorToken = asyncHandler(async (req, res) => {
	// Get refresh token from cookie
	const incomingRefreshToken =
		req.cookies?.RefreshToken || req.body.refreshToken;

	if (!incomingRefreshToken) {
		throw new ApiError(401, "Refresh token missing");
	}

	// Verify token
	let decodedToken;
	try {
		decodedToken = jwt.verify(
			incomingRefreshToken,
			process.env.REFRESH_TOKEN_SECRET,
		);
	} catch (error) {
		throw new ApiError(401, "Invalid or expired refresh token");
	}

	// Find user
	const doctor = await Doctor.findById(decodedToken._id);
	if (!doctor) {
		throw new ApiError(404, "Doctor not found");
	}

	// Verify stored token matches
	if (doctor.refreshToken !== incomingRefreshToken) {
		throw new ApiError(401, "Refresh token is used or expired");
	}

	// Generate new tokens
	const { accessToken, refreshToken } = await generateTokensForDoctor(
		doctor._id,
	);

	// Update refresh token in database
	doctor.refreshToken = refreshToken;
	await doctor.save({ validateBeforeSave: false });

	// Set cookies
	const cookieOptions = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.cookie("AccessToken", accessToken, cookieOptions)
		.cookie("RefreshToken", refreshToken, cookieOptions)
		.json(new ApiResponse("Access token refreshed", 200, { accessToken }));
});

export {
	registerDoctor,
	registerPatient,
	patientLogin,
	doctorLogin,
	logoutPatient,
	logoutDoctor,
	refreshPatientToken,
	refreshDoctorToken,
};
