<template>
	<div>
		<header id="home-header">
			<div id="xdcat" @touchend="animationStop = !animationStop">
				<img
					:src="catImg"
					:style="{'animation-play-state' : animationStop ? 'running':'paused','animation-iteration-count': times}"
				/>
				<img :src="cat0Img" />
			</div>

			<router-link to="/searching" id="home-search">
				<img :src="searchIcon" />
				<span>搜索商品名称</span>
			</router-link>

			<router-link :to="this.$store.state.isLogin?'/user':'/login'" id="home-login">
				<img :src="login" />
			</router-link>
		</header>

		<div id="home-main">
			<div id="product-list">
				<div id="product-nav">
					<a v-for="(item,index) in productNavList" :key="index">
						<p>{{item.name}}</p>
					</a>
				</div>
				<router-link to="/products" id="product">
					<img :src="require('../assets/img/icon/product.png')" />
				</router-link>
			</div>

			<swiper ref="muSwiper" :options="swiperOptions" id="slideshow">
				<swiper-slide>
					<a>
						<img :src="require('../assets/img/home/slideshow0.jpg')" />
					</a>
				</swiper-slide>
				<swiper-slide>
					<a>
						<img :src="require('../assets/img/home/slideshow1.jpg')" />
					</a>
				</swiper-slide>
				<swiper-slide>
					<a>
						<img :src="require('../assets/img/home/slideshow2.jpg')" />
					</a>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>

			<div id="home-nav">
				<div class="home-nav">
					<a v-for="(item,index) in homeNavList0" :key="index" @click="rollTo(item.id)">
						<img :src="item.image" />
						<p>{{item.name}}</p>
					</a>
				</div>

				<div class="home-nav">
					<a v-for="(item,index) in homeNavList1" :key="index" @click="rollTo(item.id)">
						<img :src="item.image" />
						<p>{{item.name}}</p>
					</a>
				</div>
			</div>

			<div class="recommend">
				<router-link to="/animation">
					<img :src="require('../assets/img/home/recommend0.jpg')" alt="二次元入口" />
					<p>动漫推荐</p>
				</router-link>
			</div>

			<div id="product-laptop">
				<h1 class="product-title">笔记本推荐</h1>

				<ul v-for="(item,index) in laptopList" :key="index">
					<li class="product-computer" v-if="index % 2 === 0">
						<a class="product-photo">
							<img :src="require('../assets/img/products/'+item.productImage)" alt="item.productName" />
						</a>

						<div class="product-infomation">
							<div class="product-info">
								<p class="product-name">{{item.productName}}</p>
								<p class="product-msg">{{item.productInformation}}</p>

								<p class="product-price">
									<span>￥{{item.productPrice}}</span>
									<span>￥{{item.productOriginalPrice}}</span>
								</p>
								<a class="product-buy" @click="addToCart(item)">加入购物车</a>
							</div>

							<img class="product-left" :src="require('../assets/img/icon/left0.png')" />
						</div>
					</li>

					<li class="product-computer" v-else>
						<div class="product-infomation">
							<div class="product-info">
								<p class="product-name">{{item.productName}}</p>
								<p class="product-msg">{{item.productInformation}}</p>

								<p class="product-price">
									<span>￥{{item.productPrice}}</span>
									<span>￥{{item.productOriginalPrice}}</span>
								</p>
								<a class="product-buy" @click="addToCart(item)">加入购物车</a>
							</div>

							<img class="product-right" :src="require('../assets/img/icon/right0.png')" />
						</div>
						<a class="product-photo">
							<img :src="require('../assets/img/products/'+item.productImage)" alt="item.productName" />
						</a>
					</li>
				</ul>
			</div>

			<div class="recommend">
				<router-link to="/animation">
					<img :src="require('../assets/img/home/recommend1.jpg')" alt="热门推荐" />
					<p>热门推荐</p>
				</router-link>
			</div>

			<div id="product-phone">
				<ul :id="'product-phone'+index" class="phones" v-for="(list,index) in phoneList" :key="index">
					<h1 class="product-title">{{list.title+"手机"}}</h1>

					<div class="phone">
						<li class="product-phone" v-for="(item,index) in list.productList" :key="index">
							<a class="phone-photo">
								<img :src="require('../assets/img/products/'+item.productImage)" alt="item.productName" />
							</a>
							<div class="phone-info">
								<p class="product-name">{{item.productName}}</p>
								<p class="product-msg">{{item.productInformation}}</p>

								<p class="product-price">
									<span>￥{{item.productPrice}}</span>
									<span>￥{{item.productOriginalPrice}}</span>
								</p>
								<a class="product-buy" @click="addToCart(item)">加入购物车</a>
							</div>
						</li>
					</div>
				</ul>
			</div>

			<div class="recommend">
				<router-link to="/animation">
					<img :src="require('../assets/img/home/recommend2.jpg')" alt="热门推荐" />
					<p>热门推荐</p>
				</router-link>
			</div>

			<div id="product-desktop">
				<h1 class="product-title">电脑配件推荐</h1>

				<ul v-for="(item,index) in desktopList" :key="index">
					<li class="product-computer" v-if="index % 2 === 0">
						<a class="product-photo">
							<img
								:src="require('../assets/img/products/'+item.productList[0].productImage)"
								alt=".productList[0].productName"
							/>
						</a>
						<div class="product-infomation">
							<div class="product-info">
								<p class="product-name">{{item.productList[0].productName}}</p>
								<p class="product-msg">{{item.productList[0].productInformation}}</p>

								<p class="product-price">
									<span>￥{{item.productList[0].productPrice}}</span>
									<span>￥{{item.productList[0].productOriginalPrice}}</span>
								</p>
								<a class="product-buy" @click="addToCart(item.productList[0])">加入购物车</a>
							</div>

							<img class="product-left" :src="require('../assets/img/icon/left0.png')" />
						</div>
					</li>

					<li class="product-computer" v-else>
						<div class="product-infomation">
							<div class="product-info">
								<p class="product-name">{{item.productList[0].productName}}</p>
								<p class="product-msg">{{item.productList[0].productInformation}}</p>

								<p class="product-price">
									<span>￥{{item.productList[0].productPrice}}</span>
									<span>￥{{item.productList[0].productOriginalPrice}}</span>
								</p>
								<a class="product-buy" @click="addToCart(item.productList[0])">加入购物车</a>
							</div>

							<img class="product-right" :src="require('../assets/img/icon/right0.png')" />
						</div>
						<a class="product-photo">
							<img
								:src="require('../assets/img/products/'+item.productList[0].productImage)"
								alt="item.productList[0].productName"
							/>
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="tips" v-show="tipShow">
			<img class="tips-img" :src="require('../assets/img/icon/success.png')" />
			<p class="tips-content">已加入购物车!</p>
		</div>

		<nav-footer :homeIcon="homeIcon"></nav-footer>

		<to-top></to-top>
	</div>
</template>

<script>
import NavFooter from "../components/Footer.vue";
import ToTop from "../components/ToTop.vue";
export default {
	name: "home",
	data() {
		return {
			catImg: require("../assets/img/cat.png"),
			cat0Img: require("../assets/img/cat0.png"),
			searchIcon: require("../assets/img/icon/search.png"),
			login: this.$store.state.isLogin
				? this.$store.state.userPhoto
				: require("../assets/img/icon/login.png"),
			homeIcon: require("../assets/img/icon/home0.png"),
			animationStop: true,
			times: Math.ceil(Math.random() * 8),
			swiperOptions: {
				pagination: {
					el: ".swiper-pagination"
				},
				speed: 500,
				autoplay: {
					delay: 4000,
					disableOnInteraction: false
				}
			},
			productNavList: [
				{
					name: "薛定的猫",
					linkTo: ""
				},
				{
					name: "手机",
					linkTo: ""
				},
				{
					name: "笔记本",
					linkTo: ""
				},
				{
					name: "电脑",
					linkTo: ""
				},
				{
					name: "CPU",
					linkTo: ""
				},
				{
					name: "显卡",
					linkTo: ""
				},
				{
					name: "主板",
					linkTo: ""
				},
				{
					name: "SSD",
					linkTo: ""
				},
				{
					name: "内存条",
					linkTo: ""
				},
				{
					name: "电源",
					linkTo: ""
				},
				{
					name: "机箱",
					linkTo: ""
				},
				{
					name: "散热器",
					linkTo: ""
				},
				{
					name: "显示器",
					linkTo: ""
				},
				{
					name: "键盘",
					linkTo: ""
				},
				{
					name: "鼠标",
					linkTo: ""
				},
				{
					name: "音箱",
					linkTo: ""
				}
			],
			homeNavList0: [
				{
					name: "华为",
					image: require("../assets/img/home/logo0.png"),
					id: "product-phone0"
				},
				{
					name: "荣耀",
					image: require("../assets/img/home/logo1.jpg"),
					id: "product-phone1"
				},
				{
					name: "小米",
					image: require("../assets/img/home/logo2.jpg"),
					id: "product-phone2"
				},
				{
					name: "红米",
					image: require("../assets/img/home/logo3.jpg"),
					id: "product-phone3"
				},
				{
					name: "笔记本",
					image: require("../assets/img/home/laptop.png"),
					id: "product-laptop"
				}
			],
			homeNavList1: [
				{
					name: "苹果",
					image: require("../assets/img/home/logo4.jpg"),
					id: "product-phone4"
				},
				{
					name: "OPPO",
					image: require("../assets/img/home/logo5.jpg"),
					id: "product-phone5"
				},
				{
					name: "VIVO",
					image: require("../assets/img/home/logo6.jpg"),
					id: "product-phone6"
				},
				{
					name: "8848",
					image: require("../assets/img/home/logo7.jpg"),
					id: "product-phone7"
				},
				{
					name: "电脑",
					image: require("../assets/img/home/desktop.jpg"),
					id: "product-desktop"
				}
			],
			laptopList: [],
			phoneList: [],
			desktopList: [],
			tipShow: false
		};
	},
	components: {
		NavFooter,
		ToTop
	},
	mounted() {
		this.dataInit();
	},
	methods: {
		dataInit() {
			this.axios.get("/mock/products.json").then(response => {
				let res = response.data;
				let laptopData = res.data.filter(item => {
					return item.type === "laptop";
				});
				this.laptopList = laptopData[0].productList;
				this.phoneList = res.data.filter(item => {
					return item.type === "phone";
				});
				this.desktopList = res.data.filter(item => {
					return item.type === "computerPart";
				});
			});
		},
		addToCart(item) {
			this.tipShow = true;
			setTimeout(() => {
				this.tipShow = false;
			}, 1500);
			this.$store.commit("addProduct", {
				productId: item.productId,
				productName: item.productName,
				productPrice: item.productPrice,
				productNum: item.productNum,
				productImage: item.productImage,
				checked: true
			});
		},
		rollTo(id) {
			let target = document.getElementById(id).offsetTop;
			function rollToId() {
				let scrollTop =
					document.body.scrollTop ||
					document.documentElement.scrollTop ||
					window.pageYOffset;
				let distance = (target - scrollTop) / 5;
				window.scrollBy(0, distance);
				// console.log(new Date().getTime() % 10000);
				if (Math.abs(distance) > 1) {
					window.requestAnimationFrame(rollToId);
				}
			}
			window.requestAnimationFrame(rollToId);
		}
	}
};
</script>