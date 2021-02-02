import A from './a';
import B from './b';

class D{
	constructor(){
	}

	static readResult(){
		console.log(A.obj, B.obj);
	}
}

export default D;