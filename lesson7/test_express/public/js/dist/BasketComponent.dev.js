"use strict";

Vue.component('basket', {
  data: function data() {
    return {
      basketItems: [],
      showBasket: false
    };
  },
  methods: {
    addToCart: function addToCart(item) {
      var _this = this;

      var find = this.basketItems.find(function (element) {
        return element.id_product === item.id_product;
      });

      if (find) {
        this.$parent.putJson("/api/basket/".concat(find.id_product), {
          quantity: 1
        }).then(function (data) {
          if (data.result === 1) {
            find.quantity++;
          }
        });
      } else {
        var prod = Object.assign({
          quantity: 1
        }, item);
        this.$parent.postJson("/api/basket", prod).then(function (data) {
          if (data.result === 1) {
            _this.basketItems.push(prod);
          }
        });
      }
    },
    remove: function remove(item) {
      var _this2 = this;

      var find = this.basketItems.find(function (element) {
        return element.id_product === item.id_product;
      });

      if (find) {
        this.$parent.putJson("/api/basket/".concat(find.id_product), {
          quantity: 1
        }).then(function (data) {
          if (data.result === 1) {
            find.quantity--;
          }
        });
      } else {
        var prod = Object.assign({
          quantity: 1
        }, item);
        this.$parent.deleteJson("/api/basket", prod).then(function (data) {
          if (data.result === 1) {
            _this2.basketItems.splice(prod);
          }
        });
      }
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.$parent.getJson("/api/basket").then(function (data) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data.contents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          _this3.basketItems.push(item);
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
  template: "<div>\n                    <button class=\"btn-cart\" type=\"button\" @click=\"showBasket = !showBasket\">\u041A\u043E\u0440\u0437\u0438\u043D\u0430</button>\n                    <div class=\"cart-block\" v-show=\"showBasket\">\n                        <p v-if=\"!basketItems.length\">\u041A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u0443\u0441\u0442\u0430</p>\n                        <basket-item class=\"basket-item\" \n                        v-for=\"item of basketItems\" \n                        :key=\"item.id_product\"\n                        :basket-item=\"item\" \n                        :img=\"item.image\"\n                        @remove=\"remove\">\n                        </basket-item>\n                    </div>\n                </div>"
});
Vue.component('basket-item', {
  props: ['basketItem', 'img'],
  template: "<div class=\"basket-item\">\n                    <div class=\"basket-elem\">\n                        <div class=\"product-bask\">\n                            <img :src=\"img\" class =\"product-img-mini\" alt=\"productImg\">\n                            <div class=\"product-desc\">\n                                <div class=\"product-title\">{{ basketItem.product_name }}</div>\n                                <div class=\"product-quantity\">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E: {{ basketItem.quantity }}</div>\n                                <div class=\"product-price\">\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C: {{ basketItem.price }} $</div>\n                            </div>\n                        </div>\n                        <div class=\"totalProd-price\">\u0418\u0442\u043E\u0433\u043E: {{ basketItem.quantity*basketItem.price }} $</div>\n                    </div>\n                    <div class=\"right-block\">\n                        <button class=\"del-btn\" @click=\"$emit('remove', basketItem)\">&times;</button>\n                    </div>\n                </div>"
});