const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const root = document.documentElement;
const fontInput = document.querySelector('#fontInput');
const fontSelect = document.querySelector('#fontSelect');
const fontUpload = document.querySelector('#fontUpload');
const startMissionBtn = document.querySelector('#startMission');
const fontStyle = document.querySelector('#fontStyle');
const resultTable = document.querySelector('#resultTable');
const oResult = document.querySelector('#result');
const oResultP = document.querySelector('#result>p');
const logArea = document.querySelector('#logArea');
const fontArray = ['Microsoft Yahei'];
let defaultFont = 'Arial';
let currFont = '';
let errorCharArray = [];
const defaultTestCharacters = '前后上下左右';
// 默认字体时的字符数据
// 用来判断 上传/选择/输入 的字体是否生效
let defaultFontTestCharsData = null;
let canvasWidth = 100;
let canvasHeight = 30;
let downloadData = null;

canvas.width = canvasWidth;
canvas.height = canvasHeight;
ctx.textBaseline = 'top';
// document.body.append(canvas);

// 设置一个字体
// 成功设置后返回 true
const setFont = (fontName) => {
	console.log('尝试设置新的字体:', fontName);
	let _f = false;
	let newData = null;

	ctx.font = `15px ${ fontName }`;
	newData = getFontCharactersData(defaultTestCharacters, fontName);

	// 首次
	// 或与上次不相同
	if(newData !== defaultFontTestCharsData){
		if(!defaultFontTestCharsData){
			defaultFontTestCharsData = newData;
		}

		_f = true;
		oResultP.innerHTML = `当前字体: ${ fontName }`;
		logArea.innerHTML = '';
		currFont = fontName;
	} else{
		console.log('字体数据与默认字体数据相同，设置失败');
		// logArea.innerHTML = '字体设置失败';
	}

	return _f;
};

// 判定一个字体是否支持某个字符
const determineCharSupported = (char) => {
	ctx.fillText(char, 0, 0);
	let a = ctx.getImageData(0, 0, 30, 30);

	document.body.append(canvas);
	// console.log(a);

	// return
};

// 设置字体后使用canvas渲染一段文字
const getFontCharactersData = (str, f) => {
	let jData = null;

	ctx.font = `15px ${ f }`;
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	ctx.fillText(str, 0, 0);

	jData = [...ctx.getImageData(0, 0, canvasWidth, canvasHeight).data].join('');

	return jData;
};

// 开始任务
const startMission = () => {
	// 用此字符与每一个字符做对比
	// 相同的则代表不支持
	// 不同字体的方块数据相同
	let nonSupportCharData = getFontCharactersData(String.fromCharCode(100000000), currFont);

	logArea.innerHTML = '测试开始';
	errorCharArray = [];

	foo(0);

	function foo(_i){
		let { description, total, range } = codeJson[_i];
		let startCode = parseInt(range.split('-')[0], 16);
		let endCode = parseInt(range.split('-')[1], 16);

		errorCharArray[_i] = [];

		logArea.innerHTML = '测试开始,\n 正在测试： ' + description;

		setTimeout(() => {
			for(let i = startCode; i <= endCode; i++){
				let currFontCharData = getFontCharactersData(String.fromCharCode(i), currFont);
				let defaultFontCharData = getFontCharactersData(String.fromCharCode(i), defaultFont);
				// console.log(currFont,defaultFont);
				// A. 和方块数据完全相同 即代表字符无法展示
				// B. 当渲染同一个字符时，此字体数据和默认字体数据相同
				// 即代表此字体渲染当前字符时 fallback
				if(
					currFontCharData === nonSupportCharData ||
					currFontCharData === defaultFontCharData
				){
					errorCharArray[_i].push(i);
				}
			}

			_i++;

			if(_i === codeJson.length - 1){
				// alert('完成');
				logArea.innerHTML = '完成';
				showTestingResult();
				// downloadTestData();
			} else{
				foo(_i);
			}
		}, 0);
	}
};

// 显示测试结果
const showTestingResult = () => {
	let oTBody = resultTable.tBodies[0];
	let s = '';

	downloadData = '所属字符集,总计可用数量,无效数量,无效字符占比,字符列表\n';

	errorCharArray.map((ele, index) => {
		// console.log(index);
		let { description, total } = codeJson[index];
		let invalid = ele.length;
		let per = ((ele.length / total).toFixed(4) * 100).toFixed(4) + '%';
		let invalidStr = ele.join('-');

		if(!invalidStr){
			invalidStr = 'N/A';
		}

		total = parseInt(codeJson[index].total);
		downloadData += `${ description },${ total },${ invalid },${ per },${ invalidStr }\n`;

		s += `
			<tr>
				<td>${ description }</td>
				<td>${ total }</td>
				<td>${ ele.length }</td>
				<td>${ per }</td>
				<td><div class="err-list">${ invalidStr }</div></td>
			</tr>
		`;
	});

	oTBody.innerHTML = s;
	resultTable.style.display = 'block';
};

// 下载文件
const downloadTestData = () => {
	let a = document.createElement('a');

	if('download' in a){
		// let dataUrl = 'text/csv;charset=utf-8,' + encodeURIComponent(downloadData);
		let dataUrl = new Blob(['\ufeff' + downloadData], { type : 'text/csv,charset=UTF-8' });

		dataUrl = URL.createObjectURL(dataUrl);
		// console.log(downloadData);
		// console.log(dataUrl);

		a.setAttribute('href', dataUrl);
		a.setAttribute('download', currFont + '.csv');
		a.target = '_blank';
		a.click();
	}
};

// 输入
fontInput.addEventListener('keyup', function(e){
	if(this.value.trim()){
		setFont(this.value.trim());
	}
});

// 选择
fontSelect.addEventListener('change', function(e){
	setFont(fontSelect.options[fontSelect.selectedIndex].value);
});

// 上传
fontUpload.addEventListener('change', function(e){
	let file = fontUpload.files[0];
	let suffix = file.name.substr(file.name.lastIndexOf('.') + 1, file.name.length);
	let fileName = file.name.replace('.' + suffix, '')
					   .replace(/\s|-/g, '');

	if(suffix !== 'woff' && suffix !== 'woff2' && suffix !== 'ttf' && suffix !== 'otf'){
		alert('仅支持 woff woff2 ttf 字体格式');
		fontUpload.value = '';
		return;
	}

	let fontFormat = {
		woff : 'woff',
		woff2 : 'woff2',
		ttf : 'truetype',
		otf : 'truetype',
		eot : 'eot',
		svg : 'svg'
	};

	fontStyle.appendChild(
		document.createTextNode(`@font-face{
				font-family:"${ fileName }";
				src:url(${ URL.createObjectURL(file) }) format("${ fontFormat[suffix] }");
			}`)
	);

	if(setFont(fileName)){
		root.style.fontFamily = `"${ fileName }"`;
	}
});

// 开始
startMissionBtn.addEventListener('click', function(e){
	startMission();
});

setFont(defaultFont);
// downloadTestData()