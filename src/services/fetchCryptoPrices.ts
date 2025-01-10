import axios from "axios";
import { CoinPrice } from "../models/CoinPrice.schema";

export async function fetchCryptoPrices() {
	try {
		console.log("fetching crypto prices");
		const response = await axios.get(
			"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cmatic-network%2Cethereum&vs_currencies=usd&include_market_cap=true&include_24hr_change=true",
			{
				headers: {
					"Content-Type": "application/json",
					"x-cg-demo-api-key": process.env.CoinGecko_API_KEY,
				},
			},
		);
		const data = response.data;
		const coins = ["bitcoin", "matic-network", "ethereum"];

		let promises = coins.map(async (coin) => {
			const coinData: {
				usd: number;
				usd_market_cap: number;
				usd_24h_change: number;
			} = data[coin];

			let coinInfo = await CoinPrice.findOne({ symbol: coin });

			if (!coinInfo) {
				coinInfo = new CoinPrice({
					symbol: coin,
					current_usd: coinData.usd,
					current_usd_market_cap: coinData.usd_market_cap,
					current_usd_24h_change: coinData.usd_24h_change,
				});
			} else {
				coinInfo.current_usd = coinData.usd;
				coinInfo.current_usd_market_cap = coinData.usd_market_cap;
				coinInfo.current_usd_24h_change = coinData.usd_24h_change;
			}

			await coinInfo.save();
		});
		await Promise.all(promises);
		console.log("fetched crypto prices");
	} catch (error) {
		console.error("Error fetching or saving crypto prices:", error);
	}
}
