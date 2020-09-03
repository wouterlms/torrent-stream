<template>
	<div class="loader">
		<svg class="circular" viewBox="25 25 50 50">
			<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
		</svg>
	</div>
</template>

<script>
	export default {

	}
</script>

<style scoped lang="scss">


.loader {
	position: relative;
	margin: 2rem auto;
	width: 50px;

	&:before {
		content: '';
		display: block;
		padding-top: 100%;
	}
}

.circular {
	animation: rotate 2s linear infinite;
	height: 100%;
	transform-origin: center center;
	width: 100%;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
}

.path {
	stroke-dasharray: 1, 200;
	stroke-dashoffset: 0;
	animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
	stroke-linecap: round;
}

@keyframes rotate {
	100% {
		transform: rotate(360deg);
	}
}

@keyframes dash {
	0% {
		stroke-dasharray: 1, 200;
		stroke-dashoffset: 0;
	}
	50% {
		stroke-dasharray: 89, 200;
		stroke-dashoffset: -35px;
	}
	100% {
		stroke-dasharray: 89, 200;
		stroke-dashoffset: -124px;
	}
}

@keyframes color {
	100%,
	0% {
		stroke: $primary-accent;
	}
	40% {
		stroke: lighten($primary-accent, 30);
	}
	66% {
		stroke: $primary-accent;
	}
	80%,
	90% {
		stroke: lighten($primary-accent, 30);
	}
}

</style>