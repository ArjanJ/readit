var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	devtool: 'cheap-eval-source-map',
	entry: [
		'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/index')
	],
	output: {
		path: path.join(__dirname, '/dist/'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
	],
	module: {
		preLoaders: [{
	  	test: /\.js$/,
	  	loaders: ['eslint-loader'],
	  	exclude: /node_modules/,
	  }],
		loaders: [{
			test: /\.scss$/,
			loaders: ['style', 'css', 'sass']
		}, {
	    test: /\.js$/,
	    loaders: ['babel'],
	    exclude: /node_modules/
	  }, {
	  	test: /\.json$/,
	  	loader: 'json'
	  }]
	},
	
  eslint: {
  	configFile: './.eslintrc'
  }
}