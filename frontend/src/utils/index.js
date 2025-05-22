import toast from "react-hot-toast";

// Generic field validator
const validateFields = (data, requiredFields) => {
	for (const field of requiredFields) {
		if (!data[field.key]) {
			toast.error(`${field.label} is required`);
			return false;
		}
	}
	return true;
};

export const validatePatient = (data) => {
	const requiredFields = [
		{ key: "Name", label: "Name" },
		{ key: "Age", label: "Age" },
		{ key: "PhoneNumber", label: "Phone Number" },
		{ key: "Gender", label: "Gender" },
		{ key: "AadharNumber", label: "Aadhar Number" },
		{ key: "password", label: "password" },
	];
	return validateFields(data, requiredFields);
};

export const validateDoctor = (data) => {
	const requiredFields = [
		{ key: "Name", label: "Name" },
		{ key: "Age", label: "Age" },
		{ key: "PhoneNumber", label: "Phone Number" },
		{ key: "Gender", label: "Gender" },
		{ key: "AadharNumber", label: "Aadhar Number" },
		{ key: "ImrNumber", label: "IMR Registration Number" },
		{ key: "password", label: "password" },
	];
	return validateFields(data, requiredFields);
};

// Utility: Format date
export const dateParser = (date) => {
	const d = new Date(date);
	return d.toDateString();
};
