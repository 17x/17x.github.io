class MainCanvas{
	// chair
	// rug
	// table

	static Render(ctx){
		// Llama;

	}
}

class Llama{
	static cvs = null;
	// ears
	// 	left right
	//  eyeballs
	//  double-click happy and reset clothing status
	// head
	// eyes
	// 	blink
	// nose and mouse
	// 	happy status
	// body
	// 	shirt
	//    double click change status
	//  jacket
	//  left hand
	//    double click rotate
	//  pen
	//    click rotate
	// legs
}

class Clock{

	static Render(ctx){

	}
}

window.onload = () => {
	const cv1 = window.cv1;
	const ctx = cv1.getContext('2d');
	const cvsSize = {
		width : window.innerWidth < 1400 ? 1400 : window.innerWidth,
		height : window.innerHeight < 800 ? 800 : window.innerHeight
	};

	// set rect
	cv1.width = cvsSize.width;
	cv1.style.width = cvsSize.width + 'px';
	cv1.height = cvsSize.height;
	cv1.style.height = cvsSize.height + 'px';

	const Throttle = (fn, threshold = 1000) => {
		let timer;
		let _last = false;

		return (e) => {
			if(!_last){
				_last = true;

				fn(e);

				timer = setTimeout(() => {
					// reset
					_last = null;
				}, threshold);
			}
		};
	};

	const Render = () => {
		ctx.clearRect(0, 0, cvsSize.width, cvsSize.height);
		MainCanvas.Render(ctx);
	};

	const StartEvents = () => {
		const raf = window.requestAnimationFrame
			|| window.webkitRequestAnimationFrame
			|| window.mozRequestAnimationFrame
			|| window.oRequestAnimationFrame
			|| window.msRequestAnimationFrame;

		const func = () => {
			// 找出所有与空白点有交集的点
			Render();
			raf(func);
		};

		func();

		cv1.onmouseenter = () => {

		};
		cv1.onmouseout = () => {

		};

		document.addEventListener('mousemove', Throttle((e) => {
			if(e.target !== cv1){
				return;
			}
		}, 10));
	};

	// 创建所有点
	StartEvents();
};