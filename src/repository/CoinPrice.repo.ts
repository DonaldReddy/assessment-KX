import { CoinPrice } from "../models/CoinPrice.schema";

export async function getCoinStats(coin: string) {
	try {
		const coinInfo = await CoinPrice.findOne({ symbol: coin }).select(
			"-_id current_usd current_usd_market_cap current_usd_24h_change",
		);
		return coinInfo;
	} catch (error) {
		console.error("Error fetching coin stats:", error);
		return null;
	}
}

export async function getCoinDeviation(coin: string) {
	try {
		const coinInfo = await CoinPrice.findOne({ symbol: coin }).select(
			"-_id deviation",
		);
		return coinInfo;
	} catch (error) {
		console.error("Error fetching coin stats:", error);
		return null;
	}
}
