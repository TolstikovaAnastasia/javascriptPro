"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

document.querySelector('.btn-cart').addEventListener('click', function (e) {
  e.target.style.backgroundColor = 'black';
  e.target.style.color = 'white';
});

var Cart =
/*#__PURE__*/
function () {
  function Cart() {
    _classCallCheck(this, Cart);
  }

  _createClass(Cart, [{
    key: "addToCart",
    value: function addToCart() {}
  }, {
    key: "removeFromCart",
    value: function removeFromCart() {}
  }]);

  return Cart;
}();

;

var CartItem =
/*#__PURE__*/
function () {
  function CartItem() {
    _classCallCheck(this, CartItem);
  }

  _createClass(CartItem, [{
    key: "addItem",
    value: function addItem() {}
  }, {
    key: "removeItem",
    value: function removeItem() {}
  }]);

  return CartItem;
}();

;

var ProductList =
/*#__PURE__*/
function () {
  function ProductList() {
    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.products';

    _classCallCheck(this, ProductList);

    this.container = container;
    this.goods = [];

    this._fetchProducts();

    this.render();
    this.totalPrice();
  }

  _createClass(ProductList, [{
    key: "_fetchProducts",
    value: function _fetchProducts() {
      this.goods = [{
        id: 1,
        title: 'Notebook',
        image: 'img/notebook.jpg',
        price: 2000
      }, {
        id: 2,
        title: 'Mouse',
        image: 'img/mouse.jpg',
        price: 20
      }, {
        id: 3,
        title: 'Keyboard',
        image: 'img/keyboard.jpg',
        price: 200
      }, {
        id: 4,
        title: 'Gamepad',
        image: 'img/gamepad.jpg',
        price: 50
      }];
    }
  }, {
    key: "totalPrice",
    value: function totalPrice() {
      this.goods.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.price;
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
          var item = new ProductItem(product);
          block.insertAdjacentHTML("beforeend", item.render());
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

  return ProductList;
}();

var ProductItem =
/*#__PURE__*/
function () {
  function ProductItem(product) {
    _classCallCheck(this, ProductItem);

    this.title = product.title;
    this.id = product.id;
    this.price = product.price;
    this.image = product.image;
  }

  _createClass(ProductItem, [{
    key: "render",
    value: function render() {
      return "<div class=\"product-item\">\n            <h3 class=\"product-title\">".concat(this.title, "</h3>\n            <img class=\"product-img\" src=\"").concat(this.image, "\" alt=\"productImg\">\n            <p class=\"product-price\">").concat(this.price, "$</p>\n            <button class=\"buy-btn\">\u041A\u0443\u043F\u0438\u0442\u044C</button>\n        </div>");
    }
  }]);

  return ProductItem;
}();

var list = new ProductList();
console.log(list.totalPrice());