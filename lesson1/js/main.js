document.querySelector('.btn-cart').addEventListener('click', (e) => {
    e.target.style.backgroundColor = 'black';
    e.target.style.color = 'white';
})

const products = [
    {id: 1, title: 'Notebook', image: 'img/notebook.jpg', price: 2000},
    {id: 2, title: 'Mouse', image: 'img/mouse.jpg', price: 20},
    {id: 3, title: 'Keyboard', image: 'img/keyboard.jpg', price: 200},
    {id: 4, title: 'Gamepad', image: 'img/gamepad.jpg', price: 50},
];

const renderProduct = (item) =>
    `<div class="product-item">
        <h3 class="product-title">${item.title}</h3>
        <img class="product-img" src="${item.image}" alt="productImg">
        <p class="product-price">${item.price}$</p>
        <button class="buy-btn">Купить</button>
    </div>`;

/* запятая выводилась после каждого элемента массива в связи
* с тем, что мы записываем масси в блок, а в блоке после
* каждого элемента ставится запятая
*/

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join(' ');
};

renderPage(products);