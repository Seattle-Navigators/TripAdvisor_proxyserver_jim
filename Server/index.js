const express = require('express');
const http = require('http'),
  httpProxy = require('http-proxy');
const path = require('path');

const proxy = httpProxy.createProxyServer({});
const app = express();

const port = 3000;

const dist = path.resolve(__dirname, '..', 'client', 'dist');

const bestNearby = 'http://localhost:3003';

app.use('/:attractionId', express.static(dist));

app.get('/:attractionId/bestNearby/bundle.js', (req, res) => {
    proxy.web(req, res, {target: bestNearby});
  });
  
  app.get('/:attractionId/api/nearbyattractions', (req, res) => {
    proxy.web(req, res, {target: bestNearby});
  });

app.listen(port, () => console.log('proxy server is listening on port: ', port))

module.exports = app;
