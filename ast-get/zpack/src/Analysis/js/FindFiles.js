const path = require('path');
const fs = require('fs');
const { Parser } = require('acorn');
const stage3 = require('acorn-stage3');
const acornStage3 = Parser.extend(stage3);
const fileMap = require('../../allFileMap');
/*
* 获取 ast 中所有的 import
* 解析依赖路径文件
* */
const getImportList = (node, fileFullPath) => {
	const fileDir = path.dirname(fileFullPath);

	let list = node.body.filter(node => node.type === 'ImportDeclaration');

	list.map(node => {
		let dependFileFullPath = path.resolve(fileDir, node.source.value);

		FindFiles(dependFileFullPath);
	});
};

/*
* 解析一个文件路径，解析依赖
* 获取每个依赖文件是否有 export，（如无，则忽略该引用）
* # 统计文件被依赖次数以及大小
* 将文件加入监控（如需）
* 将文件加入 file map
* */
const FindFiles = (fileFullPath) => {
	if(!fileFullPath.endsWith('.js')){
		fileFullPath += '.js';
	}

	if(fileMap[fileFullPath]){
		return;
	}

	let fileContent = fs.readFileSync(fileFullPath, { encoding : 'utf8' });

	fileMap[fileFullPath] = {
		depends : [],
		fileStr : fileContent
	};

	try{
		let ast = acornStage3.parse(
			fileContent,
			{
				ecmaVersion : '2020',
				sourceType : 'module'
			}
		);

		fileMap[fileFullPath]['ast'] = ast;

		getImportList(ast, fileFullPath);

	} catch(err){
		console.log(err);
	}
};

module.exports = FindFiles;