<template>
	<div>
		<nav-header headerTitle="收货地址" :searchIcon="searchIcon"></nav-header>

		<div id="address">
			<div class="address" v-for="item in addressList" :key="item.addressId">
				<div class="main-info">
					<p class="consignee">{{item.consignee}}</p>
					<p class="phoneNumber">
						<span>{{item.phoneNumber}}</span>
						<span class="default" v-if="item.isDefault">[默认]</span>
					</p>
					<a class="addressDel" @click="delConfirm(item)">
						<img :src="deleteIcon" />
					</a>
				</div>
				<a class="address-main">
					<div class="addr">
						<p>{{item.addressMain}}</p>
						<p>{{item.addressDetail}}</p>
					</div>
					<img :src="enter" />
				</a>
			</div>
		</div>

		<router-link to="newaddress" class="new">新增地址</router-link>

		<modal :modalShow="modalShow" @close="modalShow = false">
			<template v-slot:message>
				<h2>确定删除该地址吗？</h2>
			</template>
			<template v-slot:btnGroup>
				<a @click="modalShow = false">取消</a>
				<a @click="delAddress">确定</a>
			</template>
		</modal>
	</div>
</template>

<script>
import NavHeader from "../components/Header.vue";
import Modal from "../components/Modal.vue";
export default {
	name: "v-address",
	data() {
		return {
			searchIcon: require("../assets/img/icon/address.png"),
			deleteIcon: require("../assets/img/icon/delete.png"),
			enter: require("../assets/img/icon/enter.png"),
			modalShow: false,
			delItem: ""
		};
	},
	components: {
		NavHeader,
		Modal
	},
	computed: {
		addressList() {
			return this.$store.state.addressData;
		}
	},
	methods: {
		delConfirm(item) {
			if (this.$store.state.addressData.length > 1) {
				this.delItem = item;
				this.modalShow = true;
			}
		},
		delAddress() {
			this.$store.commit("delAddress", this.delItem);
			this.modalShow = false;
		}
	}
};
</script>