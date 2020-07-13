<template>
	<div>
		<!-- background -->
		<div id="animation-bg">
			<div id="sky">
				<div id="cloud0"></div>
				<div id="cloud1"></div>
				<div id="cloud2"></div>
			</div>
			<div id="sea"></div>
		</div>

		<!-- animation-head -->
		<div id="animation-head">
			<div id="anime-head">
				<div class="xdLogo" @click="times=times+3">
					<img
						class="xdLogo0"
						:src="require('../assets/img/cat.png')"
						:style="{'animation-iteration-count': times}"
					/>
					<img class="xdLogo1" :src="require('../assets/img/cat0.png')" />
				</div>
				<p id="anime-title0">
					<span>bili</span>
					<span>bili</span>
				</p>
				<p id="anime-title1">动漫推荐</p>
			</div>
		</div>

		<!-- animation -->
		<div id="animation">
			<ul id="anime">
				<li v-for="(item,index) in animeList" :key="index">
					<a
						@click="linkTo('https://www.bilibili.com/bangumi/play/ss'+item.animeLink)"
						class="anime-img"
					>
						<img
							:srcset="require('../assets/img/animation/'+item.animeImage0)"
							:src="require('../assets/img/animation/'+item.animeImage1)"
						/>
					</a>

					<div class="anime-main">
						<p>{{item.animeName}}</p>
						<div class="anime-info">
							<div class="anime-msg">
								<div class="star">
									<img
										:src="require('../assets/img/animation/'+star)"
										v-for="(star,index) in item.starList"
										:key="index"
									/>
								</div>
								<p>{{item.animeInfo}}</p>
							</div>
							<a
								@click="linkTo('https://www.bilibili.com/bangumi/play/ss'+item.animeLink)"
								class="anime-btn"
							>{{item.button}}</a>
						</div>
					</div>
				</li>
			</ul>
		</div>

		<to-top></to-top>
	</div>
</template>

<script>
import ToTop from "../components/ToTop.vue";
export default {
	name: "animation",
	data() {
		return {
			times: Math.ceil(Math.random() * 6),
			animeData: require("../assets/mock/anime.json"),
			animeList: []
		};
	},
	components: {
		ToTop
	},
	mounted() {
		this.animeList = this.animeData.data;
	},
	methods: {
		linkTo(url) {
			window.open(url);
		}
	}
};
</script>