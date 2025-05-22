import jwt from "jsonwebtoken";
import { Patient } from "../Models/Patient.model.js";
import { Doctor } from "../Models/Doctor.model.js";
import { asyncHandler } from "../utils/ApiHandler.js";
import { ApiError } from "../utils/Apierror.js";

/**
 * Middleware to verify JWT access token and load user (patient or doctor)
 */
const verifyJWT = asyncHandler(async (req, res, next) => {
	try {
		// Extract token from cookies or Authorization header
		const accessToken =
			req.cookies?.AccessToken ||
			req.header("Authorization")?.replace("Bearer ", "");

		if (!accessToken) {
			throw new ApiError(401, "Access token not provided");
		}

		// Verify the token
		const decoded = jwt.verify(
			accessToken,
			process.env.ACCESS_TOKEN_SECRET,
		);

		// Look for user in both models
		let user = await Patient.findById(decoded._id).select("-refreshToken");

		// If not found in Patient, check Doctor model
		if (!user) {
			user = await Doctor.findById(decoded._id).select("-refreshToken");
		}

		if (!user) {
			throw new ApiError(401, "User not found. Token may be invalid.");
		}

		// Add user to request
		req.user = user;
		next();
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			throw new ApiError(401, "Access token expired");
		}
		throw new ApiError(401, error?.message || "Invalid access token");
	}
});

/**
 * Middleware to verify if the authenticated user is a doctor
 */
const isDoctor = asyncHandler(async (req, res, next) => {
	if (!req.user || req.user.isDoctor !== true) {
		throw new ApiError(403, "Only doctors can access this resource");
	}
	next();
});

/**
 * Middleware to verify if the authenticated user is a patient
 */
const isPatient = asyncHandler(async (req, res, next) => {
	if (!req.user || req.user.isDoctor !== false) {
		throw new ApiError(403, "Only patients can access this resource");
	}
	next();
});

export { verifyJWT, isDoctor, isPatient };
