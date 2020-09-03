<template>
	<transition name="controls-transition">
		<div class="controls" v-if="hasFinishedLoading && showControls">

			<div class="controls__play-pause">
				<v-button icon="play" v-if="isPaused" @click="play"></v-button>
				<v-button icon="pause" v-else @click="pause"></v-button>
			</div>

			<div class="controls__time-details">
				<p><span>{{ readableCurrentTime }}</span> | <span>{{ readableDuration }}</span></p>
			</div>

			<v-progress></v-progress>

			<div class="controls__right">
				<v-button icon="vlc" tooltip="Open in VLC" :disabled="isVlcDisabled" disabled-msg="No path defined"></v-button>
				<!-- <v-button icon="subtitles" tooltip="Subtitles"></v-button> -->
				<toggle-subtitles></toggle-subtitles>
				<v-button icon="fullscreen" tooltip="Fullscreen" @click="toggleFullscreen()"></v-button>
			</div>
		</div>
	</transition>
</template>

<script>

	import Button from '@/components/global/Button';
	import Progress from '@/components/watch/Progress';
	import ToggleSubtitles from '@/components/watch/ToggleSubtitles';

	export default {

		components: {
			'v-button': Button,
			'v-progress': Progress,
			'toggle-subtitles': ToggleSubtitles,
		},

		data() {
			return {
				hasFinishedLoading: false,
				showControls: true,
				isVlcDisabled: true,

				hideControlsTimeout: null,
			}
		},

		mounted() {
			document.addEventListener('mousemove', this.onMouseMove);
			document.addEventListener('dblclick', this.onDblClick);
			document.addEventListener('keyup', this.onKeyPress);
		},

		beforeDestroy() {
			document.removeEventListener('mousemove', this.onMouseMove);
			document.removeEventListener('dblclick', this.onDblClick);
			document.removeEventListener('keyup', this.onKeyPress);

			clearTimeout(this.hideControlsTimeout);
			document.body.style.cursor = 'auto';
		},

		watch: {
			duration: function() {
				this.hasFinishedLoading = true;
			},
		},

		methods: {
			play() {
				this.$root.$emit('PLAY');
				this.startHideControlsTimeout();
			},

			pause() {
				clearTimeout(this.hideControlsTimeout);
				this.$root.$emit('PAUSE');
			},

			toggleFullscreen() {
				document.fullscreenElement === null ? this.$root.$emit('FULLSCREEN') : document.exitFullscreen();
			},

			onMouseMove() {
				clearTimeout(this.hideControlsTimeout);

				this.showControls = true;
				document.body.style.cursor = 'auto';

				if (!this.isPaused) {
					this.startHideControlsTimeout();
				}
			},

			startHideControlsTimeout() {
				this.hideControlsTimeout = setTimeout(() => {

					if (!this.isPaused) {
						this.showControls = false;
						document.body.style.cursor = 'none';
					}

				}, 3000);
			},

			onDblClick(e) {
				if (e.target.className === 'watch' || e.target.className === '') {
					this.toggleFullscreen();
				}
			},

			onKeyPress(e) {
				switch(e.keyCode) {
					case 27:
						// escape
						document.fullscreenElement === null ? this.$router.push('/') : document.exitFullscreen();
						break;

					case 32:
						//  space
						e.preventDefault();
						this.isPaused ? this.play() : this.pause();
						break;

					case 37:
						// arrow left
						this.$root.$emit('SKIP_TO', this.currentTime - 5);
						break;

					case 39:
						// arrow right
						this.$root.$emit('SKIP_TO', this.currentTime + 5);
						break;
				}
			}
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

			readableCurrentTime() {
				if (this.currentTime) {
					return new Date(this.currentTime * 1000).toISOString().substr(12, 7);
				}
				return '0:00:00';
			},

			readableDuration() {
				if (this.duration) {
					return new Date(this.duration * 1000).toISOString().substr(12, 7);
				}
				return '0:00:00';
			},
		}
	}
</script>

<style scoped lang="scss">

.controls {
	position: fixed;
	bottom: 1.5rem;
	left: 50%;

	width: calc(100% - 3rem);
	padding: 1.3rem;

	border-radius: 5px;

	background: rgba(0, 0, 0, 0.4);
	backdrop-filter: blur(10px);
	border: 1px solid $dark3;

	transform: translateX(-50%);

	display: grid;
	grid-template-columns: 30px 120px auto 105px;
	align-items: center;

	user-select: none;

	&__play-pause {

		button {
			border: none;
			background: transparent;
			min-width: auto;
			padding: 0;

			margin-top: 3px;

			::v-deep .svg {
				width: 1rem !important;
				height: 1rem !important;
			}
		}
	}

	&__time-details {
		font-size: .85rem;
		white-space: nowrap;
		margin-left: 1rem;

		@include center;
		justify-content: space-between;
	}

	&__right {
		@include center;
		justify-content: space-between;

		button {
			border: none;
			background: transparent;
			min-width: auto;
			padding: 0;

			::v-deep .svg {
				width: 1.2rem !important;
				height: 1.2rem !important;
			}
		}
	}

}

.controls-transition {
	&-enter-active,
	&-leave-active {
		transition: .5s ease;
	}

	&-enter {
		transform: translate(-50%, calc(100% + 1.5rem));

		&-to {
			transform: translate(-50%, 0);
		}
	}

	&-leave {
		transform: translate(-50%, 0);

		&-to {
			transform: translate(-50%, calc(100% + 1.5rem));
			opacity: 0;
		}
	}
}

</style>