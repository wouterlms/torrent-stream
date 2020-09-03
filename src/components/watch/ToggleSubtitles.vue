<template>
	<v-button icon="subtitles" tooltip="Subtitles" :class="{ loaded : subtitles }" @click="toggleSubtitles()"></v-button>
</template>

<script>

	import Button from '@/components/global/Button';

	export default {
		components: {
			'v-button': Button,
		},

		data() {
			return {
				fileInput: null,
			}
		},

		mounted() {
			this.fileInput = document.createElement('input');
			this.fileInput.type = 'file';
			this.fileInput.addEventListener('change', this.onFileInput);
		},

		beforeDestroy() {
			this.fileInput.removeEventListener('change', this.onFileInput);
		},

		methods: {

			toggleSubtitles() {
				this.subtitles ? this.$store.commit('SET_SUBTITLES', null) : this.browse();
			},

			browse() {
				this.fileInput.click();
			},

			onFileInput() {
				const file = this.fileInput.files[0];

				this.fileInput.value = null;

				if (file) {

					const extension = this.getExtension(file.name);

					if (extension === 'srt') {
						this.$store.commit('SET_SUBTITLES', file);
					}
				}
			},

			getExtension(filename) {
				const parts = filename.split('.');
				return parts[parts.length - 1];
			},
		},

		computed: {
			subtitles() {
				return this.$store.getters.subtitles;
			},
		}
	}
</script>

<style scoped lang="scss">

button.loaded {
	::v-deep svg {
		fill: $primary-accent;
	}
}

</style>