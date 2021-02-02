const fs = require('fs');

const watch = (fileFullPath, onChange) => {
	fs.watch(fileFullPath, {}, () => {
		onChange && onChange();
	});
};

module.exports = watch;