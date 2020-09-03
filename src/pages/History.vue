<template>
	<div class="history">
		<v-history></v-history>
	</div>
</template>

<script>

	import History from '@/components/History';

	export default {
		components: {
			'v-history': History
		}
	}
</script>

<style scoped lang="scss">

.history {
	height: 100vh;
	padding: 2rem;

	@include center;
}

</style>