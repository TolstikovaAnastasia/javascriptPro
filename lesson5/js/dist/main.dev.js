"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

var List =
/*#__PURE__*/
function () {
  function List(url, container) {
    var list = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : list2;

    _classCallCheck(this, List);

    this.url = url;
    this.container = container;
    this.list = list;
    this.goods = [];
    this.allProducts = [];
    this.filtered = [];

    this._init();
  }

  _createClass(List, [{
    key: "getJson",
    value: function getJson(url) {
      return fetch(url ? url : "".concat(API + this.url)).then(function (result) {
        return result.json();
      })["catch"](function (error) {
        console.log(error);
      });
    }
  }, {
    key: "getProducts",
    value: function getProducts(data) {
      this.goods = _toConsumableArray(data);
      this.render();
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
          var productObj = new this.list[this.constructor.name](product);
          console.log(productObj);
          this.allProducts.push(productObj);
          block.insertAdjacentHTML('beforeend', productObj.render());
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
  }, {
    key: "filter",
    value: function filter(value) {
      var _this = this;

      var regexp = new RegExp(value, 'i');
      this.filtered = this.allProducts.filter(function (product) {
        return regexp.test(product.title);
      });
      this.allProducts.forEach(function (item) {
        var block = document.querySelector(".product-item[data-id=\"".concat(item.id, "\"]"));

        if (!_this.filtered.includes(item)) {
          block.classList.add('invisible');
        } else {
          block.classList.remove('invisible');
        }
      });
    }
  }, {
    key: "_init",
    value: function _init() {
      return false;
    }
  }]);

  return List;
}();

var ProductsList =
/*#__PURE__*/
function (_List) {
  _inherits(ProductsList, _List);

  function ProductsList(basket) {
    var _this2;

    var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.products';
    var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "/catalogData.json";

    _classCallCheck(this, ProductsList);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ProductsList).call(this, url, container));
    _this2.basket = basket;

    _this2.getJson().then(function (data) {
      return _this2.getProducts(data);
    });

    return _this2;
  }

  _createClass(ProductsList, [{
    key: "_init",
    value: function _init() {
      var _this3 = this;

      document.querySelector(this.container).addEventListener('click', function (e) {
        if (e.target.classList.contains('buy-btn')) {
          _this3.basket.addToCart(e.target);
        }
      });
      document.querySelector('.search-form').addEventListener('submit', function (e) {
        e.preventDefault();

        _this3.filter(document.querySelector('.search-input').value);
      });
    }
  }]);

  return ProductsList;
}(List);

var ProductItem =
/*#__PURE__*/
function () {
  function ProductItem(item) {
    var image = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "img/notebook.jpg";

    _classCallCheck(this, ProductItem);

    this.title = item.product_name;
    this.id = item.id_product;
    this.price = item.price;
    this.image = image;
  }

  _createClass(ProductItem, [{
    key: "render",
    value: function render() {
      return "<div class=\"product-item\" data-id=\"".concat(this.id, "\">\n            <img class=\"product-img\" src=\"").concat(this.image, "\" alt=\"productImg\">    \n            <div class=\"desc\">\n                <h3 class=\"product-title\">").concat(this.title, "</h3>\n                <p class=\"product-price\">").concat(this.price, " $</p>\n                <button class=\"buy-btn\" data-id=\"").concat(this.id, "\" data-name=\"").concat(this.title, "\" data-price=\"").concat(this.price, "\">\u041A\u0443\u043F\u0438\u0442\u044C</button>\n            </div>\n        </div>");
    }
  }]);

  return ProductItem;
}();

var Cart =
/*#__PURE__*/
function (_List2) {
  _inherits(Cart, _List2);

  function Cart() {
    var _this4;

    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ".cart-block";
    var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/getBasket.json";

    _classCallCheck(this, Cart);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Cart).call(this, url, container));

    _this4.getJson().then(function (data) {
      _this4.getProducts(data.contents);
    });

    return _this4;
  }

  _createClass(Cart, [{
    key: "addToCart",
    value: function addToCart(productEl) {
      var _this5 = this;

      this.getJson("".concat(API, "/addToBasket.json")).then(function (data) {
        if (data.result === 1) {
          var productId = +productEl.dataset['id'];

          var find = _this5.allProducts.find(function (product) {
            return product.id === productId;
          });

          if (find) {
            find.quantity++;

            _this5._updateCart(find);
          } else {
            var product = {
              id: productId,
              price: +productEl.dataset['price'],
              title: productEl.dataset['name'],
              quantity: 1
            };
            _this5.goods = [product];

            _this5.render();
          }
        } else {
          alert('error');
        }
      });
    }
  }, {
    key: "removeFromCart",
    value: function removeFromCart(productEl) {
      var _this6 = this;

      this.getJson("".concat(API, "/deleteFromBasket.json")).then(function (data) {
        if (data.result === 1) {
          var productId = +productEl.dataset['id'];

          var find = _this6.allProducts.find(function (product) {
            return product.id === productId;
          });

          if (find.quantity > 1) {
            find.quantity--;

            _this6._updateCart(find);
          } else {
            _this6.allProducts.splice(_this6.allProducts.indexOf(find), 1);

            document.querySelector(".cartItem[data-id=\"".concat(productId, "\"]")).remove();
          }
        } else {
          alert('error');
        }
      });
    }
  }, {
    key: "_updateCart",
    value: function _updateCart(product) {
      var block = document.querySelector(".cartItem[data-id=\"".concat(product.id, "\"]"));
      block.querySelector('.product-quantity').textContent = "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E: ".concat(product.quantity);
      block.querySelector('.totalProd-price').textContent = "\u0418\u0442\u043E\u0433\u043E: ".concat(product.quantity * product.price, " $");
    }
  }, {
    key: "_init",
    value: function _init() {
      var _this7 = this;

      document.querySelector('.btn-cart').addEventListener('click', function () {
        document.querySelector(_this7.container).classList.toggle('invisible');
      });
      document.querySelector(this.container).addEventListener('click', function (e) {
        if (e.target.classList.contains('del-btn')) {
          _this7.removeFromCart(e.target);
        }
      });
    }
  }]);

  return Cart;
}(List);

var CartItem =
/*#__PURE__*/
function (_ProductItem) {
  _inherits(CartItem, _ProductItem);

  function CartItem(item) {
    var _this8;

    var image = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "img/notebook.jpg";

    _classCallCheck(this, CartItem);

    _this8 = _possibleConstructorReturn(this, _getPrototypeOf(CartItem).call(this, item, image));
    _this8.quantity = item.quantity;
    return _this8;
  }

  _createClass(CartItem, [{
    key: "render",
    value: function render() {
      return "<div class=\"cartItem\" data-id=\"".concat(this.id, "\">\n                    <div class=\"cart-elem\">\n                        <div class=\"prod-cart\">\n                            <img class=\"product-img\" src=\"").concat(this.image, "\" alt=\"productImg\">\n                            <div class=\"desc\">\n                                <h3 class=\"product-title\">").concat(this.title, "</h3>\n                                <p class=\"product-price\">").concat(this.price, " $</p>\n                                <p class=\"product-quantity\">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E: ").concat(this.quantity, "</p>\n                            </div>\n                        </div>\n                        <p class=\"totalProd-price\">\u0418\u0442\u043E\u0433\u043E: ").concat(this.quantity * this.price, " $</p>\n                    </div>\n                    <div class=\"cart-right\">\n                        <button class=\"del-btn\" data-id=\"").concat(this.id, "\">&times;</button>\n                    </div>\n                </div>");
    }
  }]);

  return CartItem;
}(ProductItem);

var list2 = {
  ProductsList: ProductItem,
  Cart: CartItem
};
var basket = new Cart();
var products = new ProductsList(basket);
products.getJson("getProducts.json").then(function (data) {
  return products.getProducts(data);
});