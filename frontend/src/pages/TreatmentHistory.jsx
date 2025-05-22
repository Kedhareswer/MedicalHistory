import { useParams } from "react-router-dom";
import TreatmentBox from "../components/TreatmentBox";
import { apiSlice } from "../store/ApiSlice";
import { useEffect, useState } from "react";

const TreatmentHistory = () => {
	const { patientId } = useParams();
	const [triggergetTreatment] =
		apiSlice.endpoints.getTreatment.useLazyQuery();

	const [treatmentData, setTreatmentData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchTreatment = async () => {
			try {
				const response = await triggergetTreatment({
					TreatmentId: patientId,
				});
				let treatmentDateRes = response.data.data;

				setTreatmentData(response.data.data);
				console.log(response.data.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		};
		fetchTreatment();
	}, []);
	const data = [
		{
			date: new Date().toISOString(),
			Doctor: "Dr. John Doe",
			Reports: ["/dummy-img.jpg"],
			Precriptions: ["/dummy-img.jpg", "/dummy-img.jpg"],
			Remarks: "Patient is recovering well",
		},
		{
			date: new Date().toISOString(),
			Doctor: "Dr. John Doe",
			Reports: ["/dummy-img.jpg"],
			Precriptions: ["/dummy-img.jpg", "/dummy-img.jpg"],
			Remarks: "Patient is recovering well",
		},
		{
			date: new Date().toISOString(),
			Doctor: "Dr. John Doe",
			Reports: ["/dummy-img.jpg"],
			Precriptions: ["/dummy-img.jpg", "/dummy-img.jpg"],
			Remarks: "Patient is recovering well",
		},
		{
			date: new Date().toISOString(),
			Doctor: "Dr. John Doe",
			Reports: [],
			Precriptions: [],
			Remarks: "Patient is recovering well",
		},
		{
			date: new Date().toISOString(),
			Doctor: "Dr. John Doe",
			Reports: [],
			Precriptions: [],
			Remarks: "Patient is recovering well",
		},
		{
			date: new Date().toISOString(),
			Doctor: "Dr. John Doe",
			Reports: [],
			Precriptions: [],
			Remarks: "Patient is recovering well",
		},
	];

	return !isLoading ? (
		<div className="py-20">
			<div className="flex flex-col justify-center items-center">
				<h1 className="text-4xl font-bold mb-2">Treatment History</h1>
				<div className="flex gap-10 flex-col w-full">
					{treatmentData[0].Reports.map((treatment, index) => (
						<TreatmentBox key={index} TreatmentData={treatment} Doctor={treatmentData[0].Doctor[0].Name}/>
					))}
				</div>
			</div>
		</div>
	) : (
		<></>
	);
};

export default TreatmentHistory;
