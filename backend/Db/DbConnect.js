import mongoose from "mongoose";

const DbConnect = async () => {
	try {
		const connectionInstance = await mongoose.connect(
			`${process.env.MONGODB_URI}/${process.env.DB_NAME}`,
		);
		console.log(
			"Connected to MongoDB Database",
			connectionInstance.connection.host,
		);
	} catch (error) {
		console.log("MongoDB Connection Failed", error);
		throw error;
	}
};

export default DbConnect;
