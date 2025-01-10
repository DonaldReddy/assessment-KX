import cron from "node-cron";
import { fetchCryptoPrices } from "../services/fetchCryptoPrices";

export function scheduleCronJobs() {
	cron.schedule("0 */2 * * *", async () => {
		fetchCryptoPrices();
	});
	console.log("Cron Jobs Scheduled");
}
