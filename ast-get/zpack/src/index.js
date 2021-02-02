const fs = require('fs');
const path = require('path');
const Server = require('./Server');
const fileMap = require('./allFileMap');
const lvd = require('./lvd');
const Pipe = require('./Pipe');
const Tool = require('./Tool');
const FindFiles = require('./Analysis/js/FindFiles');
const BabelFile = require('./BabelFile');
const WriteFile = require('./WriteFile');

const onInitFinish = ({ port }) => {
	server();
	lvd();
};

const zpack = ({
	config : {
		entry,
		release,
		mode = 'dev',
		pipes = [],
		resolve = null,
		server = null
	} = {},
	_basedir = null
}) => {
	entry = Tool.pathPostfixJs(entry);

	const entryFullPath = path.resolve(_basedir, entry);
	const releaseFullPath = path.resolve(_basedir, release);

	if(mode === 'dev'){
		// let port =
		// console.log(Server);
		/*lvd.start({
			outputDir : release,
			port : Server.port
		});*/
		// Server.start({ gzip : Server.gzip });
		// console.log(Server);
	}

	if(mode === 'build'){

	}

	pipes.map(pipe => {
		Pipe[pipe.extension] = {
			...pipe
		};
	});

	// 逐级向上查找引用 js css 中的 img 等
	// 建立文件hash表
	// pipe 配置解析，不同文件建立不同的配置方式
	// 包拆解配置解析
	// 输出文件
	// 模式区分
	// dev 模式，建立服务器，开启 liverelaod 等
	// 回调(如有)

	// 建立文件表
	FindFiles(entryFullPath);

	// let jsFiles = 'const zPackFileMap = {};const zPackLoad = ()=>{};';
	let jsFiles = ''
	let _i  = 0;
	// let file
	for(let i in fileMap){
		if(fileMap.hasOwnProperty(i)){
			let file = fileMap[i];
			console.log(i);
			BabelFile(file);
			// console.log(file);
			// jsFiles += `zpack(${file.fileStr.code})`;
			jsFiles += `${file.fileStr.code}`;
			i++
		}
	}

	// console.log(jsFiles);

	// console.log(releaseFullPath);
	WriteFile({
		filename : 'build.js',
		path : releaseFullPath,
		code : jsFiles,
		callback : (e) => {
			console.log('end', e);
		}
	});

};

module.exports = zpack;