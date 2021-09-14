"use strict";

var express = require('express');

var fs = require('fs');

var app = express();

var router = require('./basketRouter');

app.use(express.json());
app.use('/', express["static"]('public'));
app.use('/api/basket', router);
app.get('/api/getProducts', function (req, res) {
  fs.readFile('server/json/getProducts.json', 'utf-8', function (err, data) {
    if (err) {
      res.sendStatus(404, JSON.stringify({
        result: 0,
        text: err
      }));
    } else {
      res.send(data);
    }
  });
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  return console.log("Listen on port ".concat(port, "..."));
});