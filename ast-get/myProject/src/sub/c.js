import A from './a';
import B from './b';

class C{
	static _timer = null;

	constructor({ config } = {}){

	}

	static start(){
		C._timer = setInterval(() => {
			A.plus();
			B.plus();
		}, 1000);
	}

	static end(){
		clearInterval(C._timer);
	}

}

export default C;