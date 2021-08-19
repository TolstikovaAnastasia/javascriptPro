"use strict";

document.querySelector('.btn-cart').addEventListener('click', function (e) {
  e.target.style.backgroundColor = 'black';
  e.target.style.color = 'white';
});
var products = [{
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

var renderProduct = function renderProduct(item) {
  return "<div class=\"product-item\">\n        <h3 class=\"product-title\">".concat(item.title, "</h3>\n        <img class=\"product-img\" src=\"").concat(item.image, "\" alt=\"productImg\">\n        <p class=\"product-price\">").concat(item.price, "$</p>\n        <button class=\"buy-btn\">\u041A\u0443\u043F\u0438\u0442\u044C</button>\n    </div>");
};
/* запятая выводилась после каждого элемента массива в связи
* с тем, что мы записываем масси в блок, а в блоке после
* каждого элемента ставится запятая
*/


var renderPage = function renderPage(list) {
  var productsList = list.map(function (item) {
    return renderProduct(item);
  });
  console.log(productsList);
  document.querySelector('.products').innerHTML = productsList.join(' ');
};

renderPage(products);