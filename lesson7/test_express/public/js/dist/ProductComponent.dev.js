"use strict";

Vue.component('products', {
  data: function data() {
    return {
      catalogUrl: '/catalogData.json',
      products: [],
      filtered: []
    };
  },
  methods: {
    filter: function filter(userSearch) {
      var regexp = new RegExp(userSearch, 'i');
      this.filtered = this.products.filter(function (element) {
        return regexp.test(element.product_name);
      });
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$parent.getJson("/api/getProducts").then(function (data) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          _this.$data.products.push(item);

          _this.$data.filtered.push(item);
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
  template: "<div class=\"products\">\n                    <product v-for=\"item of filtered\" :key=\"item.id_product\" :img=\"item.image\" :product=\"item\" @add-product=\"$parent.$refs.basket.addToCart\"></product>\n                </div>"
});
Vue.component('product', {
  props: ['product', 'img'],
  template: "<div class=\"product-item\">\n                    <img :src=\"img\" class=\"product-img\" alt=\"productImg\">\n                    <div class=\"desc\">\n                        <h3 class=\"product-title\">{{product.product_name}}</h3>\n                        <p class=\"product-desc\">{{product.description}}</p>\n                        <p class=\"product-price\">{{product.price}} $</p>\n                    </div>\n                    <button class=\"buy-btn\" @click=\"$parent.$parent.$refs.basket.addToCart(product)\">\u041A\u0443\u043F\u0438\u0442\u044C</button>\n                </div>"
});