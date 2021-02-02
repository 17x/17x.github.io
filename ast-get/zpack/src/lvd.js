const lvd = require('livereload');

let _o = null;

const func = {
	start : ({
		outputDir,
		config
	}) => {
		// console.log(config);
		_o && _o.close();
		_o = lvd.createServer(config);
		_o.watch(outputDir);
	},
	stop : () => {
		_o && _o.close();
	}
};

module.exports = func;