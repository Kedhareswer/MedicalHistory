import React, { useState } from "react";

const TreatmentBox = ({ TreatmentData,Doctor }) => {
	
	const [openTreatmentDetails, setOpenTreatmentDetails] = useState(false);
	return (
		<div className="p-4 w-full cursor-pointer bg-slate-200  rounded-lg drop-shadow-xl">
			<div
				onClick={() => setOpenTreatmentDetails((prev) => !prev)}
				className="flex justify-evenly bg-white p-2 rounded-lg"
			>
				<p className="font-bold">
					<span>Date: </span>
					24-09-2024
				</p>
				<p className="font-bold">
					<span>Doctor: </span>
					{Doctor}
				</p>
				<p className="font-bold">
					<span>Remarks: </span>
					{TreatmentData.Remarks}
				</p>
			</div>
			<div
				className={`${
					openTreatmentDetails ? "block" : "hidden"
				} p-4 w-full cursor-pointer bg-slate-200  rounded-lg drop-shadow-xl`}
			>
				<div className="flex flex-col justify-evenly mb-5 bg-white p-2 rounded-lg">
					<p className="font-bold">Reports:</p>
					<ul className="flex gap-4">
						{TreatmentData.Reports.length>=1 && TreatmentData.Reports.map((report, index) => (
							<li key={index}>
								{<img src={report.url} alt="" className="w-5/12" />}
							</li>
						))}
					</ul>
				</div>

				<div className="flex flex-col justify-evenly bg-white p-2 rounded-lg">
					<p className="font-bold">Precriptions:</p>
					<ul className="flex flex-wrap gap-3">
						{TreatmentData.Prescription.length>=1 && TreatmentData.Prescription.map(
							(precription, index) => (
								<li key={index}>
									{
										<img
											src={precription.url}
											alt=""
											className="w-5/12"
										/>
									}
								</li>
							)
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default TreatmentBox;
