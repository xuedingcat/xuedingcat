import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from "axios"
import VueAxios from "vue-axios"
import VueAwesomeSwiper from "vue-awesome-swiper"
import "swiper/css/swiper.css"
import "./assets/css/base.css"
import "./assets/css/home.css"
import "./assets/css/products.css"
import "./assets/css/cart.css"
import "./assets/css/user.css"
import "./assets/css/orderCheck.css"
import "./assets/css/address.css"
import "./assets/css/animation.css"


Vue.use(VueAxios, axios);
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")
