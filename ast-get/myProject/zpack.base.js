const entry = './src/index';
const release = './build';
const pipes = [
	{
		extension : 'js',
		excludes : '/node_modules/g',
		handle : {}
	}, {
		extension : 'scss',
		excludes : '/node_modules/g',
		handle : {}
	}
];
const resolve = {
	'sdk' : ''
};

module.exports = {
	entry,
	release,
	pipes,
	resolve
};