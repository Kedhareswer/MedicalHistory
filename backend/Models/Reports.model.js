import mongoose, { Schema } from "mongoose";

const ReportSchema = new Schema(
	{
		Reports: [
			{
				public_id: {
					type: String,
					required: true,
				},
				url: {
					type: String,
					required: true,
				},
			},
		],
		Prescription: [
			{
				public_id: {
					type: String,
					required: true,
				},
				url: {
					type: String,
					required: true,
				},
			},
		],
		Remarks: {
			type: String,
		},
	},
	{ timestamps: true },
);

export const Reports = mongoose.model("Reports", ReportSchema);
