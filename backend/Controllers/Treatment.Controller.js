import mongoose from "mongoose";
import { Treatment } from "../Models/Treatment.model.js";
import { ApiError } from "../utils/Apierror.js";
import { asyncHandler } from "../utils/ApiHandler.js";
import { ApiResponse } from "../utils/Apiresponse.js";

const CreateNewTreatment = asyncHandler(async (req, res) => {
	const currDoc = req.user;
	const { PatientName, AadharNumber, DiagonsedWith, Remarks } = req.body;
	if (!PatientName || !AadharNumber || !DiagonsedWith || !Remarks) {
		throw new ApiError(402, "Please enter all the details");
	}
	const newTreatment = await Treatment.create({
		PatientName: PatientName,
		AadharNumber,
		DiagonsedWith,
		Remarks,
		DoctorId: currDoc._id,
	});
	res.status(200).json(
		new ApiResponse("treatment Sucessfully created", 200, newTreatment),
	);
});

const getPatientDetails = asyncHandler(async (req, res) => {
	const doc = req.user;
	const docid = new mongoose.Types.ObjectId(doc._id);
	const patientdetails = await Treatment.aggregate([
		{
			$match: {
				DoctorId: docid,
			},
		},
		{
			$sort: {
				createdAt: -1,
			},
		},
	]);
	return res
		.status(200)
		.json(new ApiResponse("sent sucessfully", 200, patientdetails));
});

const getTreatmentDetails = asyncHandler(async (req, res) => {
	const treatmentId = req.params.treatmentId;
	const currTreatmentid = new mongoose.Types.ObjectId(treatmentId);
	const resdetails = await Treatment.aggregate([
		{
			$match: {
				_id: currTreatmentid,
			},
		},
		{
			$lookup: {
				from: "reports",
				localField: "Reports",
				foreignField: "_id",
				as: "Reports",
			},
		},
		{
			$lookup: {
				from: "doctors",
				localField: "DoctorId",
				foreignField: "_id",
				as: "Doctor",
			},
		},
	]);
	return res
		.status(200)
		.json(new ApiResponse("Sent sucessfully", 200, resdetails));
});

export { CreateNewTreatment, getPatientDetails, getTreatmentDetails };
