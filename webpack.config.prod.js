var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	devtool: 'source-map',
	entry: [path.join(__dirname, 'src/index')],
	output: {
		path: path.join(__dirname, '/dist/'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
			},
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
	],
	module: {
		preLoaders: [{
	  	test: /\.js$/,
	  	loaders: ['eslint-loader'],
	  	exclude: /node_modules/
	  }],
		loaders: [{
			test: /\.scss$/,
			loaders: ['style', 'css', 'sass']
		}, {
	    test: /\.js$/,
	    loaders: ['babel'],
	    include: path.join(__dirname, 'src')
	  }, {
	  	test: /\.json$/,
	  	loader: 'json'
	  }]
	},
	eslint: {
  	configFile: './.eslintrc'
  }
}