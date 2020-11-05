window.addEventListener('DOMContentLoaded', (e) => {
	let sSearch = location.search;

	let sideTable = document.querySelector('#sideTable');
	let oMain = document.querySelector('#main');

	codeJson.map(({ description, total, range }, index) => {
		sideTable.tBodies[0].innerHTML += `<tr>
			<td><a href="javascript:void(0)" data-index="${ index }">${ description }</a></td>
			<td>${ total }</td>
			<td>${ range }</td>
		</tr>`;
	});

	const showCharactersInRange = (index) => {
		let { description, total, range } = codeJson[index];
		let s = '';
		let startCode = parseInt(range.split('-')[0], 16);
		let endCode = parseInt(range.split('-')[1], 16);

		for(let i = startCode; i <= endCode; i++){
			s += String.fromCharCode(i);
		}

		oMain.innerHTML = `<h1>${ description }</h1>${ s }`;
		console.log(description);
	};

	showCharactersInRange(0);

	document.addEventListener('click', (e) => {
		if(e.target.nodeName.toLowerCase() === 'a'){
			showCharactersInRange(parseInt(e.target.dataset.index));
		}
	});
});
