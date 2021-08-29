const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render();
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    totalPrice() {
       return this.allProducts.reduce((sum, item) => sum += item.price, 0);
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
                //this.allProducts.push(productObj);
            block.insertAdjacentHTML("beforeend", productObj.render());
        }
    }
}

class ProductItem {
    constructor(product, image="img/notebook.jpg") {
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        this.image = image;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
            <img class="product-img" src="${this.image}" alt="productImg">    
            <div class="desc">
                <h3 class="product-title">${this.title}</h3>
                <p class="product-price">${this.price} $</p>
                <button class="buy-btn">Купить</button>
            </div>
        </div>`;
    }
}

let list = new ProductsList();
console.log(list.allProducts);