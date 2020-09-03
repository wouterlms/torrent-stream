import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const movie = {

	state: {
		magnetLink: null,
		movieTitle: null,
		multipleMovies: null,

		subtitles: null,

		isPaused: true,
		isLoading: true,
		currentTime: 0,
		duration: 0,
	},

	mutations: {
		SET_MAGNET_LINK(state, payload) {
			state.magnetLink = payload;
			localStorage.setItem('magnetLink', payload);
		},

		SET_MOVIE_TITLE(state, payload) {
			state.movieTitle = payload;
			localStorage.setItem('movieTitle', payload);
		},

		SET_MULTIPLE_MOVIES(state, payload) {
			state.multipleMovies = payload;
		},

		SET_SUBTITLES(state, payload) {
			state.subtitles = payload;
		},

		SET_IS_PAUSED(state, payload) {
			state.isPaused = payload;
		},

		SET_IS_LOADING(state, payload) {
			state.isLoading = payload;
		},

		SET_CURRENT_TIME(state, payload) {
			state.currentTime = payload;
		},

		SET_DURATION(state, payload) {
			state.duration = payload;
		},
	},

	getters: {
		magnetLink(state) {
			return state.magnetLink || localStorage.getItem('magnetLink');
		},

		movieTitle(state) {
			return state.movieTitle || localStorage.getItem('movieTitle');
		},

		multipleMovies(state) {
			return state.multipleMovies;
		},

		subtitles(state) {
			return state.subtitles;
		},

		isPaused(state) {
			return state.isPaused;
		},

		isLoading(state) {
			return state.isLoading;
		},

		currentTime(state) {
			return state.currentTime;
		},

		duration(state) {
			return state.duration;
		}
	},

};

export default new Vuex.Store({
	modules: {
		movie,
	}
});