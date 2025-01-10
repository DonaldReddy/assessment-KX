import { Schema, model } from "mongoose";

const HistoryPriceSchema = new Schema(
	{
		past_usd: { type: Number, required: true },
		past_usd_market_cap: { type: Number, required: true },
		past_usd_24h_change: { type: Number, required: true },
	},
	{ timestamps: true },
);

const CoinPriceSchema = new Schema(
	{
		symbol: { type: String, required: true },
		current_usd: { type: Number, required: true },
		current_usd_market_cap: { type: Number, required: true },
		current_usd_24h_change: { type: Number, required: true },
		deviation: { type: Number, default: 0 },
		mean: { type: Number, default: 0 },
		history: { type: [HistoryPriceSchema], default: [] },
	},
	{ timestamps: true },
);

// collection middleware to calculate the mean and deviation
CoinPriceSchema.pre("save", function (next) {
	const coin = this;

	// Save the current price data in history
	const historyPrice = {
		past_usd: coin.current_usd,
		past_usd_market_cap: coin.current_usd_market_cap,
		past_usd_24h_change: coin.current_usd_24h_change,
	};
	coin.history.push(historyPrice);

	// Calculate the mean of all historical prices
	const totalPrice = coin.history.reduce((acc, curr) => acc + curr.past_usd, 0);
	coin.mean = totalPrice / coin.history.length;

	// Calculate variance of the past 100 historical prices
	const variance =
		coin.history
			.slice(Math.max(0, coin.history.length - 100))
			.reduce((acc, curr) => {
				return acc + Math.pow(curr.past_usd - coin.mean, 2);
			}, 0) / coin.history.length;

	// Calculate deviation (standard deviation)
	coin.deviation = Math.sqrt(variance);

	next();
});

export const CoinPrice = model("Coin-Price", CoinPriceSchema);
