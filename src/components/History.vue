<template>
	<div class="history">
		<v-button class="history__back" to="/" icon="back"></v-button>

		<div class="history__list">
			<header>
				<h1>Watch History</h1>
				<v-button @click="clearHistory()">Clear history</v-button>
			</header>

			<ul v-if="watched && Object.keys(watched).length">
				<li v-for="movie of watched" :key="movie.title">
					<span>{{ movie.title }}</span>
					
					<div>
						<v-button v-if="!isFinished(movie)" @click="continueWatching(movie)">Continue</v-button>
						<v-button v-if="isFinished(movie) && movie.nextEpisode" @click="nextEpisode(movie)">Next episode</v-button>
						<p v-if="isFinished(movie) && !movie.nextEpisode">Finished</p>
					</div>

				</li>
			</ul>
			<p v-else class="empty">You haven't watched any movies or series yet!</p>
		</div>

	</div>
</template>

<script>

	// put clean title

	import Button from '@/components/global/Button';

	export default {
		components: {
			'v-button': Button
		},

		data() {
			return {
				watched: null,
			}
		},

		mounted() {
			const unordered = JSON.parse(localStorage.getItem('watched')) || null;
			const ordered = {};

			Object.keys(unordered).sort().forEach((key) => {
				ordered[key] = unordered[key];
			});

			this.watched = ordered;
		},

		methods: {
			continueWatching(movie) {
				this.$store.commit('SET_CURRENT_TIME', movie.currentTime);
				this.$store.commit('SET_MOVIE_TITLE', movie.magnetTitle);
				this.$store.commit('SET_MAGNET_LINK', movie.magnetLink);
				this.$router.push('/watch');
			},

			nextEpisode(movie) {
				this.$store.commit('SET_MOVIE_TITLE', movie.nextEpisode);
				this.$store.commit('SET_MAGNET_LINK', movie.magnetLink);
				this.$router.push('/watch');
			},

			isFinished(movie) {
				const watchedPercentage = movie.currentTime * 100 / movie.duration;
				return watchedPercentage >= 95;
			},

			clearHistory() {
				localStorage.setItem('watched', JSON.stringify({}));
				this.watched = null;
			}
		}
	}
</script>

<style scoped lang="scss">

.history {

	&__back {
		position: absolute;

		top: 4rem;
		left: 2rem;

		padding: .5rem .7rem;
		min-width: auto;

		font-size: .9rem;

		background: transparent;
	}

	&__list {
		max-height: 60vh;
		width: 100%;
		min-width: 500px;
		max-width: 600px;

		overflow-y: scroll;

		background: $secondary-dark;
		border: 1px solid $dark3;
		border-radius: 3px;

		padding: 1.5rem;

		header {
			display: flex;
			align-items: center;
			margin-bottom: 2rem;

			h1 {
				font-size: 1.1rem;
				font-weight: 300;
			}
			
			button {
				margin-left: 1rem;
				min-width: auto;
				padding: .5rem;

				font-size: .8rem;

				::v-deep span {
					margin: 0 !important;
				}
			}
		}

		p.empty {
			opacity: .7;
		}

		ul {
			li {
				display: flex;
				align-items: center;
				justify-content: space-between;

				margin: .5rem 0;
				padding: .5rem 0;
				line-height: 1.5;

				span {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				p {
					font-size: .9rem;
				}

				button {
					padding: .5rem;
					min-width: auto;
					opacity: 0;
					text-transform: uppercase;
					font-weight: 500;
					font-size: .8rem;
					transition: .3s;

					::v-deep span {
						margin: 0 !important;
					}
				}

				&:hover {

					span {
						max-width: 65%;
					}

					button {
						opacity: 1;
					}
				}
			}
		}
	}
}

</style>