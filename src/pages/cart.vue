<template>
	<div>
		<nav-header headerTitle="购物车" @link="link()"></nav-header>

		<div id="goods">
			<div id="emptyCart" v-show="cartList.length === 0">
				<p id="empty">购物车是空的</p>
				<router-link to="/products" id="goShopping">去逛逛</router-link>
			</div>
			<div class="goods-list" v-for="item in cartList" :key="item.productId">
				<a class="select" @click="editCart('checked',item)">
					<img :src="[item.checked ? selected : unselected]" />
				</a>
				<div class="goods-img">
					<img :src="require('../assets/img/products/'+item.productImage)" />
				</div>
				<div class="goods-info">
					<p>{{item.productName}}</p>
					<div class="goods-count">
						<p>￥{{item.productPrice}}</p>
						<div class="goods-num">
							<a @click="editCart('minus',item)">
								<img :src="[item.productNum > 1 ? minus : minus0]" />
							</a>
							<span>{{item.productNum}}</span>
							<a @click="editCart('add',item)">
								<img :src="addIcon" />
							</a>
						</div>
						<div class="delete">
							<a @click="delConfirm(item)">
								<img :src="deleteIcon" />
							</a>
						</div>
					</div>
				</div>
			</div>

			<div id="accounts">
				<div id="accounts-content">
					<a @click="checkAll">
						<img :src="[checkAllFlag ? selected : unselected]" />
						<p>全选</p>
					</a>
					<p>
						<span>合计:</span>
						<span class="total-price">{{totalPrice | currency}}</span>
					</p>
					<a :style="{'background' : totalNum ? '#ff6700':'#cccccc'}" @click="checkOut">结算({{totalNum}})</a>
				</div>
			</div>
		</div>

		<nav-footer :cartIcon="cartIcon" :index="2"></nav-footer>

		<modal :modalShow="modalShow" @close="modalShow = false">
			<template v-slot:message>
				<h2>确定删除该商品吗？</h2>
			</template>
			<template v-slot:btnGroup>
				<a @click="modalShow = false">取消</a>
				<a @click="delCart">确定</a>
			</template>
		</modal>
	</div>
</template>

<script>
import NavHeader from "../components/Header.vue";
import NavFooter from "../components/Footer.vue";
import Modal from "../components/Modal.vue";
export default {
	name: "cart",
	data() {
		return {
			selected: require("../assets/img/icon/selected.png"),
			unselected: require("../assets/img/icon/unselected.png"),
			minus: require("../assets/img/icon/minus.png"),
			minus0: require("../assets/img/icon/minus0.png"),
			addIcon: require("../assets/img/icon/add.png"),
			deleteIcon: require("../assets/img/icon/delete.png"),
			cartIcon: require("../assets/img/icon/cart0.png"),
			modalShow: false,
			delItem: ""
		};
	},
	components: {
		NavHeader,
		NavFooter,
		Modal
	},
	computed: {
		cartList() {
			return this.$store.state.cartList;
		},
		checkAllFlag() {
			return this.cartList.every(item => {
				return item.checked;
			});
		},
		totalNum() {
			let num = 0;
			this.cartList.forEach(item => {
				if (item.checked) {
					num += item.productNum;
				}
			});
			return num;
		},
		totalPrice() {
			let money = 0;
			this.cartList.forEach(item => {
				if (item.checked) {
					money += item.productPrice * item.productNum;
				}
			});
			return money;
		}
	},
	filters: {
		currency(value) {
			if (!value) {
				return " 0";
			}
			return "￥" + value;
		}
	},
	methods: {
		// 实际项目editCart、checkAll、delCart以及checkAllFlag全部应该写到store.js(Vuex)里面去，这里暂不迁移。
		link() {
			this.$router.push("/searching");
		},
		editCart(type, item) {
			if (type == "add") {
				item.productNum++;
			} else if (type == "minus" && item.productNum > 1) {
				item.productNum--;
			} else if (type == "checked") {
				item.checked = !item.checked;
			}
		},
		// 全选和反选
		checkAll() {
			let flag = !this.checkAllFlag;
			this.cartList.forEach(item => {
				item.checked = flag;
			});
		},
		checkOut() {
			if (this.totalNum) {
				this.$router.push("/orderCheck");
			}
		},
		delConfirm(item) {
			this.delItem = item;
			this.modalShow = true;
		},
		delCart() {
			let delItem = this.delItem;
			this.cartList.forEach((item, index) => {
				if (delItem.productId == item.productId) {
					this.cartList.splice(index, 1);
				}
			});
			this.modalShow = false;
		}
	}
};
</script>