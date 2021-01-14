class Resolve{
	static GetSection(row, col){
		let i = 0;
		let j = 0;
		let secIndex = 0;

		if(row <= 2){
			i = 0;
		} else if(row <= 5){
			i = 1;
		} else{
			i = 2;
		}

		if(col <= 2){
			secIndex = 0;
			j = 0;
		} else if(col <= 5){
			secIndex = 0;

			i = 1;
		} else{
			i = 2;
		}

	}

	static GetSectionByPos(row, col){
		switch(row){

		}
	}

	static GetSectionByIndex(row, col){
		switch(row){

		}
	}

	static CheckDuplicated(){
		let _f = false;

		return _f;
	}

	static Do(data){

		let currRow = 0;
		let currCol = 0;
		let currSection = 0;

		/*		for(let i in data){
					currRow = i.split('_')[0];
					currCol = i.split('_')[1];
					// currSection;
				}*/

		// 为空格填上一个数字
		// 判断三种规则是否通过
		// row
		// col
		// section
		// 如通过
		// 进行下一个
		// 如不通过，返回上一个步骤判断

		const action = (i) => {
			let nextResult = false;
			action(i + 1);

			if(!nextResult){
				return;
			}
		};

		// 从第一个开始
		action(0);
	}
}

export default Resolve;