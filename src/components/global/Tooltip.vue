<template>
	<transition name="tooltip-transition">
		<p class="tooltip">
			<slot></slot>
		</p>
	</transition>
</template>

<script>
	export default {
		
	}
</script>

<style scoped lang="scss">

.tooltip {
	position: absolute;
	top: 0;
	left: 50%;

	white-space: nowrap;
	font-size: .9rem;

	padding: .5rem;
	background: $secondary-dark;
	
	border: 1px solid $dark3;
	border-radius: 3px;

	transform: translate(-50%, calc(-100% - .8rem));

	z-index: 1;

	&::before {
		content: '';
		
		position: absolute;
		bottom: 0;
		left: 50%;

		transform: translate(-50%, 55%) rotate(45deg);

		width: 10px;
		height: 10px;

		background: $secondary-dark;

		border-bottom: 1px solid $dark3;
		border-right: 1px solid $dark3;
	}
}

.tooltip-transition {
	&-enter-active,
	&-leave-active {
		transition: .2s;
	}

	&-enter,
	&-leave-to {
		opacity: 0;
	}
}

</style>