const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class Cart {
    constructor(container = '.cartItem') {
        this.container = container;
        this.contents = [];
        this._addToCart()
            .then(data => {
                this.goods = [...data.contents];
                this.render();
            });
    }

    _addToCart(){
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }   

    removeFromCart(){}
    
    render() {
        const elem = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new CartItem(product);
            elem.insertAdjacentHTML("beforeend", item.render());
        }
    }
};

class CartItem {
    constructor(product, image="img/notebook.jpg") {
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        this.quantity = product.quantity;
        this.image = image;
    }

    render(){
        return `<div class="product-item" data-id="${this.id}">
            <img class="product-img" src="${this.image}" alt="productImg">
            <div class="desc">
                <h3 class="product-title">${this.title}</h3>
                <p class="product-price">${this.price} $</p>
                <p class="product-quantity">Количество: ${this.quantity}</p>
            </div>
        </div>`;
    }
};

let basket = new Cart();