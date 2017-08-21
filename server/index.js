// import express from 'express';
var express = require('express');
import compression from 'compression';
import path from 'path';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

//IMPORT SERVER FILES
let sellerData = require('./SellerData');

let app = express();

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use('/public', express.static(__dirname + '/../public'));

app.use(compression());

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.get('*/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/api/seller', sellerData.postSellerData);

app.listen(3000, () => console.log('Running on localhost:3000'));
