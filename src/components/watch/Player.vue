<template>
	<video autostart="false" ref="video"
	
		@playing="onPlay"
		@pause="onPause"
		@loadedmetadata="onLoadedMetaData"
		@timeupdate="onTimeUpdate"
	
	>
		<source v-if="hasFinishedLoading" :src="`http://127.0.0.1:${port}/0`" type="video/webm">
		<v-subtitles v-if="subtitles"></v-subtitles>
	</video>
</template>

<script>

	import logMixin from '@/mixins/logMixin';
	import Subtitles from '@/components/watch/Subtitles';

	export default {

		components: {
			'v-subtitles': Subtitles,
		},

		mixins: [logMixin],
		
		data() {
			return {
				server: null,
				port: null,
				res: [],

				engine: null,
				file: null,

				video: null,

				hasFinishedLoading: false,
			}
		},

		mounted() {
			this.video = this.$refs.video;
			this.fetchFile();

			this.$root.$on('PLAY', this.onEmitPlay);
			this.$root.$on('PAUSE', this.onEmitPause);
			this.$root.$on('SKIP_TO', this.onEmitSkipTo);
			this.$root.$on('FULLSCREEN', this.onEmitFullscreen);
		},

		beforeDestroy() {

			// Server
			if (this.server) {
				this.log('Player.vue', 'Closing server...');

				this.res.forEach((res) => {
					res.end();
				});

				this.server.close(() => this.log('Player.vue', 'Server closed'));
			}
			
			// Engine
			if (this.engine) {
				this.engine.destroy(() => this.log('Player.vue', 'Engine destroyed'));
			}

			// Events
			this.$root.$off('PLAY', this.onEmitPlay);
			this.$root.$off('PAUSE', this.onEmitPause);
			this.$root.$off('SKIP_TO', this.onEmitSkipTo);
			this.$root.$off('FULLSCREEN', this.onEmitFullscreen);
			
			// Store
			this.$store.commit('SET_IS_PAUSED', true);
			this.$store.commit('SET_IS_LOADING', true);

			// setTimeout(() => {
				this.video.src = null;
				this.video.load();
			// }, 1000);
		},

		methods: {

			onPlay() {
				this.$store.commit('SET_IS_PAUSED', false);
			},

			onPause() {
				this.$store.commit('SET_IS_PAUSED', true);
			},

			onLoadedMetaData() {
				this.$store.commit('SET_DURATION', this.video.duration);
				this.$store.commit('SET_CURRENT_TIME', this.video.currentTime);

				this.$store.commit('SET_IS_LOADING', false);
			},

			onTimeUpdate() {
				this.$store.commit('SET_DURATION', this.video.duration);
				this.$store.commit('SET_CURRENT_TIME', this.video.currentTime);
			},

			onEmitPlay() {
				this.video.play();
			},

			onEmitPause() {
				this.video.pause();
			},

			onEmitSkipTo(seconds) {
				this.video.currentTime = seconds;
			},

			onEmitFullscreen() {
				this.video.parentElement.requestFullscreen();
			},

			fetchFile() {
				this.engine = window.torrentStream(this.magnetLink, { path: null });

				this.engine.on('ready', () => {
					this.engine.files.forEach((file) => {
						file.deselect();
					});

					const file = this.engine.files.filter((file) => file.name === this.movieTitle)[0];
					file.select();

					this.file = file;

					this.createServer();
					this.listen();
				});
			},

			finishLoading() {
				this.hasFinishedLoading = true;
				this.video.currentTime = this.currentTime;
			},

			createServer() {
				this.server = window.http().createServer((req, res) => {
					this.res.push(res);

					const fileSize = this.file.length;
					let range = req.headers.range;

					if (range) {
						const parts = range.replace(/bytes=/, "").split("-");
						const start = parseInt(parts[0], 10);
						const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

						if(start >= fileSize) {
							return res.writeHead(500);
						}
						
						const chunksize = (end - start) + 1;
						const readStream = this.file.createReadStream({ start, end });

						const head = {
							'Content-Range': `bytes ${start}-${end}/${fileSize}`,
							'Accept-Ranges': 'bytes',
							'Content-Length': chunksize,
							'Content-Type': 'video/mp4',
						};

						res.writeHead(206, head);
						readStream.pipe(res);

					} else {
						const head = {
							'Content-Length': fileSize,
							'Content-Type': 'video/mp4',
						}

						res.writeHead(200, head);
						this.file.createReadStream().pipe(res);
					}
				});
			},

			listen() {
				this.server.listen(0, () => {
					this.port = this.server.address().port;
					this.finishLoading();

					this.log('Player.vue', `Server listening @ http://127.0.0.1:${this.port}`);
				});
			},
		},

		computed: {
			movieTitle() {
				return this.$store.getters.movieTitle;
			},

			magnetLink() {
				return this.$store.getters.magnetLink;
			},

			currentTime() {
				return this.$store.getters.currentTime;
			},

			subtitles() {
				return this.$store.getters.subtitles;
			},
		},

	}
</script>

<style scoped lang="scss">

video {
	position: absolute;
	top: 0;
	left: 0;

	width: 100%;
	height: 100vh;

	z-index: -1;

	background: #000;
	user-select: none;

	&::-webkit-media-controls {
		display: none;
	}
}

</style>