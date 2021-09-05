const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class List {
    constructor(url, container, list = list2) {
        this.url = url;
        this.container = container;
        this.list = list;
        this.goods = [];
        this.allProducts = [];
        this.filtered = [];
        this._init();
    }

    getJson(url){
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    getProducts(data){
        this.goods = [...data];
        this.render();
    }

    totalPrice() {
       return this.allProducts.reduce((sum, item) => sum += item.price, 0);
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new this.list[this.constructor.name](product);
            console.log(productObj);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
    filter(value){
        const regexp = new RegExp(value, 'i');
        this.filtered = this.allProducts.filter(product => regexp.test(product.title));
        this.allProducts.forEach(item => {
            const block = document.querySelector(`.product-item[data-id="${item.id}"]`);
            if(!this.filtered.includes(item)){
                block.classList.add('invisible');
            } else {
                block.classList.remove('invisible');
            }
        })
    }
    _init(){
        return false
    }
}

class ProductsList extends List {
    constructor(basket, container = '.products', url= "/catalogData.json"){
        super(url, container);
        this.basket = basket;
        this.getJson()
            .then(data => this.getProducts(data));
    }

    _init(){
        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('buy-btn')){
                this.basket.addToCart(e.target);
            }
        });
        document.querySelector('.search-form').addEventListener('submit', e => {
            e.preventDefault();
            this.filter(document.querySelector('.search-input').value)
        })
    }
}

class ProductItem {
    constructor(item, image="img/notebook.jpg") {
        this.title = item.product_name;
        this.id = item.id_product;
        this.price = item.price;
        this.image = image;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
            <img class="product-img" src="${this.image}" alt="productImg">    
            <div class="desc">
                <h3 class="product-title">${this.title}</h3>
                <p class="product-price">${this.price} $</p>
                <button class="buy-btn" data-id="${this.id}" data-name="${this.title}" data-price="${this.price}">Купить</button>
            </div>
        </div>`
    }
}

class Cart extends List {
    constructor(container = ".cart-block", url = "/getBasket.json") {
        super(url, container);
        this.getJson()
            .then(data => {
                this.getProducts(data.contents);
            });
    }

    addToCart(productEl){
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result === 1){
                    let productId = +productEl.dataset['id'];
                    let find = this.allProducts.find(product => product.id === productId);
                    if(find){
                        find.quantity++;
                        this._updateCart(find);
                    } else {
                        let product = {
                            id: productId,
                            price: +productEl.dataset['price'],
                            title: productEl.dataset['name'],
                            quantity: 1
                        };
                        this.goods = [product];
                        this.render();
                    }
                } else {
                    alert('error');
                }
            })
    }   

    removeFromCart(productEl){
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result === 1){
                    let productId = +productEl.dataset['id'];
                    let find = this.allProducts.find(product => product.id === productId);
                    if(find.quantity > 1){
                        find.quantity--;
                        this._updateCart(find);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cartItem[data-id="${productId}"]`).remove();
                    }
                } else {
                    alert('error');
                }
            })
    }

    _updateCart(product){
        let block = document.querySelector(`.cartItem[data-id="${product.id}"]`);
        block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
        block.querySelector('.totalProd-price').textContent = `Итого: ${product.quantity*product.price} $`;
    }
    
    _init() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e => {
           if(e.target.classList.contains('del-btn')){
               this.removeFromCart(e.target);
           }
        })
    }
}

class CartItem extends ProductItem {
    constructor(item, image="img/notebook.jpg") {
        super(item, image);
        this.quantity = item.quantity;
    }

    render(){
        return `<div class="cartItem" data-id="${this.id}">
                    <div class="cart-elem">
                        <div class="prod-cart">
                            <img class="product-img" src="${this.image}" alt="productImg">
                            <div class="desc">
                                <h3 class="product-title">${this.title}</h3>
                                <p class="product-price">${this.price} $</p>
                                <p class="product-quantity">Количество: ${this.quantity}</p>
                            </div>
                        </div>
                        <p class="totalProd-price">Итого: ${this.quantity*this.price} $</p>
                    </div>
                    <div class="cart-right">
                        <button class="del-btn" data-id="${this.id}">&times;</button>
                    </div>
                </div>`
    }
}

const list2 = {
    ProductsList: ProductItem,
    Cart: CartItem
};

let basket = new Cart();
let products = new ProductsList(basket);
products.getJson(`getProducts.json`).then(data => products.getProducts(data));