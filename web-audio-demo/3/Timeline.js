const RAF = window.requestAnimationFrame
	|| window.webkitRequestAnimationFrame
	|| window.mozRequestAnimationFrame
	|| window.oRequestAnimationFrame
	|| window.msRequestAnimationFrame;

const CAF = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
const RunProxy = () => {
	_RafId = RAF(RunProxy);
	Timeline.Render();
};
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
	static currentHoverItem = null;
	static currentDragItem = null;
	static DragStartPos = {
		ox : 0,
		x : 0,
		y : 0
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
		console.log(Timeline.data);

		dom.width = Timeline.width;
		dom.height = Timeline.height;
		dom.style.width = Timeline.width + 'px';
		dom.style.height = Timeline.height + 'px';
		dom.style.display = 'block';

		dom.onmousemove = Throttle((e) => {
			let { trackHeight, currentHoverItem, currentDragItem } = Timeline;
			let { x, y } = e;

			if(currentDragItem){
				let newX = currentDragItem.x + (x - Timeline.DragStartPos.x);

				if(newX <= 0){
					newX = 0;
				}

				currentDragItem.x = newX;
				Timeline.DragStartPos.x = e.x;
			} else{
				// update hoverItem
				let scrollLeft = dom.parentNode.scrollLeft;
				let offsetTop = dom.getBoundingClientRect().top;
				let _item = null;
				let _OX = null;

				// top left of track area
				x -= scrollLeft;
				y -= (offsetTop + Timeline.scalePlateHeight);

				for(let i = 0; i < Timeline.data.length; i++){
					let item = Timeline.data[i];
					let minX = item.x;
					let minY = trackHeight * i;
					let maxX = minX + item.width;
					let maxY = minY + trackHeight;

					if(
						minX < x &&
						maxX > x &&
						minY < y &&
						maxY > y
					){
						_item = item;
						_OX = (x - minX);
						break;
					}
				}

				if(currentHoverItem){
					currentHoverItem.hover = false;
				}

				if(_item){
					Timeline.currentHoverItem = _item;
					Timeline.currentHoverItem.hover = true;
					Timeline.DragStartPos.ox = _OX;
					Timeline.DragStartPos.x = e.x;
					Timeline.DragStartPos.y = e.y;
					dom.style.cursor = 'move';
				} else{
					dom.style.cursor = 'default';
				}
			}

			e.stopPropagation();
			e.preventDefault();
		}, 16);

		dom.onmousedown = (e) => {
			if(Timeline.currentHoverItem && e.button === 0){
				Timeline.currentDragItem = Timeline.currentHoverItem;
				Timeline.currentEditItem = Timeline.currentHoverItem;
				Timeline.UpdatePropertyPanel();
			}
		};

		dom.onmouseup = (e) => {
			Timeline.CalcItemPos(Timeline.currentDragItem);
			Timeline.currentHoverItem = null
			Timeline.currentDragItem = null;
			Timeline.DragStartPos = {
				x : 0,
				y : 0,
				ox : 0
			};
		};

		RunProxy();
	}

	static UpdatePropertyPanel(){
		let item = Timeline.currentEditItem

		audioName.value = item.name
		audioTime.value = item.originDuration
		audioOffset.value = item.offset
		audioDuration.value = item.duration
	}

	static CalcItemPos(item = null){
		let arr = [item] || Timeline.data;

		arr.map(item => {
			// Unit S
			item.offset = item.x / Timeline.perSecondWidth;
			console.log(item.x,item.offset);
		});
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
		let { ctx, scalePlateHeight, trackHeight } = this;

		ctx.save();

		Timeline.data.map((item, i) => {
			let { x, width, name } = item;
			let baseY = scalePlateHeight + i * trackHeight;

			ctx.fillStyle = item.hover ? '#ff0000' : '#000000';

			ctx.fillRect(
				x + 1,
				baseY + 1,
				width - 2,
				trackHeight - 2
			);

			ctx.strokeStyle = '#ffffff';
			ctx.font = '12px arial';
			ctx.textBaseline = 'top';
			ctx.strokeText(name, x + 5, baseY + 10);
		});

		ctx.restore();
	}

	static Render(){
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