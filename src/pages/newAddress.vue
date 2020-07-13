<template>
	<div>
		<nav-header headerTitle="新增地址" :searchIcon="searchIcon"></nav-header>

		<div id="new-address">
			<div class="new-info">
				<p class="info-title">收货人：</p>
				<input
					class="info-input"
					type="text"
					placeholder="姓名"
					v-model="consignee"
					@focus="warningCancel(1)"
				/>
			</div>

			<div class="warning" v-show="warning == 1">
				<img :src="require('../assets/img/icon/warning.png')" />
				<p>{{warningMsg}}</p>
			</div>

			<div class="new-info">
				<p class="info-title">手机号码：</p>
				<input
					class="info-input"
					type="number"
					placeholder="手机号"
					v-model="phoneNumber"
					@focus="warningCancel(2)"
				/>
			</div>

			<div class="warning" v-show="warning == 2">
				<img :src="require('../assets/img/icon/warning.png')" />
				<p>{{warningMsg}}</p>
			</div>

			<div class="new-info">
				<p class="info-title">所在地区：</p>
				<input
					class="info-input"
					list="address-list"
					placeholder="省 市 区 街道信息"
					v-model="addressMain"
					@focus="warningCancel(3)"
				/>
				<datalist name="address-list" id="address-list">
					<option value="广东省"></option>
					<option value="江苏省"></option>
					<option value="北京市"></option>
					<option value="上海市"></option>
				</datalist>
			</div>

			<div class="warning" v-show="warning == 3">
				<img :src="require('../assets/img/icon/warning.png')" />
				<p>{{warningMsg}}</p>
			</div>

			<div class="new-info">
				<p class="info-title">详细地址：</p>
				<input
					class="info-input"
					type="text"
					placeholder="详细地址"
					v-model="addressDetail"
					@focus="warningCancel(4)"
				/>
			</div>

			<div class="warning" v-show="warning == 4">
				<img :src="require('../assets/img/icon/warning.png')" />
				<p>{{warningMsg}}</p>
			</div>

			<div id="default-setting">
				<p>设为默认地址</p>
				<input type="checkbox" v-model="isDefault" />
			</div>
		</div>

		<div class="tips" v-show="tipShow">
			<img class="tips-img" :src="require('../assets/img/icon/success.png')" />
			<p class="tips-content">{{tips}}</p>
		</div>

		<a class="new" @click="addAddress()">保存地址</a>
	</div>
</template>

<script>
import NavHeader from "../components/Header.vue";
export default {
	name: "newAddress",
	data() {
		return {
			searchIcon: require("../assets/img/icon/address.png"),
			consignee: "",
			phoneNumber: "",
			addressMain: "",
			addressDetail: "",
			isDefault: false,
			warning: 0,
			warningMsg: "",
			tipShow: false,
			tips: ""
		};
	},
	components: {
		NavHeader
	},
	methods: {
		addAddress() {
			let consigneePatt = /^[\u4e00-\u9fa5\w-_]+$/;
			let phoneNumberPatt = /^1[0-9]{10}$/;
			let addressMainPatt = /^[\u4e00-\u9fa5]{2,}[\u4e00-\u9fa5 ]{1,}$/;
			let addressDetailPatt = /^[\u4e00-\u9fa5]{2}[\u4e00-\u9fa5\w ]{6,30}$/;
			if (!this.consignee) {
				this.warningMsg = "姓名不能为空！";
				this.warning = 1;
			} else if (!consigneePatt.test(this.consignee)) {
				this.warningMsg = "输入格式错误，不能包含特殊字符或空格！";
				this.warning = 1;
			} else if (!phoneNumberPatt.test(this.phoneNumber)) {
				this.warningMsg = "请输入正确的手机号码";
				this.warning = 2;
			} else if (!this.addressMain) {
				this.warningMsg = "地址不能为空！";
				this.warning = 3;
			} else if (!addressMainPatt.test(this.addressMain)) {
				this.warningMsg = "请输入正确的地区名称！";
				this.warning = 3;
			} else if (!this.addressDetail) {
				this.warningMsg = "地址不能为空！";
				this.warning = 4;
			} else if (!addressDetailPatt.test(this.addressDetail)) {
				this.warningMsg = "请输入正确的地址，字数控制在8-20个之间！";
				this.warning = 4;
			} else {
				this.tips = "地址保存成功！";
				this.tipShow = true;
				setTimeout(() => {
					this.tipShow = false;
					this.saveAddress();
				}, 1000);
			}
		},
		saveAddress() {
			this.$store.commit("addAddress", {
				addressId: this.$store.state.addressId,
				consignee: this.consignee,
				phoneNumber: this.phoneNumber,
				addressMain: this.addressMain,
				addressDetail: this.addressDetail,
				isDefault: this.isDefault
			});
			this.consignee = "";
			this.phoneNumber = "";
			this.addressMain = "";
			this.addressDetail = "";
			this.isDefault = false;
			this.$router.push("/address");
		},
		warningCancel(n) {
			if (n == this.warning) {
				this.warning = 0;
			}
		}
	}
};
</script>