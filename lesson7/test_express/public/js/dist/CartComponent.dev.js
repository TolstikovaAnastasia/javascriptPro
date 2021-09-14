"use strict";

Vue.component('basket', {
  props: ['basketItems', 'image', 'visibility'],
  template: "<div class=\"cart-block\" v-show=\"visibility\">\n                    <basket-item v-for=\"item of basketItems\" :key=\"item.id\" :img=\"image\" :bsket-item=\"item\"></basket-item>\n                </div>"
});
Vue.component('basket-item', {
  props: ['basket-item', 'image'],
  template: "<div class=\"basket-item\">\n                    <div class=\"product-bask\">\n                        <img :src=\"image\" alt=\"productImg\">\n                        <div class=\"product-desc\">\n                            <div class=\"product-title\">{{ basketItem.title }}</div>\n                            <div class=\"product-quantity\">{{ basketItem.quantity }}</div>\n                            <div class=\"product-price\">{{ basketItem.price }}</div>\n                        </div>\n                    </div>\n                    <div class=\"right-block\">\n                        <div class=\"product.price\">{{ basketItem.quantity*basketItem.price }}</div>\n                        <button class=\"del-btn\" @ click=\"$root.remove(basketItem)\">&times;</button>\n                    </div>\n                </div>"
});