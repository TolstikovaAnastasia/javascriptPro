Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            image: 'img/notebook.jpg',
        }
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(element => regexp.test(element.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let element of data) {
                    this.products.push(element);
                    this.filtered.push(element);
                }
            });
        this.$parent.getJson(`getProducts.json`)
            .then(data => {
                for (let element of data) {
                    this.products.push(element);
                    this.filtered.push(element);
                }
            })
    },
    template: `<div class="products">
                    <product v-for="item of filtered" :key="item.id_product" :img="image" :product="item"></product>
                </div>`
});

Vue.component('product', {
    props: ['product', 'image'],
    template:  `<div class="product-item">
                    <img :src="image" class="product-img" alt="productImg">
                    <div class="desc">
                        <h3>{{product.product_name}}</h3>
                        <p>{{product.price}} $</p>
                        <button class="buy-btn" @click="$parent.$parent.$refs.basket.addToCart(product)">Купить</button>
                    </div>
                </div>`
})