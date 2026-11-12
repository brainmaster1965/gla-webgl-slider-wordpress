const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
	...defaultConfig,
	output: {
		...defaultConfig.output,
		// Zwingt Webpack, dynamische Chunks (wie unsere Effekte) als effect-[name].js im build/-Ordner abzulegen
		chunkFilename: "[name].js",
	},
};
