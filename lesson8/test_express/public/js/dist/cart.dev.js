"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

var Cart =
/*#__PURE__*/
function () {
  function Cart() {
    var _this = this;

    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.cartItem';

    _classCallCheck(this, Cart);

    this.container = container;
    this.contents = [];

    this._addToCart().then(function (data) {
      _this.goods = _toConsumableArray(data.contents);

      _this.render();
    });
  }

  _createClass(Cart, [{
    key: "_addToCart",
    value: function _addToCart() {
      return fetch("".concat(API, "/getBasket.json")).then(function (result) {
        return result.json();
      })["catch"](function (error) {
        console.log(error);
      });
    }
  }, {
    key: "removeFromCart",
    value: function removeFromCart() {}
  }, {
    key: "render",
    value: function render() {
      var elem = document.querySelector(this.container);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.goods[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var product = _step.value;
          var item = new CartItem(product);
          elem.insertAdjacentHTML("beforeend", item.render());
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

  return Cart;
}();

;

var CartItem =
/*#__PURE__*/
function () {
  function CartItem(product) {
    var image = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "img/notebook.jpg";

    _classCallCheck(this, CartItem);

    this.title = product.product_name;
    this.id = product.id_product;
    this.price = product.price;
    this.quantity = product.quantity;
    this.image = image;
  }

  _createClass(CartItem, [{
    key: "render",
    value: function render() {
      return "<div class=\"product-item\" data-id=\"".concat(this.id, "\">\n            <img class=\"product-img\" src=\"").concat(this.image, "\" alt=\"productImg\">\n            <div class=\"desc\">\n                <h3 class=\"product-title\">").concat(this.title, "</h3>\n                <p class=\"product-price\">").concat(this.price, " $</p>\n                <p class=\"product-quantity\">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E: ").concat(this.quantity, "</p>\n            </div>\n        </div>");
    }
  }]);

  return CartItem;
}();

;
var basket = new Cart();