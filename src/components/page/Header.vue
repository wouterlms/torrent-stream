<template>
	<header>
		<div>
			<svg @click="minimize()" aria-hidden="false" width="12" height="12" viewBox="0 0 12 12"><rect fill="#FFF" width="10" height="1" x="1" y="6"></rect></svg>
			<svg @click="maximize()" aria-hidden="false" width="12" height="12" viewBox="0 0 12 12"><rect width="9" height="9" x="1.5" y="1.5" fill="none" stroke="#FFF"></rect></svg>
			<svg @click="close()"  aria-hidden="false" width="12" height="12" viewBox="0 0 12 12"><polygon fill="#FFF" fill-rule="evenodd" points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"></polygon></svg>
		</div>
	</header>
</template>

<script>
	
	export default {

		methods: {

			getCurrentWindow() {
				return window.getCurrentWindow();
			},

			isWindowMaximized() {
				return this.getCurrentWindow().isMaximized();
			},

			minimize() {
				this.getCurrentWindow().minimize();
			},
			
			maximize() {
				if (this.isWindowMaximized()) {
					this.getCurrentWindow().unmaximize();
				} else {
					this.getCurrentWindow().maximize();
				}
			},
			close() {
				this.getCurrentWindow().close();
			}
		}
	}
</script>

<style scoped lang="scss">

header {
	position: fixed;
	top: 0;
	left: 0;

	width: 100%;

	padding: 0 .5rem;
	height: 30px;
	-webkit-app-region: drag;

	background: $dark3;

	display: flex;
	align-items: center;
	justify-content: flex-end;

	z-index: 10;

	&>img {
		width: 20px;
		height: 20px;

		animation: wiggle 10s infinite ease-in-out;

		@keyframes wiggle {
		0% {-webkit-transform: rotate(0deg);}
		2% {-webkit-transform: rotate(-10deg);}
		4% {-webkit-transform: rotate(10deg);}
		8% {-webkit-transform: rotate(-5deg);}
		12% {-webkit-transform: rotate(0deg);}
}
	}

	&>div {
		-webkit-app-region: no-drag;

		svg {
			margin: 0 .2rem;
			cursor: pointer;

			padding: .5rem;

			box-sizing: content-box;
		}
	}
}

</style>