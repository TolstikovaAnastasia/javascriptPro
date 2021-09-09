"use strict";

Vue.component('basket', {
  data: function data() {
    return {
      image: 'img/notebook.jpg',
      basketUrl: '/getBasket.json',
      basketItems: [],
      showBasket: false
    };
  },
  methods: {
    addToCart: function addToCart(product) {
      var _this = this;

      this.$parent.getJson("".concat(API, "/addToBasket.json")).then(function (data) {
        if (data.result === 1) {
          var find = _this.basketItems.find(function (element) {
            return element.id_product === product.id_product;
          });

          if (find) {
            find.quantity++;
          } else {
            var prod = Object.assign({
              quantity: 1
            }, product);

            _this.basketItems.push(prod);
          }
        }
      });
    },
    remove: function remove(item) {
      var _this2 = this;

      this.$parent.getJson("".concat(API, "/deleteFromBasket.json")).then(function (data) {
        if (data.result === 1) {
          if (item.quantity > 1) {
            item.quantity--;
          } else {
            _this2.basketItems.splice(_this2.basketItems.indexOf(item), 1);
          }
        }
      });
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.$parent.getJson("".concat(API + this.basketUrl)).then(function (data) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data.contents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var element = _step.value;

          _this3.basketItems.push(element);
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
    });
  },
  template: "<div>\n                    <button class=\"btn-cart\" type=\"button\" @click=\"showBasket = !showBasket\">\u041A\u043E\u0440\u0437\u0438\u043D\u0430</button>\n                    <div class=\"cart-block\" v-show=\"showBasket\">\n                        <basket-item class=\"basket-item\" \n                        v-for=\"item of basketItems\" \n                        :key=\"item.id_product\"\n                        :basket-item=\"item\" \n                        :img=\"image\"\n                        @remove=\"remove\">\n                        </basket-item>\n                    </div>\n                </div>"
});
Vue.component('basket-item', {
  props: ['basketItem', 'image'],
  template: "<div class=\"basket-item\">\n                    <div class=\"basket-elem\">\n                        <div class=\"product-bask\">\n                            <img :src=\"image\" class =\"product-img\" alt=\"productImg\">\n                            <div class=\"product-desc\">\n                                <div class=\"product-title\">{{ basketItem.product_name }}</div>\n                                <div class=\"product-quantity\">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E: {{ basketItem.quantity }}</div>\n                                <div class=\"product-price\">\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C: {{ basketItem.price }} $</div>\n                            </div>\n                        </div>\n                        <div class=\"totalProd-price\">\u0418\u0442\u043E\u0433\u043E: {{ basketItem.quantity*basketItem.price }} $</div>\n                    </div>\n                    <div class=\"right-block\">\n                        <button class=\"del-btn\" @click=\"$emit('remove', basketItem)\">&times;</button>\n                    </div>\n                </div>"
});