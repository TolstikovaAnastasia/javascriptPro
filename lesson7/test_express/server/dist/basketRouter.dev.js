"use strict";

var express = require('express');

var fs = require('fs');

var router = express.Router();

var handler = require('./handler');

router.get('/', function (req, res) {
  fs.readFile('server/json/getBasket.json', 'utf-8', function (err, data) {
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
router.post('/', function (req, res) {
  handler(req, res, 'add', 'server/json/getBasket.json');
});
router.put('/:id', function (req, res) {
  handler(req, res, 'change', 'server/json/getBasket.json');
});
router["delete"]('/:id', function (req, res) {
  handler(req, res, 'remove', 'server/json/getBasket.json');
});
module.exports = router;