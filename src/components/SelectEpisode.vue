<template>
	<div class="select-episode">
		<form @submit.prevent="onSubmit">
			<h1>Please select an episode</h1>

			<div class="select-episode__list">
				<div class="select-episode__list__selected" :style="style"></div>
				<ul v-for="movie of multipleMovies" :key="movie.name" ref="movies">
					<input type="radio" :id="movie.name" name="movie" :value="movie" v-model="selectedMovie">
					<label :for="movie.name">
						<h2>{{ SeasonAndEpisode(movie.name) }}</h2>
						<h3>{{ title(movie.name) }}</h3>
					</label>
				</ul>
			</div>

			<div class="select-episode__buttons">
				<v-button type="submit" :disabled="!selectedMovie" disabled-msg="No episode selected">Watch</v-button>

				<v-button to="/" class="cancel">Cancel</v-button>
			</div>
		</form>
	</div>
</template>

<script>

	import Button from '@/components/global/Button';

	const ptt = require("parse-torrent-title");

	export default {
		components: {
			'v-button': Button,
		},

		data() {
			return {
				selectedMovie: null,
				itemHeight: 0,
			}
		},

		created() {
			if (!this.multipleMovies) {
				this.$router.push('/');
			}
		},

		mounted() {
			this.itemHeight = this.$refs.movies[0].clientHeight;
		},

		methods: {
			onSubmit() {
				this.$store.commit('SET_MOVIE_TITLE', this.selectedMovie.name);
				this.$router.push('/watch');
			},

			title(name) {
				const obj = ptt.parse(name);

				return obj.title;
			},

			SeasonAndEpisode(name) {
				const obj = ptt.parse(name);
				return `Season ${obj.season}, episode ${obj.episode}`
			}
		},

		computed: {
			multipleMovies() {
				return this.$store.getters.multipleMovies;
			},

			selectedMovieIndex() {
				return this.selectedMovie ? this.multipleMovies.indexOf(this.selectedMovie) : -1;
			},

			style() {
				return {
					transform: `translateY(${this.selectedMovieIndex * this.itemHeight}px)`,
					height: `${this.itemHeight}px`
				}
			}
		}
	}
</script>

<style scoped lang="scss">

.button {
	min-width: auto;
}

.cancel {
	background: transparent;
	
	::v-deep span {
		color: $error;
	}
}

.select-episode {
	@include center;

	min-height: 100vh;
	padding: 2rem;
	min-width: 600px;

	h1 {
		margin: 1rem;
		color: darken($primary-light, 20);
	}

	input[type=radio] {
		display: none;
	}

	&__list {
		position: relative;
		max-height: 60vh;
		overflow-y: scroll;

		&__selected {
			position: absolute;
			left: 0;
			width: 100%;
			height: 50px;

			background: lighten($primary-dark, 5);
			transition: .5s cubic-bezier(0.075, 0.82, 0.165, 1);
		}
	}

	form {
		width: 100%;
		max-width: 600px;

		background: $secondary-dark;
		border: 1px solid $dark3;
		border-radius: 3px;

		label {
			position: relative;
			display: block;
			color: $primary-light;

			padding: 1rem;
			transition: .3s;

			cursor: pointer;

			z-index: 1;

			h2 {
				margin-bottom: .5rem;
			}

			h3 {
				text-transform: uppercase;
				font-size: .8rem;

				color: darken($primary-light, 20);
			}
		}
	}

	&__buttons {
		padding: 1rem;
	}
}

</style>