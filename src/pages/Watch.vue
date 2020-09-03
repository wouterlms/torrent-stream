<template>
	<div class="watch">
		<v-loader v-if="isLoading" class="loader"></v-loader>
		<v-header></v-header>
		<v-player></v-player>
		<v-controls></v-controls>
	</div>
</template>

<script>

	import Loader from '@/components/global/Loader';
	import Header from '@/components/watch/Header';
	import Player from '@/components/watch/Player';
	import Controls from '@/components/watch/Controls';

	import readableTitleMixin from '@/mixins/readableTitleMixin';
	import logMixin from '@/mixins/logMixin';

	const ptt = require("parse-torrent-title");

	export default {
		components: {
			'v-loader': Loader,
			'v-header': Header,
			'v-player': Player,
			'v-controls': Controls,
		},

		mixins: [readableTitleMixin, logMixin],

		created() {
			this.updateWatchHistory();
		},

		beforeDestroy() {
			this.updateMovieTime();
		},

		methods: {
			async updateWatchHistory() {
				const watched = JSON.parse(localStorage.getItem('watched'));
				const obj = ptt.parse(this.movieTitle);
				const title = obj.title;
				const episode = obj.episode;

				if (episode) {
					// series
					this.log('Watch.vue', `Watching ${title} episode ${episode}`);

					if (watched[title]) {
						watched[title].magnetTitle = this.movieTitle;
						watched[title].episode = episode;
						watched[title].nextEpisode = await this.getNextEpisode(episode);
					} else {
						watched[title] = {
							title: title,
							episode: episode,
							magnetTitle: this.movieTitle,
							magnetLink: this.magnetLink,
							nextEpisode: await this.getNextEpisode(episode),
							currentTime: 0,
							duration: 0,
						}
					}

				} else {
					// movie
					this.log('Watch.vue', `Watching ${title}`);

					if (!watched[title]) {
						watched[title] = {
							title: title,
							magnetTitle: this.movieTitle,
							magnetLink: this.magnetLink,
							currentTime: 0,
							duration: 0,
						}
					}
				}

				localStorage.setItem('watched', JSON.stringify(watched));
			},

			updateMovieTime() {
				const watched = JSON.parse(localStorage.getItem('watched'));
				const obj = ptt.parse(this.movieTitle);
				const title = obj.title;

				watched[title].currentTime = this.currentTime;
				watched[title].duration = this.duration;

				// // Update localstorage
				localStorage.setItem('watched', JSON.stringify(watched));
			},

			getNextEpisode(currentEpisode) {
				
				return new Promise((resolve) => {
					const engine = window.torrentStream(this.magnetLink);

					let nextEpisode;

					if (currentEpisode < 9) {
						nextEpisode = `e0${currentEpisode + 1}`; 
					} else {
						nextEpisode = `e${currentEpisode + 1}`; 
					}

					this.log('Watch.vue', `Searching for episode ${currentEpisode + 1}...`);
							
					engine.on('ready', () => {
						const next = engine.files.filter(file => file.name.toLowerCase().includes(nextEpisode))[0];
						
						if (next)
						{
							this.log('Watch.vue', 'Episode found!');
							resolve(next.name);
						} 
						else
						{
							this.log('Watch.vue', 'No episode was found.');
							resolve(null);
						}

						engine.destroy();
					});
				});

			}
		},
		
		computed: {
			magnetLink() {
				return this.$store.getters.magnetLink;
			},

			movieTitle() {
				return this.$store.getters.movieTitle;
			},

			currentTime() {
				return this.$store.getters.currentTime;
			},

			duration() {
				return this.$store.getters.duration;
			},

			isLoading() {
				return this.$store.getters.isLoading;
			},
		}
	}
</script>

<style scoped lang="scss">

.watch {
	height: 100vh;
}

.loader {
	position: absolute !important;
	margin: 0 !important;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

</style>