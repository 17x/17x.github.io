const Tool = {
	pathPostfixJs : (path) => {
		return (/\.{1}js/g).test(path) ? path : path + '.js';
	}
};

module.exports = Tool;