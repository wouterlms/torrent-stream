<template>
	<div class="index">
		<new-magnet></new-magnet>
	</div>
</template>

<script>

	import NewMagnet from '@/components/NewMagnet';

	export default {
		components: {
			NewMagnet,
		}
	}
</script>

<style scoped lang="scss">

.index {
	height: 100vh;
	@include center;
}

</style>