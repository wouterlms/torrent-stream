<template>
	<span class="svg" v-html="svg"></span>
</template>

<script>
	export default {
		
		props: {
			icon: {
				type: String,
				required: true,
			}
		},
	

		computed: {
			svg() {
				return require(`!html-loader!@/assets/svg/${this.icon}.svg`);
			}
		}
	}
</script>

<style scoped lang="scss">

.svg {
	display: inline-block;
}

</style>