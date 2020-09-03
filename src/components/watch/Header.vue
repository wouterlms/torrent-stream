<template>
	<transition name="fade">
		<header class="header" v-if="isPaused">
			<v-button class="header__back" to="/" icon="back"></v-button>
			<h1>{{ readableTitle(movieTitle) }}</h1>
		</header>
	</transition>
</template>

<script>

	import readableTitleMixin from '@/mixins/readableTitleMixin';
	import Button from '@/components/global/Button';

	export default {

		components: {
			'v-button': Button,
		},

		mixins: [readableTitleMixin],

		computed: {
			movieTitle() {
				return this.$store.getters.movieTitle;
			},

			isPaused() {
				return this.$store.getters.isPaused;
			}
		}
	}
</script>

<style scoped lang="scss">

.header {
	position: absolute;
	top: 0;
	left: 0;

	width: 100%;
	padding: 3rem 2rem;

	display: flex;
	align-items: center;

	background: linear-gradient(180deg, rgba(0,0,0,0.649830879617472) 0%, rgba(0,0,0,0) 100%);
	user-select: none;

	&__back {
		padding: .5rem .7rem;
		min-width: auto;

		font-size: .9rem;
		margin-right: 1rem;

		background: transparent;
	}
}

.fade {

	&-enter-active,
	&-leave-active {
		transition: .3s;
	}

	&-enter,
	&-leave-to {
		opacity: 0;
	}
}


</style>