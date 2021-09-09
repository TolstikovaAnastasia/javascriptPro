Vue.component('basket', {
    data(){
        return {
            image: 'img/notebook.jpg',
            basketUrl: '/getBasket.json',
            basketItems: [],
            showBasket: false,
        }
    },
    methods: {
        addToCart(product){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.basketItems.find(element => element.id_product === product.id_product);
                        if(find){
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.basketItems.push(prod)
                        }
                    }
                })
        },
        remove(item){
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        if(item.quantity > 1){
                            item.quantity--;
                        } else {
                            this.basketItems.splice(this.basketItems.indexOf(item), 1)
                        }
                    }
                })
        },
    },
    mounted(){
        this.$parent.getJson(`${API + this.basketUrl}`)
            .then(data => {
                for (let element of data.contents) {
                    this.basketItems.push(element);
                }
            });
    },
    template: `<div>
                    <button class="btn-cart" type="button" @click="showBasket = !showBasket">Корзина</button>
                    <div class="cart-block" v-show="showBasket">
                        <basket-item class="basket-item" 
                        v-for="item of basketItems" 
                        :key="item.id_product"
                        :basket-item="item" 
                        :img="image"
                        @remove="remove">
                        </basket-item>
                    </div>
                </div>`
});

Vue.component('basket-item', {
    props: ['basketItem', 'image'],
    template:  `<div class="basket-item">
                    <div class="basket-elem">
                        <div class="product-bask">
                            <img :src="image" class ="product-img" alt="productImg">
                            <div class="product-desc">
                                <div class="product-title">{{ basketItem.product_name }}</div>
                                <div class="product-quantity">Количество: {{ basketItem.quantity }}</div>
                                <div class="product-price">Стоимость: {{ basketItem.price }} $</div>
                            </div>
                        </div>
                        <div class="totalProd-price">Итого: {{ basketItem.quantity*basketItem.price }} $</div>
                    </div>
                    <div class="right-block">
                        <button class="del-btn" @click="$emit('remove', basketItem)">&times;</button>
                    </div>
                </div>`
})