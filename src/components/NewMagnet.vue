<template>
	<section class="new-magnet">
		<form @submit.prevent="onSubmit()">

			<label>
				<h2>
					<span>Magnet Link</span>
					<span class="error" v-if="error">| {{ error }}</span>
				</h2>
				<input-field v-model="magnetLink"></input-field>
			</label>

			<v-button
				type="submit"
				:loading="loading"
				:disabled="!isValidMagnet"
				disabled-msg="Not a valid magnet link!"
				icon="popcorn"
			>Watch</v-button>

			<v-button to="/history" class="history" icon="history" tooltip="Watch History"></v-button>
		</form>
	</section>
</template>

<script>

	import InputField from '@/components/global/InputField';
	import Button from '@/components/global/Button';

	export default {

		components: {
			'input-field': InputField,
			'v-button': Button,
		},
		
		data() {
			return {
				magnetLink: '',
				loading: false,
				error: null,
			}
		},

		watch: {
			error: function() {
				this.loading = false;
			}
		},

		methods: {

			onSubmit() {
				this.error = null;
				this.loading = true;

				this.$store.commit('SET_MAGNET_LINK', this.magnetLink);
				
				this.getFiles(async files => {
					
					if (files.length) {

						const movies = [];

						files.forEach(file => {
							if (this.isMovie(file.name)) {
								movies.push(file);
							}
						});

						if (movies.length) {
														
							if (movies.length === 1)
							{
								this.$store.commit('SET_MOVIE_TITLE', movies[0].name);
								this.$router.push('/watch');
							}
							else
							{
								movies.sort((a, b) => {
									return (a.name > b.name) ? 1 : -1;
								});

								this.$store.commit('SET_MULTIPLE_MOVIES', movies);
								this.$router.push('/select-episode');
							}
						} else {
							this.error = 'No movie found!';
						}

					} else {
						this.error = 'No files were found!';
					}
				});
			},

			getFiles(cb) {
				try {
					const engine = window.torrentStream(this.magnetLink, { path: null });

					engine.on('ready', () => {
						engine.destroy();
						cb(engine.files);
					});
				} catch(err) {
					this.error = 'Malformed magnet link!';
				}
			},

			isMovie(filename) {
				const ext = filename.split('.').pop().toLowerCase();
				switch (ext) {
					case 'mp4':
					case 'avi':
					case 'mov':
					case 'mkv':
					case 'wmv':
						return true;
					default:
						return false;
				}
			},
		},

		computed: {
			isValidMagnet() {
				return this.magnetLink && this.magnetLink.match(/magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32}/i) !== null;
			},

			torrentFolderPath() {
				return this.$store.getters.torrentFolderPath;
			}
		}
	}
</script>

<style scoped lang="scss">

.new-magnet {

	padding: 2rem;

	width: 100%;
	max-width: 650px;

	form {
		.history {
			margin-left: 1rem;
			min-width: auto;

			::v-deep svg {
				fill: $primary-light;
			}
		}
	}

	label {
		display: block;
		margin-bottom: 1rem;

		h2 {
			font-size: .8rem;
			text-transform: uppercase;
			margin-bottom: .5rem;
			
			display: flex;
			align-items: center;

			span {
				font-weight: 500;

				&:nth-of-type(1) {
					color: darken($primary-light, 20);
					margin-right: .2rem;
				}

				&.error {
					color: $error;
				}
			}
		}
	}
}

</style>