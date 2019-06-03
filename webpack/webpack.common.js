const path = require('path');

module.exports = {
	entry: {
		bundle: './src/main.js'
	},
	resolve: {
		extensions: ['.mjs', '.js', '.svelte']
	},
	output: {
		path: path.join(__dirname, '../public'),
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	}
};
