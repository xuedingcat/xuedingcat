<template>
	<footer id="footer">
		<router-link to="/">
			<img :src="homeIcon" />
			<p :class="{index : index == 0}">首页</p>
		</router-link>

		<router-link to="/products">
			<img :src="productsIcon" />
			<p :class="{index : index == 1}">分类</p>
		</router-link>

		<router-link to="/cart">
			<img :src="cartIcon" />
			<p :class="{index : index == 2}">购物车</p>
		</router-link>

		<router-link to="/user">
			<img :src="userIcon" />
			<p :class="{index : index == 3}">我的</p>
		</router-link>
	</footer>
</template>

<script>
export default {
	name: "nav-footer",
	props: {
		index: {
			type: Number,
			default: 0
		},
		homeIcon: {
			type: String,
			default: require("../assets/img/icon/home.png")
		},
		productsIcon: {
			type: String,
			default: require("../assets/img/icon/products.png")
		},
		cartIcon: {
			type: String,
			default: require("../assets/img/icon/cart.png")
		},
		userIcon: {
			type: String,
			default: require("../assets/img/icon/user.png")
		}
	}
};
</script>