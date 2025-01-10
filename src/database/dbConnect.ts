import mongoose from "mongoose";

export default async function dbConnect() {
	console.log("connecting to KoinX DB");
	await mongoose.connect(
		process.env.DB_URI || "mongodb://localhost:27017/KoinX",
	);
	console.log("connected to KoinX DB");
}
