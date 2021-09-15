"use strict";

var add = function add(basket, req) {
  basket.contents.push(req.body);
  return JSON.stringify(basket, null, 4);
};

var change = function change(basket, req) {
  var find = basket.contents.find(function (element) {
    return element.id_product === +req.params.id;
  });
  find.quantity += req.body.quantity;
  return JSON.stringify(basket, null, 4);
};

var remove = function remove(basket, req) {
  var find = basket.contents.find(function (element) {
    return +element.id_product === req.body.id_product;
  });
  var basketContent = basket.contents;
  basketContent.splice(basketContent.indexOf(find), 1);
  return JSON.stringify(basket, null, 4);
};

module.exports = {
  add: add,
  change: change,
  remove: remove
};