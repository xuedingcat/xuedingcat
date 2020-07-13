<template>
	<div id="to-top" v-show="btnShow">
		<a @click="toTop">
			<img :src="require('../assets/img/icon/toTop.png')" />
		</a>
	</div>
</template>

<script>
export default {
	name: "to-top",
	data() {
		return {
			btnShow: false
		};
	},
	mounted() {
		window.addEventListener("scroll", this.scrollWatch);
	},
	destroyed() {
		window.removeEventListener("scroll", this.scrollWatch);
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	},
	methods: {
		scrollWatch() {
			let scrollTop =
				document.body.scrollTop ||
				document.documentElement.scrollTop ||
				window.pageYOffset;
			if (scrollTop > 500) {
				this.btnShow = true;
			} else {
				this.btnShow = false;
			}
			// console.log(new Date().getTime() % 10000);
		},
		toTop() {
			function scrollToTop() {
				let top =
					document.body.scrollTop ||
					document.documentElement.scrollTop ||
					window.pageYOffset;
				let speed = Math.ceil(top / 5);
				document.body.scrollTop = document.documentElement.scrollTop =
					top - speed;
				// console.log(new Date().getTime() % 10000);
				if (top > 0) {
					window.requestAnimationFrame(scrollToTop);
				}
			}
			window.requestAnimationFrame(scrollToTop);
		}
	}
};
</script>