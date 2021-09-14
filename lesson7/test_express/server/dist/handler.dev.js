"use strict";

var basket = require('./basket');

var fs = require('fs');

var actions = {
  add: basket.add,
  change: basket.change,
  remove: basket.remove
};

var handler = function handler(req, res, action, file) {
  fs.readFile(file, 'utf-8', function (err, data) {
    if (err) {
      res.sendStatus(404, JSON.stringify({
        result: 0,
        text: err
      }));
    } else {
      var newBasket = actions[action](JSON.parse(data), req);
      fs.writeFile(file, newBasket, function (err) {
        if (err) {
          res.sendStatus(404, JSON.stringify({
            result: 0,
            text: err
          }));
        } else {
          res.send(JSON.stringify({
            result: 1
          }));
        }
      });
    }
  });
};

module.exports = handler;