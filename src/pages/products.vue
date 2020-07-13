<template>
	<div>
		<nav-header headerTitle="分类" @link="link()"></nav-header>

		<div id="products-main">
			<ul id="products-nav">
				<li v-for="(item,index) in productList" :key="index">
					<a :class="{scroll:scroll==index}" @click="rollTo(index)">{{item.title}}</a>
				</li>
			</ul>

			<div id="products-content">
				<ul class="products" v-for="(list,index) in productList" :key="index" :id="'product'+index">
					<h3>
						<span>—</span>
						{{list.title}}
						<span>—</span>
					</h3>
					<li class="product" v-for="item in list.productList" :key="item.productId">
						<a>
							<img :src="require('../assets/img/products/'+item.productImage)" />
						</a>
						<div class="products-info">
							<p>{{item.productName}}</p>
							<div class="products-price">
								<p>￥{{item.productPrice}}</p>
								<a @click="buyProduct(item)" @click.once="productShow = true">购买</a>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<div v-show="commodityShow">
			<div class="commodity" v-if="productShow">
				<div class="commodity-img">
					<img
						:src="require('../assets/img/products/'+productItem.productImage)"
						alt="productItem.productName"
					/>
				</div>
				<div class="commodity-main">
					<div class="commodity-price">
						<p class="commodity-name">{{productItem.productName}}</p>
						<p class="commodity-original">
							<span>原价：￥</span>
							<span>{{productItem.productOriginalPrice}}</span>
						</p>
						<p class="commodity-present">
							<span>现价：</span>
							<span>￥{{productItem.productPrice}}</span>
						</p>
					</div>
					<div class="commodity-info">
						<p class="commodity-msg">商品信息</p>
						<p class="commodity-cont">{{productItem.productInformation}}</p>
					</div>
					<div class="commodity-count">
						<p>商品数量</p>
						<div class="goods-num">
							<a @click="productCount(0)">
								<img :src="[productItem.productNum > 1 ? minus : minus0]" />
							</a>
							<span>{{productItem.productNum}}</span>
							<a @click="productCount(1)">
								<img :src="require('../assets/img/icon/add.png')" />
							</a>
						</div>
					</div>
					<div class="commodity-settlement">
						<a @click="addProduct()">加入购物车</a>
					</div>
				</div>
				<a class="commodity-exit" @click="commodityShow = false">
					<img :src="require('../assets/img/icon/exit.png')" />
				</a>
			</div>

			<div class="commodity-close" @click="commodityShow = false"></div>
		</div>

		<div class="tips" v-show="tipShow">
			<img class="tips-img" :src="require('../assets/img/icon/success.png')" />
			<p class="tips-content">已加入购物车!</p>
		</div>

		<nav-footer :productsIcon="productsIcon" :index="1"></nav-footer>

		<to-top></to-top>
	</div>
</template>

<script>
import NavHeader from "../components/Header.vue";
import NavFooter from "../components/Footer.vue";
import ToTop from "../components/ToTop.vue";
export default {
	name: "products",
	data() {
		return {
			productData: require("../assets/mock/products.json"),
			productList: [],
			scroll: Number,
			productsIcon: require("../assets/img/icon/products0.png"),
			productItem: "",
			commodityShow: false,
			productShow: false,
			minus: require("../assets/img/icon/minus.png"),
			minus0: require("../assets/img/icon/minus0.png"),
			tipShow: false
		};
	},
	components: {
		NavHeader,
		NavFooter,
		ToTop
	},
	mounted() {
		this.productList = this.productData.data;
		// window.addEventListener("scroll", this.selected);
	},
	methods: {
		link() {
			this.$router.push("/searching");
		},
		rollTo(index) {
			let target = document.getElementById("product" + index).offsetTop;
			let clientHeight =
				window.innerHeight ||
				Math.min(
					document.body.clientHeight,
					document.documentElement.clientHeight
				);
			let scrollHeight = Math.max(
				document.body.scrollHeight,
				document.documentElement.scrollHeight
			);
			function rollToIndex() {
				let scrollTop =
					document.body.scrollTop ||
					document.documentElement.scrollTop ||
					window.pageYOffset;
				let distance = (target - scrollTop) / 5;
				window.scrollBy(0, distance);
				// console.log(new Date().getTime() % 10000);
				if (
					Math.abs(distance) > 1 &&
					clientHeight + scrollTop < scrollHeight
				) {
					window.requestAnimationFrame(rollToIndex);
				}
			}
			window.requestAnimationFrame(rollToIndex);
			this.scroll = index;
		},
		// selected() {
		// 	let elements = document.getElementsByClassName("products");
		// 	elements.forEach((item, index) => {
		// 		let top = item.offsetTop;
		// 		let scrollTop =
		// 			document.body.scrollTop ||
		// 			document.documentElement.scrollTop;
		// 		if (scrollTop + 5 >= top) {
		// 			this.scroll = index;
		// 		}
		// 		console.log(new Date().getTime() % 10000);
		// 	});
		// },
		buyProduct(item) {
			this.productItem = item;
			this.commodityShow = true;
		},
		productCount(n) {
			if (n == 1) {
				this.productItem.productNum++;
			} else if (n == 0 && this.productItem.productNum > 1) {
				this.productItem.productNum--;
			}
		},
		addProduct() {
			this.tipShow = true;
			setTimeout(() => {
				this.tipShow = false;
			}, 1500);
			this.$store.commit("addProduct", {
				productId: this.productItem.productId,
				productName: this.productItem.productName,
				productPrice: this.productItem.productPrice,
				productNum: this.productItem.productNum,
				productImage: this.productItem.productImage,
				checked: true
			});
			this.commodityShow = false;
		}
	}
};
</script>