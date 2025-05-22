import { Router } from "express";
import {
	registerDoctor,
	registerPatient,
	patientLogin,
	doctorLogin,
	logoutPatient,
	logoutDoctor,
	refreshPatientToken,
	refreshDoctorToken,
} from "../Controllers/User.Controller.js";
import {
	verifyJWT,
	isDoctor,
	isPatient,
} from "../Middlewares/Auth.middleware.js";

const router = Router();

router.route("/register-patient").post(registerPatient);
router.route("/register-doctor").post(registerDoctor);

router.route("/login-patient").post(patientLogin);
router.route("/login-doctor").post(doctorLogin);

router.route("/logout-patient").post(verifyJWT, isPatient, logoutPatient);
router.route("/logout-doctor").post(verifyJWT, isDoctor, logoutDoctor);

router.route("/refresh-patient-token").get(refreshPatientToken);
router.route("/refresh-doctor-token").get(refreshDoctorToken);

export default router;
