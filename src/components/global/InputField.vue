<template>
	<div>
		<input ref="input" :type="type" :placeholder="placeholder" @input="handleInput" :value="value" v-model="content" spellcheck="false">
	</div>
</template>

<script>

	export default {

		components: {
		},

		props: {
			type: {
				type: String,
				default: 'text',
			},

			placeholder: {
				type: String,
				default: '',
			},

			value: {
				type: String
			}
		},

		data() {
			return {
				content: this.value
			}
		},

		watch: {
			value: function(val) {
				this.content = val;
			}
		},

		methods: {
			handleInput() {
				this.$emit('input', this.content);
			},

			emptyInput() {
				this.content = null;
				this.$emit('input', this.content);
			},
		},

		computed: {
			showEmptyIcon() {
				return this.content && this.content.length;
			}
		}
	}
</script>

<style scoped lang="scss">

div {
	position: relative;
}

button {
	position: absolute;
	top: 50%;
	right: 0;

	padding: 1rem;

	transform: translateY(-50%);

	border: none;
	background: transparent;

	.svg {
		width: 10px;
		height: 10px;

		transform: translateY(-50%);
	}
}

input[type="text"],
input[type="password"],
input[type="email"],
textarea {
	font-family: 'Poppins', sans-serif;
	width: 100%;
	padding: 1rem;

	border: 1px solid $dark3;
	background: $secondary-dark;
	color: $primary-light;

	font-size: .9rem;

	border-radius: 3px;
	transition: border-color .2s;

	&.error {
		border: 1px solid $error;
	}

	&:focus {
		border: 1px solid $primary-accent;
	}
}

input[type="password"] {
	letter-spacing: 3px;

    &::placeholder {
        letter-spacing: normal;
    }
}

</style>