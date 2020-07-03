const express = require('express');
const http = require('http'),
  httpProxy = require('http-proxy');
const path = require('path');

const proxy = httpProxy.createProxyServer({});
const app = express();

const port = 3000;

const dist = path.resolve(__dirname, '..', 'client', 'dist');

const bestNearby = 'http://localhost:3003';
const reviews = 'http://localhost:3004';
const main = 'http://localhost:3007';
const experiences = 'http://localhost:3636';


app.use('/:attractionId', express.static(dist));

// nearbyattractions component
app.get('/:attractionId/bestNearby/bundle.js', (req, res) => {
    proxy.web(req, res, {target: bestNearby});
  });
  
app.get('/:attractionId/api/nearbyattractions', (req, res) => {
  proxy.web(req, res, {target: bestNearby});
});

// reviews component -- returning an error GET http://localhost:3000/025/undefined 404 (Not Found)
  // but looks to have loaded completely
app.get('/:productId/reviewsModule/bundle.js', (req, res) => {
    proxy.web(req, res, {target: reviews});
});

app.get('/:productId/api/reviews', (req, res) => {
    proxy.web(req, res, {target: reviews});
});

app.patch('/:productId/api/reviews/:reviewId', (req, res) => {
    proxy.web(req, res, {target: reviews});
});

app.patch('/:productId/api/reviews/:reviewId/:imageId', (req, res) => {
    proxy.web(req, res, {target: reviews});
});

// main component
app.get('/:id/imageMain/bundle.js', (req, res) => {
    proxy.web(req, res, {target: main});
});
app.get('/:id/api/carousels', (req, res) => {
    proxy.web(req, res, {target: main});
});
app.patch('/:imgId/api/carousels/helpful', (req, res) => {
    proxy.web(req, res, {target: main});
});
app.patch('/:imgId/api/carousels/reported', (req, res) => {
    proxy.web(req, res, {target: main});
});

// experiences component
app.get('/:id/exp/bundle.js', (req, res) => {
    proxy.web(req, res, {target: experiences});
});
app.get('/:id/fonts', (req, res) => {
    proxy.web(req, res, {target: experiences});
});

app.get('/:id/exp/api', (req, res) => {
    proxy.web(req, res, {target: experiences});
});

app.listen(port, () => console.log('proxy server is listening on port: ', port))

module.exports = app;
