<template>
	<header id="nav-header">
		<a @click="goBack">
			<img :src="gobackIcon" />
		</a>
		<h1>{{ headerTitle}}</h1>
		<a @click="linkTo">
			<img :src="searchIcon" />
		</a>
	</header>
</template>

<script>
export default {
	name: "nav-header",
	data() {
		return {
			gobackIcon: require("../assets/img/icon/goBack.png")
		};
	},
	props: {
		headerTitle: String,
		searchIcon: {
			type: String,
			default: require("../assets/img/icon/search.png")
		}
	},
	methods: {
		goBack() {
			if (!this.$router.go(-1)) {
				this.$router.push("/");
			} else {
				this.$router.go(-1);
			}
		},
		linkTo() {
			this.$emit("link");
		}
	}
};
</script>