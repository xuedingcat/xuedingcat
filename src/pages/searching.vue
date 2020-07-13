<template>
	<div>
		<div id="search">
			<a class="search-back" @click="goBack()">
				<img :src="require('../assets/img/icon/goBack.png')" />
			</a>
			<div class="searching">
				<input type="text" placeholder="搜索商品名称" v-model="searchString" />
				<img
					:src="require('../assets/img/icon/clear.png')"
					v-show="searchString"
					@click="searchString = ''"
				/>
			</div>
			<a class="searchBtn" @click="search()">搜索</a>
		</div>

		<div class="searchList" v-show="searchList.length > 0">
			<p
				class="searchItem"
				v-for="(item,index) in searchList"
				:key="index"
				@click="searchString = item.productName"
			>{{item.productName}}</p>
		</div>

		<div class="searchRecommend">
			<h3>搜索推荐</h3>
			<div class="recommendList">
				<p v-for="(item,index) in recommendList" :key="index">{{item.name}}</p>
			</div>
		</div>
		<div class="searchHistory" v-show="this.$store.state.searchHistory.length > 0">
			<h3 class="searchRecord">搜索记录</h3>
			<div class="historyList">
				<div v-for="(item,index) in this.$store.state.searchHistory" :key="index">
					<img :src="require('../assets/img/icon/history.png')" />
					<p>{{item.history}}</p>
				</div>
			</div>
			<a class="clearRecord" @click="clearHistory">清除搜索记录</a>
		</div>
	</div>
</template>

<script>
export default {
	name: "searching",
	data() {
		return {
			recommendList: [
				{ name: "小米" },
				{ name: "华为" },
				{ name: "Redmi" },
				{ name: "荣耀" },
				{ name: "MacBook" },
				{ name: "i7-9700K" },
				{ name: "GTX 1660" },
				{ name: "三星 970" },
				{ name: "金士顿" }
			],
			productList: [],
			searchString: ""
		};
	},
	mounted() {
		this.init();
	},
	computed: {
		searchList() {
			let searchList = this.productList;
			let searchString = this.searchString.trim().toLowerCase();
			if (!searchString) {
				return [];
			}
			searchList = searchList.filter(item => {
				if (item.productName.toLowerCase().includes(searchString)) {
					return item;
				}
			});
			return searchList.slice(0, 6);
		}
	},
	methods: {
		init() {
			this.axios.get("/mock/products.json").then(response => {
				let res = response.data;
				res.data.forEach(list => {
					list.productList.forEach(item => {
						this.productList.push({
							productName: item.productName
						});
					});
				});
			});
		},
		goBack() {
			if (!this.$router.go(-1)) {
				this.$router.push("/");
			} else {
				this.$router.go(-1);
			}
		},
		search() {
			if (this.searchString) {
				this.$store.commit("addHistory", {
					history: this.searchString
				});
			}
		},
		clearHistory() {
			this.$store.commit("clearHistory");
		}
	}
};
</script>