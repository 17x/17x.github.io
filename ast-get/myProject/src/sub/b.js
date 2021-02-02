import A from './a.js';

class B{
	static obj = {
		num : 0
	};

	constructor({ config } = {}){

	}

	static plus(){
		A.obj.num++;
	}
}

export default B;