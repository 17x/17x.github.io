const babel = require('@babel/core');
const plugin = require('@babel/plugin-proposal-class-properties');
const preset = require('@babel/preset-env');

module.exports = (file,{}={}) => {
	file.fileStr = babel.transform(file.fileStr, {
		plugins : [plugin],
		presets : [preset],
		sourceType:'module'
	});
	// console.log('-------------');
	// console.log('parsedFile',parsedFile.code);
	/*
	babel.parse(file, {
		plugins : [plugin],
		presets : [preset]
	}, (err, result) => {
		if(err){
			console.error(err);
		} else{
			let { error, code } = uglifyJs.minify(result.code);
			if(error){
				console.error('err',err);
			} else{
				fs.writeFile(path.resolve(to, file), code, 'utf8', function(err){
					if(err){
						console.error(err);
					}
				});
			}
		}
	});
	*/
}
