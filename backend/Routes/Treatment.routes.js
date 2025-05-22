import { Router } from "express";
import { verifyJWT, isDoctor } from "../Middlewares/Auth.middleware.js";
import {
	CreateNewTreatment,
	getPatientDetails,
	getTreatmentDetails,
} from "../Controllers/Treatment.Controller.js";
import { AddReport } from "../Controllers/Reports.Controller.js";
import { upload } from "../Middlewares/Multer.middleware.js";

const router = Router();

router.route("/create-treatment").post(verifyJWT, isDoctor, CreateNewTreatment);
router
	.route("/get-patient-details")
	.get(verifyJWT, isDoctor, getPatientDetails);

router.route("/add-report").post(
	verifyJWT,
	isDoctor,
	upload.fields([
		{ name: "reports", maxCount: 5 },
		{ name: "prescriptions", maxCount: 5 },
	]),
	AddReport,
);

router
	.route("/get-treatment-details/:treatmentId")
	.get(verifyJWT, isDoctor, getTreatmentDetails);

export default router;
