Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(element => regexp.test(element.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`/api/getProducts`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
        });
    },
    template: `<div class="products">
                    <product v-for="item of filtered" :key="item.id_product" :img="item.image" :product="item" @add-product="$parent.$refs.basket.addToCart"></product>
                </div>`
});

Vue.component('product', {
    props: ['product', 'img'],
    template:  `<div class="product-item">
                    <img :src="img" class="product-img" alt="productImg">
                    <div class="desc">
                        <h3 class="product-title">{{product.product_name}}</h3>
                        <p class="product-desc">{{product.description}}</p>
                        <p class="product-price">{{product.price}} $</p>
                    </div>
                    <button class="buy-btn" @click="$parent.$parent.$refs.basket.addToCart(product)">Купить</button>
                </div>`
})