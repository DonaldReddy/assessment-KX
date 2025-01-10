import "dotenv/config";
import express from "express";
import cors from "cors";
import dbConnect from "./database/dbConnect";
import { scheduleCronJobs } from "./jobs/cronJob.cron";
import statRouter from "./routes/stats.route";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/api", statRouter);

async function startServer() {
	await dbConnect();
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
	scheduleCronJobs();
}

startServer();
