const FindJs = require('./js/FindFiles');
class Analysis{
	cssFileMap = {};
	jsFileMap = {};

	Run(){
		this.jsFileMap = FindJs()
	}
}

module.exports = Analysis;