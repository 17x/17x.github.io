const RAF = window.requestAnimationFrame
	|| window.webkitRequestAnimationFrame
	|| window.mozRequestAnimationFrame
	|| window.oRequestAnimationFrame
	|| window.msRequestAnimationFrame
	|| function(callback){
		return window.setTimeout(callback, 1000 / 60);
	};

const CAF = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
const RunProxy = () => {
	_RafId = RAF(RunProxy);
	Timeline.Render();
};
let _RafId = null;

class Timeline{
	static dom = null;
	static maxTime = 0;
	static ACT = null;
	static width = 0;
	static height = 300;
	static perSecondWidth = 100;
	static scalePlateHeight = 80;
	static trackHeight = 30;
	static theme = {
		// bgColor
	};

	static Init({ container, data, audioContext }){
		let dom = document.querySelector(container);
		let ctx = dom.getContext('2d');

		Timeline.ACT = audioContext;
		Timeline.ctx = ctx;
		Timeline.dom = dom;
		Timeline.data = data.map(item => {
			return new MediaItem({ perSecondWidth : Timeline.perSecondWidth, ...item });
		});
		Timeline.CalcTime();
		Timeline.CalcWidth();

		dom.width = Timeline.width;
		dom.height = Timeline.height;
		dom.style.width = Timeline.width + 'px';
		dom.style.height = Timeline.height + 'px';
		dom.style.display = 'block';
		console.log(Timeline.data);
		RunProxy();
	}

	// get maximum time
	static CalcTime(){
		let max = Number.MIN_SAFE_INTEGER;

		Timeline.data.map(item => {
			max = Math.max(max, item.duration);
		});

		Timeline.maxTime = max;
	}

	static CalcWidth(){
		let max = window.innerWidth;

		Timeline.data.map(item => {
			max = Math.max(item.duration * Timeline.perSecondWidth, max);
		});

		Timeline.width = max;
	}

	static DrawScalePlate(){
		let num = Math.ceil(Timeline.maxTime);
		let ctx = Timeline.ctx;
		let currX = 0;
		let spaceX = Timeline.perSecondWidth;
		// quarter
		let spaceX2 = Timeline.perSecondWidth / 4;
		let spaceY = 20;
		let spaceY2 = spaceY / 3;

		new Array(num).fill(undefined)
					  .map((n, i) => {
						  if(i !== 0){
							  let text = i + '';
							  let textWidth = ctx.measureText(text).width;

							  ctx.strokeStyle = '#000000';
							  ctx.font = '12px arial';
							  ctx.beginPath();
							  ctx.moveTo(currX, 0);
							  ctx.lineTo(currX, spaceY);
							  ctx.stroke();

							  ctx.strokeText(text, currX - textWidth / 2, spaceY * 1.7);
						  }

						  new Array(3).fill(undefined)
									  .map((subN, j) => {
										  ctx.beginPath();
										  let subX = spaceX2 * (j + 1);
										  let subY = spaceY2;
										  if(j === 1){
											  subY += 5;
										  }
										  ctx.moveTo(currX + subX, 0);
										  ctx.lineTo(currX + subX, subY);
										  ctx.stroke();
									  });

						  currX += spaceX;
					  });
	}

	static DrawTracks(){
		let ctx = Timeline.ctx;
		let currY = Timeline.scalePlateHeight;

		let count = Timeline.data.length + 1;

		new Array(count).fill(undefined)
						.map(item => {
							ctx.beginPath();
							ctx.moveTo(0, currY);
							ctx.lineTo(Timeline.width, currY);
							ctx.stroke();

							currY += Timeline.trackHeight;
						});
	}

	static DrawItems(){
		Timeline.data.map((item, i) => {
			item.Draw(Timeline.ctx, i);
		});
	}

	static Render(){
		/*if(_RafId >= 100){
			Timeline.Destroy();
		}*/
		Timeline.ctx.clearRect(0, 0, Timeline.width, Timeline.height);
		Timeline.DrawScalePlate();
		Timeline.DrawTracks();
		Timeline.DrawItems();
	}

	static Destroy(){
		CAF(_RafId);
		_RafId = null;
	}
}