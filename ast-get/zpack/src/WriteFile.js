const fs = require('fs');
const path = require('path');

module.exports = ({ filename, path : filePath, code, callback }) => {
	let options = [/*encoding*/];


	filename = path.resolve(filePath, filename);
	console.log(filename);
	fs.writeFile(filename, code, options, callback);
};