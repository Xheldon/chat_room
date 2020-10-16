/**
 * @author: x
 * @date: 2020/10/15 16:01
 * @description: devServer.js
 */

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

// 将文件 serve 到 port 10086。
app.listen(10086, function () {
  console.log('Example app listening on port 10086!\n');
});
