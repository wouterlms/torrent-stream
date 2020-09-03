import Vue from 'vue';
import VueRouter from 'vue-router';

/* Routes */
import Index from '@/pages/Index';
import SelectEpisode from '@/pages/SelectEpisode';
import Watch from '@/pages/Watch';
import History from '@/pages/History';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: Index,
		meta: {
			transition: 'slide-to-right'
		}
	},

	{
		path: '/select-episode',
		component: SelectEpisode,
		meta: {
			transition: 'slide-to-left'
		}
	},

	{
		path: '/watch',
		component: Watch,
		meta: {
			transition: 'slide-to-left'
		}
	},

	{
		path: '/history',
		component: History,
		meta: {
			transition: 'slide-to-left'
		}
	},

	{ path: '*', redirect: '/' }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
