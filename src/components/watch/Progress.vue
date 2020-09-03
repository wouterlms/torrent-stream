<template>
	<div ref="progressBar" class="progress-bar"
		@click="skipTo($event)"
		@mouseenter="onMouseEnter"
		@mousemove="onMouseMove"
		@mouseleave="onMouseLeave">

		<v-tooltip class="progress-bar-hover-seconds" v-if="showHoverSeconds" :style="hoverProgress">
			{{ hoverSecondsReadable }}
		</v-tooltip>
		
		<div class="progress-bar-indicator" :style="currentProgress"></div>
	</div>
</template>

<script>

	import Tooltip from '@/components/global/Tooltip';

	export default {

		components: {
			'v-tooltip': Tooltip
		},

		data() {
			return {
				showHoverSeconds: false,
				hoverSeconds: 0,
			}
		},

		methods: {
			skipTo(e) {
				const seconds = parseInt((e.offsetX / this.$refs.progressBar.clientWidth) * this.duration);

				this.$root.$emit('SKIP_TO', seconds);
			},

			onMouseEnter(e) {
				this.showHoverSeconds = true;

				this.hoverSeconds = parseInt((e.offsetX / this.$refs.progressBar.clientWidth) * this.duration);
			},

			onMouseMove(e) {
				this.hoverSeconds = parseInt((e.offsetX / this.$refs.progressBar.clientWidth) * this.duration);
			},

			onMouseLeave() {
				this.showHoverSeconds = false;
			},
		},
		
		computed: {
			isPaused() {
				return this.$store.getters.isPaused;
			},

			currentTime() {
				return this.$store.getters.currentTime;
			},

			duration() {
				return this.$store.getters.duration;
			},

			progress() {
				return (this.currentTime / this.duration) * 100;
			},

			hoverSecondsReadable() {
				return new Date(this.hoverSeconds * 1000).toISOString().substr(12, 7);
			},

			currentProgress() {
				return {
					width: `${this.progress}%`
				}
			},

			hoverProgress() {
				return {
					left: `${(this.hoverSeconds / this.duration) * 100}%`,
				}
			}
		}
	}
</script>

<style scoped lang="scss">

.progress-bar {
	position: relative;

	height: 3px;
	margin: 0 2rem;

	background: darken($primary-light, 80);
	cursor: pointer;

	&-indicator {
		height: 100%;
		width: 0;
		background: $primary-accent;
		transition: .3s;

		z-index: 2;
	}
}

</style>