import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin: false,
        userPhoto: require('./assets/img/user/head-portrait.jpg'),
        searchHistory: [],
        cartList: [],
        addressData: [
            {
                "addressId": "1001",
                "consignee": "张叁",
                "phoneNumber": 13545678910,
                "addressMain": "广东省 广州市 海珠区",
                "addressDetail": "新港中路397号 TIT创意园B1-B3号",
                "isDefault": false
            },
            {
                "addressId": "1002",
                "consignee": "李肆",
                "phoneNumber": 13845678910,
                "addressMain": "广东省 深圳市 南山区",
                "addressDetail": "高新科技园北区 深南大道10000号",
                "isDefault": true
            },
            {
                "addressId": "1003",
                "consignee": "王伍",
                "phoneNumber": 12345678910,
                "addressMain": "广东省 东莞市 松山湖",
                "addressDetail": "高新技术产业开发区 新城大道2号",
                "isDefault": false
            }
        ],
        addressId: 1004
    },
    mutations: {
        login(state) {
            state.isLogin = true;
        },
        addHistory(state, search) {
            state.searchHistory.push(search);
        },
        clearHistory(state) {
            state.searchHistory = [];
        },
        addProduct(state, product) {
            let number = state.cartList.findIndex(item => {
                return item.productId == product.productId
            })
            if (number >= 0) {
                state.cartList[number].productNum++;
            } else {
                state.cartList.push(product);
            }
        },
        addAddress(state, address) {
            if (address.isDefault) {
                state.addressData.forEach(item => {
                    return item.isDefault = false
                })
            }
            state.addressData.push(address);
            state.addressId++;
            // console.log(state.addressId);
        },
        delAddress(state, delItem) {
            state.addressData.forEach((item, index) => {
                if (delItem.addressId == item.addressId) {
                    state.addressData.splice(index, 1);
                }
            })
            if (delItem.isDefault && state.addressData.length > 0) {
                state.addressData[0].isDefault = true;
            }
        }
    }
})