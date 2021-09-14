Vue.component('basket', {
    data(){
        return {
            basketItems: [],
            showBasket: false,
        }
    },
    methods: {
        addToCart(item){
            let find = this.basketItems.find(element => element.id_product === item.id_product);
            if(find) {
                this.$parent.putJson(`/api/basket/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/basket`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.basketItems.push(prod)
                        }
                    })
            }
        },
        remove(item){
            let find = this.basketItems.find(element => element.id_product === item.id_product);
            if(find) {
                this.$parent.putJson(`/api/basket/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity--
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.deleteJson(`/api/basket`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.basketItems.splice(prod)
                        }
                    })
            }
        },
    },
    mounted(){
        this.$parent.getJson(`/api/basket`)
            .then(data => {
                for (let item of data.contents) {
                    this.basketItems.push(item);
                }
            });
    },
    template: `<div>
                    <button class="btn-cart" type="button" @click="showBasket = !showBasket">Корзина</button>
                    <div class="cart-block" v-show="showBasket">
                        <p v-if="!basketItems.length">Корзина пуста</p>
                        <basket-item class="basket-item" 
                        v-for="item of basketItems" 
                        :key="item.id_product"
                        :basket-item="item" 
                        :img="item.image"
                        @remove="remove">
                        </basket-item>
                    </div>
                </div>`
});

Vue.component('basket-item', {
    props: ['basketItem', 'img'],
    template:  `<div class="basket-item">
                    <div class="basket-elem">
                        <div class="product-bask">
                            <img :src="img" class ="product-img-mini" alt="productImg">
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