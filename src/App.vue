<template>
	<div id="app">
		<v-header></v-header>
		<transition :name="$route.meta.transition">
			<router-view/>
		</transition>
	</div>
</template>

<script>

	import Header from '@/components/page/Header';

	export default {

		components: {
			'v-header': Header,
		},
		
		mounted() {
			const tmpFolderPath = `${window.process().env.TMP}/torrent-stream`;

			window.addEventListener('beforeunload', () => {
				// window.rmDir(tmpFolderPath);
			});

			this.initLocalStorage();
		},

		methods: {
			initLocalStorage() {
				if (!localStorage.getItem('watched')) {
					localStorage.setItem('watched', JSON.stringify({}));
				}
			}
		}
	}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

body {
	font-family: 'Poppins', sans-serif !important;
	background: $primary-dark;

	overflow-x: hidden;
	width: 100%;
}

::-webkit-scrollbar {
	display: none;
}

*,
*::before,
*::after {
	box-sizing: border-box;
	-webkit-tap-highlight-color: rgba(0,0,0,0);
}

p {
    line-height: 1.7;
}

img {
    width: 100%;
	height: 100%;
	
    object-fit: cover;
}

h1 {
    line-height: 1.3;
}

h1, h2, h3, h4, h5, h6, p, li, a, span, button, input {
	color: $primary-light;
}

// 
// TRANSITIONS
// 

$page-transition: cubic-bezier(0.785, 0.135, 0.15, 0.86);

.slide-to-left {

	&-enter-active,
	&-leave-active {
		position: absolute;
		width: 100%;
	}

	&-enter {
		transform: translateX(100vw);

		&-active {
			transition: .8s $page-transition;
		}

		&-to {
			transform: translateX(0);
		}
	}

	&-leave {
		transform: translateX(0);

		&-active {
			transition: .8s $page-transition;
		}

		&-to {
			transform: translateX(-100vw);
			opacity: 0;
		}
	}
}

.slide-to-right {

	&-enter-active,
	&-leave-active {
		position: absolute;
		width: 100%;
	}

	&-enter {
		transform: translateX(-100vw);

		&-active {
			transition: .8s $page-transition;
		}

		&-to {
			transform: translateX(0);
		}
	}

	&-leave {
		transform: translateX(0);

		&-active {
			transition: .8s $page-transition;
		}

		&-to {
			transform: translateX(100vw);
			opacity: 0;
		}
	}
}


</style>