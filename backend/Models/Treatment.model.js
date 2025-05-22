import mongoose, { Schema } from "mongoose";

const TreatementSchema = new Schema(
	{
		PatientName: {
			type: String,
			required: true,
		},
		AadharNumber: {
			type: String,
			required: true,
		},
		DiagonsedWith: {
			type: String,
			required: true,
		},
		Remarks: {
			type: String,
		},
		DoctorId: {
			type: Schema.Types.ObjectId,
			ref: "Doctor",
			required: true,
		},
		Reports: [
			{
				type: Schema.Types.ObjectId,
				ref: "Reports",
			},
		],
		iscompleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

export const Treatment = mongoose.model("Treatment", TreatementSchema);
