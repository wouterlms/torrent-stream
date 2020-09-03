<template>
	<div class="select-episode">
		<select-episode></select-episode>
	</div>
</template>

<script>

	import SelectEpisode from '@/components/SelectEpisode';

	export default {
		components: {
			SelectEpisode,
		}
	}
</script>

<style scoped lang="scss">

.select-episode {
	height: 100vh;
	@include center;
}

</style>