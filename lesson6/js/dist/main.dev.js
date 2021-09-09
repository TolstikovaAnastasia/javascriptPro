"use strict";

var API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
var app = new Vue({
  el: "#app",
  methods: {
    getJson: function getJson(url) {
      return fetch(url).then(function (result) {
        return result.json();
      })["catch"](function (error) {
        console.log(error);
      });
    }
  }
});