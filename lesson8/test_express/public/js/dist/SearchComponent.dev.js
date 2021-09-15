"use strict";

Vue.component('search-form', {
  data: {
    userSearch: ''
  },
  template: "\n                <form action=\"#\" class=\"search-form\" @submit.prevent=\"$parent.$refs.products.filter(userSearch)\">\n                    <input class=\"search-input\" type=\"text\" v-model=\"userSearch\">\n                    <button class=\"search-button\" type=\"submit\">\n                        <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\n                    </button>\n                </form>\n    "
});