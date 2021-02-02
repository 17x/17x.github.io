import B from './b.js';

class A{
	static obj = {
		num : 0
	};

	constructor(props){

	}

	static plus(){
		B.obj.num++;
	}
}

export default A;