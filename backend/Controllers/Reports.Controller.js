import { Treatment } from "../Models/Treatment.model.js";
import { ApiError } from "../utils/Apierror.js";
import { asyncHandler } from "../utils/ApiHandler.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { Reports } from "../Models/Reports.model.js";
import uploadOnCloudinary from "../utils/UploadOnCloudinary.js";

const AddReport = asyncHandler(async (req, res) => {
	const { TreatmentId } = req.body;
	const reports = req.files["reports"];
	const prescription = req.files["prescriptions"];

	if (reports.length < 1 || prescription.length < 1) {
		throw new ApiError(
			400,
			"Please upload atleast one report and one prescription",
		);
	}
	if (reports.length > 5 || prescription.length > 5) {
		throw new ApiError(
			400,
			"You can upload maximum 5 reports and 5 prescriptions",
		);
	}
	const existingTreatment = await Treatment.findById(TreatmentId);
	if (!existingTreatment) {
		throw new ApiError(404, "No treatment found with this id");
	}
	//uplod reports on cloudinary
	const uploadedReports = await uploadOnCloudinary(reports);
	//upload prescription on clofs
	const uploadedPrescription = await uploadOnCloudinary(prescription);

	const newReport = await Reports.create({
		Reports: uploadedReports,
		Prescription: uploadedPrescription,
		Remarks: req.body.Remarks,
	});

	existingTreatment.Reports.push(newReport._id);
	await existingTreatment.save({ validateBeforeSave: false });

	res.status(200).json(
		new ApiResponse("Reports added sucessfully", 200, newReport),
	);
});

export { AddReport };
