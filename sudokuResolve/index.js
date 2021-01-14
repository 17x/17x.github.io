import SudokuGame from './SudokuGame.js';
import Resolve from './Resolve.js';

let sg1 = new SudokuGame();
// let result = Resolve.Do(enterData);
const render = (data) => {
	console.log(data);
	let dom = document.getElementById('root');
	let _data = data.gameData;

	for(let i in _data){
		let _ele = document.createElement('div');

		_ele.innerHTML = `${_data[i].result}`

		dom.append(_ele)
	}

};

render(sg1);
