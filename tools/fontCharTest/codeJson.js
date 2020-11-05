let codeJson = [
	{
		'total' : 20989,
		'description' : '基本汉字',
		'range' : '4E00-9FFC'
	},
	/*{
		'total' : 74,
		'description' : '基本汉字补充',
		'range' : '9FA6-9FEF'
	},*/
	{
		'total' : 6592,
		'description' : '扩展A',
		'range' : '3400-4DBF'
	},
	{
		'total' : 42718,
		'description' : '扩展B',
		'range' : '20000-2A6DD'
	},
	{
		'total' : 4149,
		'description' : '扩展C',
		'range' : '2A700-2B734'
	},
	{
		'total' : 222,
		'description' : '扩展D',
		'range' : '2B740-2B81D'
	},
	{
		'total' : 5762,
		'description' : '扩展E',
		'range' : '2B820-2CEA1'
	},
	{
		'total' : 7473,
		'description' : '扩展F',
		'range' : '2CEB0-2EBE0'
	},
	{
		'total' : 4939,
		'description' : '扩展G',
		'range' : '30000-3134A'
	},
	{
		'total' : 214,
		'description' : '康熙部首',
		'range' : '2F00-2FD5'
	},
	{
		'total' : 116,
		'description' : '部首扩展',
		'range' : '2E80-2EF3'
	},
	{
		'total' : 474,
		'description' : '兼容汉字',
		'range' : 'F900-FAD9'
	},
	{
		'total' : 542,
		'description' : '兼容扩展',
		'range' : '2F800-2FA1D'
	},
	{
		'total' : 91,
		'description' : 'PUA(GBK)部件',
		'range' : 'E815-E86F'
	},
	{
		'total' : 489,
		'description' : '部件扩展',
		'range' : 'E400-E5E8'
	},
	{
		'total' : 208,
		'description' : 'PUA增补',
		'range' : 'E600-E6CF'
	},
	{
		'total' : 36,
		'description' : '汉字笔画',
		'range' : '31C0-31E3'
	},
	{
		'total' : 12,
		'description' : '汉字结构',
		'range' : '2FF0-2FFB'
	},
	{
		'total' : 43,
		'description' : '汉语注音',
		'range' : '3105-312F'
	},
	{
		'total' : 27,
		'description' : '注音扩展',
		'range' : '31A0-31BA'
	},
	{
		'total' : 1,
		'description' : '〇',
		'range' : '3007-3007'
	}
];

/*
const codeJson1 = [
	{
		// http://www.unicode.org/charts/PDF/U4E00.pdf
		// 中日韩统一表意文字、18030与HKSCS 增补汉字
		description : '基本汉字',
		total : '20902字',
		range : '4E00-9FFC'
	},
	{
		description : '基本汉字补充',
		total : '74字',
		range : '9FA6-9FEF'
	},
	{
		// http://www.unicode.org/charts/PDF/U3400.pdf
		// 扩展A区汉字
		description : '扩展A',
		total : '6582字',
		range : '3400-4DBF'
	},
	{
		// http://www.unicode.org/charts/PDF/U20000.pdf
		// 扩展B区汉字
		description : '扩展B',
		total : '42711字',
		range : '20000-2A6DD'
	},
	{
		// http://www.unicode.org/charts/PDF/U2A700.pdf
		// 扩展C区汉字
		description : '扩展C',
		total : '4149字',
		range : '2A700-2B734'
	},
	{
		// http://www.unicode.org/charts/PDF/U2B740.pdf
		// 扩展D区汉字
		description : '扩展D',
		total : '222字',
		range : '2B740-2B81D'
	},
	{
		// http://www.unicode.org/charts/PDF/U2B820.pdf
		// 扩展E区汉字
		description : '扩展E',
		total : '5762字',
		range : '2B820-2CEA1'
	},
	{
		// http://www.unicode.org/charts/PDF/U2CEB0.pdf
		// 扩展F区汉字
		description : '扩展F',
		total : '7473字',
		range : '2CEB0-2EBE0'
	},
	{
		// https://www.unicode.org/charts/PDF/U30000.pdf
		// 扩展G区汉字
		description : '扩展G',
		total : '4939字',
		range : '30000-3134A'
	},
	{
		// http://www.unicode.org/charts/PDF/U2F00.pdf
		description : '康熙部首',
		total : '214字',
		range : '2F00-2FD5'
	},
	{
		// http://www.unicode.org/charts/PDF/U2E80.pdf
		// 部首补充
		description : '部首扩展',
		total : '115字',
		range : '2E80-2EF3'
	},
	{
		// http://www.unicode.org/charts/PDF/UF900.pdf
		// 中日韩兼容汉字
		description : '兼容汉字',
		total : '477字',
		range : 'F900-FAD9'
	},
	{
		// http://www.unicode.org/charts/PDF/U2F800.pdf
		// 中日韩兼容汉字补充
		description : '兼容扩展',
		total : '542字',
		range : '2F800-2FA1D'
	},
	{
		description : 'PUA(GBK)部件',
		total : '81字',
		range : 'E815-E86F'
	},
	{
		description : '部件扩展',
		total : '452字',
		range : 'E400-E5E8'
	},
	{
		description : 'PUA增补',
		total : '207字',
		range : 'E600-E6CF'
	},
	{
		// http://www.unicode.org/charts/PDF/U31C0.pdf
		// 笔画
		description : '汉字笔画',
		total : '36字',
		range : '31C0-31E3'
	},
	{
		// http://www.unicode.org/charts/PDF/U2FF0.pdf
		description : '汉字结构',
		total : '12字',
		range : '2FF0-2FFB'
	},
	{
		description : '汉语注音',
		total : '43字',
		range : '3105-312F'
	},
	{
		description : '注音扩展',
		total : '22字',
		range : '31A0-31BA'
	},
	{
		description : '〇',
		total : '1字',
		range : '3007'
	}
];
*/
