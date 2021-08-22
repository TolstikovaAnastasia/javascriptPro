document.querySelector('.btn-cart').addEventListener('click', (e) => {
    e.target.style.backgroundColor = 'black';
    e.target.style.color = 'white';
})

class Cart {
    addToCart(){}
    removeFromCart(){}
};

class CartItem {
    addItem(){}
    removeItem(){}
};

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();
        this.totalPrice();
    }

    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', image: 'img/notebook.jpg', price: 2000},
            {id: 2, title: 'Mouse', image: 'img/mouse.jpg', price: 20},
            {id: 3, title: 'Keyboard', image: 'img/keyboard.jpg', price: 200},
            {id: 4, title: 'Gamepad', image: 'img/gamepad.jpg', price: 50},
        ];
    }

    totalPrice() {
        this.goods.reduce(
            (previousValue, currentValue) => previousValue + currentValue.price, 0)
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }
}

class ProductItem {
    constructor(product) {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.image = product.image;
    }

    render() {
        return `<div class="product-item">
            <h3 class="product-title">${this.title}</h3>
            <img class="product-img" src="${this.image}" alt="productImg">
            <p class="product-price">${this.price}$</p>
            <button class="buy-btn">Купить</button>
        </div>`;
    }
}

let list = new ProductList();

console.log(list.totalPrice());