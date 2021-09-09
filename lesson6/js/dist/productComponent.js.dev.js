"use strict";

Vue.component('products', {
  data: function data() {
    return {
      catalogUrl: '/catalogData.json',
      products: [],
      filtered: [],
      image: 'img/notebook.jpg'
    };
  },
  methods: {
    filter: function filter(userSearch) {
      var regExp = new RegExp(userSearch, 'i');
      this.filtered = this.products.filter(function (item) {
        return regExp.test(item.title);
      });
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$parent.getJson("".concat(API + this.catalogUrl)).then(function (data) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var product = _step.value;

          _this.products.push(product);

          _this.filtered.push(product);
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
    this.$parent.getJson("getProducts.json").then(function (data) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var product = _step2.value;

          _this.products.push(product);

          _this.filtered.push(product);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    });
  },
  template: "<div class=\"products\">\n                    <product v-for=\"product of filtered\" :key=\"product.id\" :img=\"image\" :product=\"product\"></product>\n                </div>"
});
Vue.component('product', {
  props: ['product', 'image'],
  template: "<div class=\"product-item\">\n                    <img :src=\"image\" alt=\"productImg\">\n                    <div class=\"desc\">\n                        <h3>{{product.title}}</h3>\n                        <p>{{product.price}}</p>\n                        <button class=\"buy-btn\" @click=\"$root.$refs.basket.addToCart(product)\">\u041A\u0443\u043F\u0438\u0442\u044C</button>\n                    </div>\n                </div>"
});