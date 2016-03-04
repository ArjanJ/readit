'use strict';

const isDeveloping = process.env.NODE_ENV !== 'production';
const express = require('express');
const path = require('path');

const port = isDeveloping ? 8080 : process.env.PORT;

const webpack = isDeveloping ? require('webpack') : null;
const webpackMiddleware = isDeveloping ? require('webpack-dev-middleware') : null;
const webpackHotMiddleware = isDeveloping ? require('webpack-hot-middleware') : null;
const config = isDeveloping ? require('./webpack.config.dev.js') : null;

const app = express();

if (isDeveloping) {

  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + './dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, './dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});