<template>
	<div id="login">
		<div class="login-head">
			<div class="login-logo" @touchend="animationStop = !animationStop">
				<img
					class="xdLogo0"
					:src="require('../assets/img/cat.png')"
					:style="{'animation-play-state' : animationStop ? 'running':'paused','animation-iteration-count': times}"
				/>
				<img class="xdLogo1" :src="require('../assets/img/cat0.png')" />
			</div>
			<h1 class="login-title">账号登录</h1>
		</div>

		<form class="login-main" v-if="!isReg">
			<div class="login-info">
				<div class="login-msg">
					<input type="text" placeholder="账号" v-model="name" @focus="warningCancel()" />
				</div>
				<div class="login-msg">
					<input type="password" placeholder="密码" v-model="password" @focus="warningCancel()" />
				</div>
			</div>

			<div class="warning" v-show="warning">
				<img :src="require('../assets/img/icon/warning.png')" />
				<p>{{warningMsg}}</p>
			</div>

			<div class="login-btn">
				<a @click="reg()">注册</a>
				<a @click="login()">登录</a>
			</div>
		</form>

		<form class="login-main" v-else>
			<div class="login-info">
				<div class="login-msg">
					<input type="text" placeholder="账号" v-model="name" @focus="warningCancel()" />
				</div>
				<div class="login-msg">
					<input type="password" placeholder="密码" v-model="password" @focus="warningCancel()" />
				</div>
				<div class="login-msg">
					<input type="password" placeholder="请确认密码" v-model="repeat" @focus="warningCancel()" />
				</div>
			</div>

			<div class="warning" v-show="warning">
				<img :src="require('../assets/img/icon/warning.png')" />
				<p>{{warningMsg}}</p>
			</div>

			<div class="login-btn">
				<a @click="cancel()">取消</a>
				<a @click="addUser()">确定</a>
			</div>
		</form>

		<div class="tips" v-show="tipShow">
			<img class="tips-img" :src="require('../assets/img/icon/success.png')" />
			<p class="tips-content">{{tips}}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "Login",
	data() {
		return {
			animationStop: true,
			times: Math.ceil(Math.random() * 8),
			isReg: false,
			name: "",
			password: "",
			repeat: "",
			warning: false,
			warningMsg: "",
			tipShow: false,
			tips: ""
		};
	},
	methods: {
		reg() {
			this.warningMsg = "";
			this.warning = false;
			this.name = "";
			this.password = "";
			this.isReg = true;
		},
		login() {
			if (!this.name || localStorage.getItem("name") !== this.name) {
				this.warningMsg = "账号名不正确！";
				this.warning = true;
			} else if (
				!this.password ||
				localStorage.getItem("password") !== this.password
			) {
				this.warningMsg = "密码不正确！";
				this.warning = true;
			} else {
				this.name = "";
				this.password = "";
				this.tips = "登录成功！";
				this.tipShow = true;
				setTimeout(() => {
					this.tipShow = false;
					this.$store.commit("login");
					this.$router.push("/");
				}, 1000);
			}
		},
		cancel() {
			this.warningMsg = "";
			this.warning = false;
			this.name = "";
			this.password = "";
			this.repeat = "";
			this.isReg = false;
		},
		addUser() {
			let namePatt = /^[\u4e00-\u9fa5\w-_]+$/;
			let passwordPatt = /^\w{3,}$/;
			if (!this.name) {
				this.warningMsg = "账号名不能为空！";
				this.warning = true;
			} else if (!namePatt.test(this.name)) {
				this.warningMsg = "账号名不能包含特殊字符或空格！";
				this.warning = true;
			} else if (!this.password) {
				this.warningMsg = "密码不能为空！";
				this.warning = true;
			} else if (!passwordPatt.test(this.password)) {
				this.warningMsg = "密码应为字母或数字，三位以上！";
				this.warning = true;
			} else if (!this.repeat) {
				this.warningMsg = "请再一次输入密码！";
				this.warning = true;
			} else if (this.password !== this.repeat) {
				this.warningMsg = "两次密码输入不一致！";
				this.warning = true;
			} else {
				localStorage.setItem("name", this.name);
				localStorage.setItem("password", this.password);
				this.name = "";
				this.password = "";
				this.repeat = "";
				this.tips = "注册成功！";
				this.tipShow = true;
				setTimeout(() => {
					this.tipShow = false;
					this.isReg = false;
				}, 1000);
			}
		},
		warningCancel() {
			this.warningMsg = "";
			this.warning = false;
		}
	}
};
</script>