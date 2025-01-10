import { Request, Response } from "express";
import { getCoinDeviation, getCoinStats } from "../repository/CoinPrice.repo";

// Get the stats of a coin
export async function getStats(
	req: Request<{}, {}, {}, { coin: string }, {}>,
	res: Response,
) {
	try {
		const coin = req.query.coin;
		if (!coin) {
			res.status(400).send("Coin is required");
			return;
		}
		const coinStats = await getCoinStats(coin);
		res.json(coinStats);
	} catch (error) {
		console.error("Error fetching coin stats:", error);
		res.status(500).send("Internal server error");
	}
}

// Get the deviation of a coin
export async function getDeviation(
	req: Request<{}, {}, {}, { coin: string }, {}>,
	res: Response,
) {
	try {
		const coin = req.query.coin;
		if (!coin) {
			res.status(400).send("Coin is required");
			return;
		}
		const coinStats = await getCoinDeviation(coin);
		res.json(coinStats);
	} catch (error) {
		console.error("Error fetching coin stats:", error);
		res.status(500).send("Internal server error");
	}
}
