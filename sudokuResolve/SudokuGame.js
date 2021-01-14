const RandomNumIn = (max) => {

};
export default class SudokuGame{
	resultData = {};
	coverData = {};
	markData = {};
	gameData = {};

	constructor(){
		// cells
		for(let i = 0; i < 9; i++){
			for(let j = 0; j < 9; j++){
				let section;

				if(i < 3 && j < 3){
					section = 0;
				} else if(i < 3 && j < 6){
					section = 1;
				} else if(i < 3 && j < 9){
					section = 2;
				} else if(i < 6 && j < 3){
					section = 3;
				} else if(i < 6 && j < 6){
					section = 4;
				} else if(i < 6 && j < 9){
					section = 5;
				} else if(i < 9 && j < 3){
					section = 6;
				} else if(i < 9 && j < 6){
					section = 7;
				} else if(i < 9 && j < 9){
					section = 8;
				}

				this.gameData[i + '_' + j] = {
					// 真实数据
					result     : 0,
					// 所属区块
					section,
					// 标记
					mark       : '',
					// 填写
					cover      : null,
					// 不可写数据
					isImmutable: false
				};
			}
		}
		console.log(this.gameData);
		// 随机出结果数据
		let currRow = 0;
		let currCol = 0;
		let processing = true;
		let currCell = null;
		let arr = new Array(9).fill(undefined)
		                      .map((ele, index) => index + 1);

		for(let i = 0; i < 9; i++){
			let j = Math.round(Math.random() * arr.length - 1);

			currCell = this.gameData[0 + '_' + i];
			currCell.result = arr.splice(j, 1)[0];
		}

		while(processing){
			let _rowDone = false;

			arr = new Array(9).fill(undefined)
			                  .map((ele, index) => index + 1);

			console.log(currRow, currCol);

			if(currCol === 8){
				currRow = 0;
				currCol += 1;
			} else{
				currCol++;
			}

			if(currRow * currCol > 1000){
				processing = false;
			}
		}
	}

	Check(data){
		let _f = true;

		for(let i in data){
			if(data[i] !== this.gameData[i]){
				_f = false;
				break;
			}
		}

		return _f;
	}
}