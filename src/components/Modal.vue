<template>
	<div id="modal" v-show="modalShow">
		<div id="modal-main">
			<div id="modal-msg">
				<slot name="message"></slot>
			</div>
			<div id="modal-btn">
				<slot name="btnGroup"></slot>
			</div>
		</div>

		<div id="modal-close" @click="closeModal"></div>
	</div>
</template>

<script>
export default {
	name: "modal",
	props:["modalShow"],
	methods: {
		closeModal() {
			this.$emit("close");
		}
	}
};
</script>