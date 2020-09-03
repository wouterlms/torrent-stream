export default {
	methods: {
		readableTitle: function(title) {
			const obj = require("parse-torrent-title").parse(title);

			if (obj.episode) {
				// series
				return `${obj.title} - Season ${obj.season} episode ${obj.episode}`;
			} else {
				// movie
				return `${obj.title}`;
			}
		},
	},
}