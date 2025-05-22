import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const DoctorSchema = new Schema(
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
		ImrNumber: {
			type: String,
			required: true,
			trim: true,
		},
		refreshToken: {
			type: String,
		},
		isDoctor: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	},
);

// Middleware to hash password before saving
DoctorSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next(); 

	this.password = await bcrypt.hash(this.password, 10);
	next();
});

DoctorSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

DoctorSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			Name: this.Name,
			PhoneNumber: this.PhoneNumber,
			Age: this.Age,
			Gender: this.Gender,
			AadharNumber: this.AadharNumber,
			ImrNumber: this.ImrNumber,
			isDoctor: this.isDoctor,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		},
	);
};

DoctorSchema.methods.generateRefreshToken = function () {
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

export const Doctor = mongoose.model("Doctor", DoctorSchema);
