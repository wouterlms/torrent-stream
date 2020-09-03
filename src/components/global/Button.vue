<template>
	<component class="button"
		:is="btnOrRouterLink"
		:type="type"
		:to="to"
		:disabled="loading || disabled"
		:class="{ loading: loading }"
		@click="$emit('click')"
	>
		<transition name="button-loader-fade">
			<div v-if="loading" class="button-loader"></div>
		</transition>

		<v-tooltip class="button-disabled-msg" v-if="disabledMsg && disabled">
			{{ disabledMsg }}
		</v-tooltip>

		<v-tooltip class="button-tooltip" v-if="tooltip && !disabled">
			{{ tooltip }}
		</v-tooltip>

		<span>
			<v-svg v-if="icon" :icon="icon"></v-svg>
			<span v-if="$slots.default">
				<slot></slot>
			</span>
		</span>
	</component>
</template>

<script>

	import Svg from '@/components/global/Svg';
	import Tooltip from '@/components/global/Tooltip';

	export default {

		components: {
			'v-svg': Svg,
			'v-tooltip': Tooltip
		},

		props: {

			to: {
				type: String,
				required: false,
				default: null
			},

			type: {
				type: String,
				required: false,
				default: 'button'
			},

			disabled: {
				type: Boolean,
				required: false,
				default: false,
			},

			disabledMsg: {
				type: String,
				required: false,
				default: null,
			},

			tooltip: {
				type: String,
				required: false,
				default: null,
			},

			loading: {
				type: Boolean,
				required: false,
				default: false
			},

			icon: {
				type: String,
				required: false,
				default: null
			}

		},

		computed: {
			btnOrRouterLink() {
				return this.to ? 'router-link' : 'button';
			}
		}
	}
</script>

<style scoped lang="scss">

.button {
	font-family: 'Poppins', sans-serif;

	position: relative;
	display: inline-block;
	padding: .8rem 1.4rem;

	min-width: 120px;

	background: $primary-accent;

	border: none;
	border-radius: 3px;
	text-align: center;

	transition: .2s;

	&:disabled {
		cursor: not-allowed;
	}

	&-disabled-msg, &-tooltip {
		opacity: 0;
		pointer-events: none;

		transition: .2s;
	}

	&-disabled-msg {
		&::v-deep {
			color: $error;
			font-weight: 500;
		}
	}

	&:hover &-disabled-msg,
	&:hover &-tooltip {
		opacity: 1;
	}

	&>span {
		position: relative;
		color: $primary-light;

		z-index: 2;
		transition: .2s;

		line-height: .7 !important;
		
		@include center;

		span.svg {
			width: 20px;
			height: 20px;
		}

		span:not(.svg) {
			margin-left: .5rem;
		}
	}

	&-loader {
		position: absolute;
		top: 0;
		left: 0;

		height: 100%;

		background: lighten($primary-accent, 10);
		z-index: 1;

		animation: loader-animation 1.5s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
	}

	&.loading {
		overflow: hidden;
		background: lighten($primary-accent, 5);
	}
}

@keyframes loader-animation {
	0% {
		width: 0;
	}

	50% {
		width: 100%;
		left: 0;
	}
	
	100% {
		width: 0;
		left: 102%;
	}
}

.button-loader-fade {

	&-enter-active, &-leave-active {
		transition: .5s;
	}

	&-enter, &-leave-to {
		opacity: 0;
	}
}

</style>