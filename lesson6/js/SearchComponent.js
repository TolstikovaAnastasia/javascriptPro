Vue.component('search-form', {
    data: {
        userSearch: '',
    },
    template: `
                <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                    <input class="search-input" type="text" v-model="userSearch">
                    <button class="search-button" type="submit">
                        <i class="fa fa-search" aria-hidden="true"></i>
                    </button>
                </form>
    `
});

