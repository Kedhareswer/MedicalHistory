import { app } from "./app.js";
import DbConnect from "./Db/DbConnect.js";

const PORT = process.env.PORT || 8080;

DbConnect()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on port: http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
		console.log("connection failed!!!!!");
	});
