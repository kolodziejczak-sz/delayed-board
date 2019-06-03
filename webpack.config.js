const mode = process.env.NODE_ENV || 'development';
const webpackConfig = mode === 'development' 
                    ? require('./webpack/webpack.dev')
                    : require('./webpack/webpack.prod');

module.exports = webpackConfig