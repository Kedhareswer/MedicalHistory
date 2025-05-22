import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const PatientSchema = new Schema(
	{
		Name: {
			type: String,
			required: true,
			trim: true,
		},
		PhoneNumber: {
			type: String,
			required: true,
			trim: true,
		},
		Age: {
			type: Number,
			required: true,
		},
		Gender: {
			type: String,
			enum: ["male", "female", "other"],
			required: true,
		},
		AadharNumber: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		refreshToken: {
			type: String,
		},
		isDoctor: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

// Middleware to hash password before saving
PatientSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 10);
	next();
});

PatientSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

PatientSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			Name: this.Name,
			PhoneNumber: this.PhoneNumber,
			Age: this.Age,
			Gender: this.Gender,
			AadharNumber: this.AadharNumber,
			isDoctor: this.isDoctor,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		},
	);
};

PatientSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			_id: this._id,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
		},
	);
};

export const Patient = mongoose.model("Patient", PatientSchema);
