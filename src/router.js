import Vue from "vue"
import Router from "vue-router"
import Home from "./pages/home"
import Products from "./pages/products"
import Cart from "./pages/cart"
import User from "./pages/user"
import orderCheck from "./pages/orderCheck"
import Address from "./pages/address"
import newAddress from "./pages/newAddress"
import Animation from "./pages/animation"
import Login from "./pages/login"
import Searching from "./pages/searching"
Vue.use(Router)

export default new Router({
    // mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/products",
            name: "products",
            component: Products,
        },
        {
            path: "/cart",
            name: "cart",
            component: Cart,
        },
        {
            path: "/user",
            name: "user",
            component: User,
        },
        {
            path: "/ordercheck",
            name: "ordercheck",
            component: orderCheck,
        },
        {
            path: "/address",
            name: "address",
            component: Address,
        },
        {
            path: "/newaddress",
            name: "newaddress",
            component: newAddress,
        },
        {
            path: "/animation",
            name: "animation",
            component: Animation,
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/searching",
            name: "searching",
            component: Searching,
        }
    ]
})