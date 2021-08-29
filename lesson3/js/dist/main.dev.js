"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

var ProductsList =
/*#__PURE__*/
function () {
  function ProductsList() {
    var _this = this;

    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.products';

    _classCallCheck(this, ProductsList);

    this.container = container;
    this.goods = [];

    this._getProducts().then(function (data) {
      _this.goods = _toConsumableArray(data);

      _this.render();
    });
  }

  _createClass(ProductsList, [{
    key: "_getProducts",
    value: function _getProducts() {
      return fetch("".concat(API, "/catalogData.json")).then(function (result) {
        return result.json();
      })["catch"](function (error) {
        console.log(error);
      });
    }
  }, {
    key: "totalPrice",
    value: function totalPrice() {
      return this.allProducts.reduce(function (sum, item) {
        return sum += item.price;
      }, 0);
    }
  }, {
    key: "render",
    value: function render() {
      var block = document.querySelector(this.container);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.goods[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var product = _step.value;
          var productObj = new ProductItem(product); //this.allProducts.push(productObj);

          block.insertAdjacentHTML("beforeend", productObj.render());
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return ProductsList;
}();

var ProductItem =
/*#__PURE__*/
function () {
  function ProductItem(product) {
    var image = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "img/notebook.jpg";

    _classCallCheck(this, ProductItem);

    this.title = product.product_name;
    this.id = product.id_product;
    this.price = product.price;
    this.image = image;
  }

  _createClass(ProductItem, [{
    key: "render",
    value: function render() {
      return "<div class=\"product-item\" data-id=\"".concat(this.id, "\">\n            <img class=\"product-img\" src=\"").concat(this.image, "\" alt=\"productImg\">    \n            <div class=\"desc\">\n                <h3 class=\"product-title\">").concat(this.title, "</h3>\n                <p class=\"product-price\">").concat(this.price, " $</p>\n                <button class=\"buy-btn\">\u041A\u0443\u043F\u0438\u0442\u044C</button>\n            </div>\n        </div>");
    }
  }]);

  return ProductItem;
}();

var list = new ProductsList();
console.log(list.allProducts);