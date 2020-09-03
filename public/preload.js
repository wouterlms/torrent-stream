const torrentStream = require('torrent-stream');
const http = require('http');
const process = require('process');
const fs = require('fs');
const { remote } = require("electron");

window.torrentStream = (magnetLink, opts) => {
	return torrentStream(magnetLink, opts);
}

window.process = () => {
	return process;
}

window.rmDir = (path) => {
	try {
		fs.rmdirSync(path, { recursive: true });
	} catch(err) {
		console.log({ err });
	}
}

window.getCurrentWindow = () => {
	return remote.getCurrentWindow();
}

window.http = () => http;