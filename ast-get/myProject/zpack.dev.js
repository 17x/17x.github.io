const baseConfig = require('./zpack.base');

const server = {
	// livereload : true,
	// host : '',
	port : 9999,
	gzip : true
};

module.exports = {
	...baseConfig,
	mode : 'dev',
	server
};