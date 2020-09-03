export default {
	methods: {
		log: function(file, msg) {
			console.log(`%c[INFO] ${file} - ${msg}`, 'color: #808fff');
		},
	},
}