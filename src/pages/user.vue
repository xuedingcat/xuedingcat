<template>
	<div>
		<header
			id="user-header"
			:style="{background:'#f37d0f url(' + require('../assets/img/user/background.png') + ') center/cover'}"
		>
			<router-link :to="this.$store.state.isLogin?'/user':'/login'">
				<img :src="userPhoto" />
			</router-link>
			<router-link
				:to="this.$store.state.isLogin?'/user':'/login'"
			>{{this.$store.state.isLogin?userName:"登录/注册"}}</router-link>
		</header>

		<div id="user-content">
			<div id="cv">
				<p>我的订单</p>
				<router-link to>
					<p>全部订单</p>
					<img :src="enter" />
				</router-link>
			</div>

			<div id="user-order">
				<a v-for="(item,index) in userOrderList" :key="index">
					<img :src="item.userOrderImg" />
					<p>{{item.userOrderStatus}}</p>
				</a>
			</div>

			<div id="user-page">
				<a @click="linkTo(item)" v-for="(item,index) in userPageList" :key="index">
					<div>
						<img :src="item.userPageImg" />
						<p>{{item.userPageName}}</p>
					</div>
					<img :src="enter" />
				</a>
			</div>
		</div>

		<nav-footer :userIcon="userIcon" :index="3"></nav-footer>
	</div>
</template>

<script>
import NavFooter from "../components/Footer.vue";
export default {
	name: "user",
	data() {
		return {
			userPhoto: this.$store.state.isLogin
				? this.$store.state.userPhoto
				: require("../assets/img/icon/user-photo.png"),
			userIcon: require("../assets/img/icon/user0.png"),
			userName: localStorage.getItem("name"),
			enter: require("../assets/img/icon/enter.png"),
			userOrderList: [
				{
					userOrderImg: require("../assets/img/icon/non-payment.png"),
					userOrderStatus: "待付款"
				},
				{
					userOrderImg: require("../assets/img/icon/receiving.png"),
					userOrderStatus: "待收货"
				},
				{
					userOrderImg: require("../assets/img/icon/flower.png"),
					userOrderStatus: "评价"
				},
				{
					userOrderImg: require("../assets/img/icon/after-sale.png"),
					userOrderStatus: "退换修"
				}
			],
			userPageList: [
				{
					userPageImg: require("../assets/img/icon/address.png"),
					userPageName: "收货地址",
					linkTo: "/address"
				},
				{
					userPageImg: require("../assets/img/icon/VIP.png"),
					userPageName: "会员中心",
					linkTo: ""
				},
				{
					userPageImg: require("../assets/img/icon/collection.png"),
					userPageName: "我的收藏",
					linkTo: ""
				},
				{
					userPageImg: require("../assets/img/icon/wallet.png"),
					userPageName: "我的钱包",
					linkTo: ""
				},
				{
					userPageImg: require("../assets/img/icon/coupon.png"),
					userPageName: "优惠卷",
					linkTo: ""
				},
				{
					userPageImg: require("../assets/img/icon/service.png"),
					userPageName: "客服",
					linkTo: ""
				},
				{
					userPageImg: require("../assets/img/icon/options.png"),
					userPageName: "设置",
					linkTo: ""
				}
			]
		};
	},
	components: {
		NavFooter
	},
	methods: {
		linkTo(item) {
			if (item.linkTo) {
				this.$router.push(item.linkTo);
			}
		}
	}
};
</script>