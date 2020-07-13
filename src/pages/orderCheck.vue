<template>
	<div>
		<nav-header headerTitle="用户结算" @link="link()"></nav-header>

		<div id="order-check">
			<div id="order-address">
				<router-link to="/address" id="order-addr">
					<div class="order-address">
						<div class="order-addr">
							<p>{{addressDefault.consignee}}</p>
							<p>{{addressDefault.phoneNumber}}</p>
						</div>
						<p class="address-info">{{addressDefault.addressMain}} {{addressDefault.addressDetail}}</p>
					</div>
					<img :src="enter" />
				</router-link>
			</div>

			<div id="payment">
				<a
					class="payment"
					v-for="(item,index) in paymentList"
					:key="index"
					@click="paymentChange(item)"
				>
					<div class="pay">
						<img :src="item.paymentImg" />
						<p>{{item.paymentMode}}</p>
					</div>
					<img :src="[item.paymentSelected ? selected : unselected]" />
				</a>
			</div>

			<div id="order-info">
				<div class="order-info">
					<p>运费</p>
					<p class="order-msg">包邮</p>
				</div>

				<div class="order-info" @click="dispatch=!dispatch">
					<p>送货方式</p>
					<div class="order-msg">
						<p>不限</p>
						<img :src="drop" :class="{rotate:dispatch}" />
					</div>
				</div>

				<div id="dispatch" v-show="dispatch">
					<div id="dispatch-mode">
						<p class="drop-title">配送方式</p>
						<p>包邮</p>
					</div>
					<div id="dispatch-time">
						<p class="drop-title">送货时间</p>
						<div id="dispatch-content">
							<a :class="{redBorder:dispatchTime==0}" @click="dispatchTime = 0">不限</a>
							<a :class="{redBorder:dispatchTime==1}" @click="dispatchTime = 1">工作日</a>
							<a :class="{redBorder:dispatchTime==2}" @click="dispatchTime = 2">双休日、假日</a>
						</div>
					</div>
				</div>

				<div class="order-info" @click="invoice=!invoice">
					<p>电子普通发票</p>
					<div class="order-msg">
						<p>个人</p>
						<img :src="drop" :class="{rotate:invoice}" />
					</div>
				</div>

				<div id="invoice" v-show="invoice">
					<div id="invoice-type">
						<p class="drop-title">发票类型</p>
						<a>电子普通发票</a>
					</div>
					<div id="invoice-title">
						<p class="drop-title">选择发票抬头</p>
						<div id="invoice-content">
							<a :class="{redBorder:invoiceTitle}" @click="invoiceTitle=true">个人</a>
							<a :class="{redBorder:!invoiceTitle}" @click="invoiceTitle=false">单位</a>
						</div>
						<a href="javascript:;" id="invoice-info">
							<p>个人</p>
							<img :src="enter" />
						</a>
						<div id="invoice-default">
							<a @click="invoiceDefault=!invoiceDefault">
								<img :src="invoiceDefault ? selected : unselected" />
							</a>
							<p>设置为默认抬头</p>
						</div>
					</div>
				</div>

				<div class="order-info" id="discount" @click="coupon=!coupon">
					<p>优惠卷</p>
					<div class="order-msg">
						<p>
							<span>已优惠</span>
							<span class="discount">0元</span>
						</p>
						<img :src="drop" :class="{rotate:coupon}" />
					</div>
				</div>

				<div id="coupon" v-show="coupon">
					<p class="drop-title">使用优惠卷码</p>
					<div id="coupon-number">
						<input type="number" placeholder="请输入优惠券码" />
						<button type="submit">确定</button>
					</div>
				</div>
			</div>

			<div id="order-list">
				<div class="order-list" v-for="(item,index) in productList" :key="index">
					<div class="order-main">
						<img :src="require('../assets/img/products/'+item.productImage)" />
						<p>{{item.productName}}</p>
					</div>
					<p class="order-account">
						<span class="order-num">{{item.productNum}}</span>
						<span class="order-mult">x</span>
						<span>{{item.productPrice}}</span>
					</p>
				</div>
			</div>
		</div>

		<div id="total">
			<div id="total-main">
				<div id="total-content">
					<p>共{{totalNum}}件</p>
					<p>合计:</p>
					<p>￥{{totalPrice}}</p>
				</div>
				<a id="total-payment" @click="toPay()">去付款</a>
			</div>
		</div>

		<div class="tips" v-show="tipShow">
			<img class="tips-img" :src="require('../assets/img/icon/warning.png')" />
			<p style="color:#ff6666">暂不开通购买!</p>
		</div>
	</div>
</template>

<script>
import NavHeader from "../components/Header.vue";
export default {
	name: "orderCheck",
	data() {
		return {
			// addressDefault: [],
			dispatch: false,
			dispatchTime: 0,
			invoice: false,
			invoiceTitle: true,
			invoiceDefault: false,
			coupon: false,
			enter: require("../assets/img/icon/enter.png"),
			drop: require("../assets/img/icon/drop.png"),
			selected: require("../assets/img/icon/selected.png"),
			unselected: require("../assets/img/icon/unselected.png"),
			paymentList: [
				{
					paymentImg: require("../assets/img/icon/wechatpay.png"),
					paymentMode: "微信支付",
					paymentSelected: true
				},
				{
					paymentImg: require("../assets/img/icon/alipay.png"),
					paymentMode: "支付宝",
					paymentSelected: false
				},
				{
					paymentImg: require("../assets/img/icon/unionpay.png"),
					paymentMode: "银联支付",
					paymentSelected: false
				}
			],
			tipShow: false
		};
	},
	components: {
		NavHeader
	},
	computed: {
		addressDefault() {
			let addressData = this.$store.state.addressData;
			let addressDefault = addressData.find(item => {
				return item.isDefault;
			});
			return addressDefault;
		},
		productList() {
			return this.$store.state.cartList.filter(item => {
				return item.checked;
			});
		},
		totalNum() {
			let num = 0;
			this.productList.forEach(item => {
				num += item.productNum;
			});
			return num;
		},
		totalPrice() {
			let money = 0;
			this.productList.forEach(item => {
				money += item.productPrice * item.productNum;
			});
			return money;
		}
	},
	methods: {
		link() {
			this.$router.push("/searching");
		},
		paymentChange(item) {
			this.paymentList.forEach(payment => {
				payment.paymentSelected = false;
			});
			item.paymentSelected = true;
		},
		toPay() {
			this.tipShow = true;
			setTimeout(() => {
				this.tipShow = false;
			}, 1500);
		}
	}
};
</script>