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
let _LastDate = null;

class Timeline{
	static dom = null;
	static maxTime = 0;
	static ACT = null;
	static width = 0;
	static height = 300;
	static perSecondWidth = 30;
	static scalePlateHeight = 80;
	static trackHeight = 30;
	static theme = {
		// bgColor
	};
	static currentHoverItem = null;
	static currentDragItem = null;
	static currentEditItem = null;
	static currentPlayTime = 0;
	static isPlaying = false;
	static isPaused = false;

	static DragStartPos = {
		ox : 0,
		x : 0,
		y : 0
	};

	static Init({
		container, data, audioContext
	}){
		let dom = document.querySelector(container);
		let ctx = dom.getContext('2d');

		Timeline.ACT = audioContext;
		Timeline.ctx = ctx;
		Timeline.dom = dom;
		Timeline.data = data;
		Timeline.CalcTime();
		Timeline.CalcTimeLineWidth();
		// console.log(Timeline.data);

		dom.width = Timeline.width;
		dom.height = Timeline.height;
		dom.style.width = Timeline.width + 'px';
		dom.style.height = Timeline.height + 'px';
		dom.style.display = 'block';

		dom.onmousemove = Throttle((e) => {
			let { trackHeight, currentHoverItem, currentDragItem, isPlaying, isPaused, DragStartPos } = Timeline;
			let { x, y } = e;

			if(isPlaying || isPaused){
				return false;
			}

			if(currentHoverItem){
				currentHoverItem.active = false;
				currentHoverItem.UpdateRect();
				Timeline.currentHoverItem = null;
			}

			if(currentDragItem){
				let newX = currentDragItem.x + (x - DragStartPos.x);

				if(newX <= 0){
					newX = 0;
				}

				currentDragItem.active = true;
				currentDragItem.UpdateRect();
				currentDragItem.x = newX;
				DragStartPos.x = e.x;

				Timeline.CalcItemPos(Timeline.currentDragItem);
				Timeline.UpdatePropertyPanel();
			} else{
				// update hoverItem
				let scrollLeft = dom.parentNode.scrollLeft;
				let offsetTop = dom.getBoundingClientRect().top;
				let _item = null;
				let _OX = null;

				// top left of track area
				x += scrollLeft;
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

				if(_item){
					Timeline.currentHoverItem = _item;
					Timeline.currentHoverItem.active = true;
					Timeline.currentHoverItem.UpdateRect();
					Timeline.DragStartPos.ox = _OX;
					Timeline.DragStartPos.x = e.x;
					Timeline.DragStartPos.y = e.y;
					dom.style.cursor = 'move';
				} else{
					// Timeline.currentHoverItem = null
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
			if(Timeline.currentDragItem){
				Timeline.currentDragItem.active = false;
				Timeline.currentDragItem.UpdateRect();
			}
			Timeline.currentHoverItem = null;
			Timeline.currentDragItem = null;
			Timeline.DragStartPos = {
				x : 0,
				y : 0,
				ox : 0
			};
		};
/*
		btnPlay.onclick = () => {
			if(Timeline.isPlaying){
				Timeline.PausedPlay();
			} else{
				// 未在播放中 且 未在暂停中
				if(Timeline.isPaused){
					Timeline.ResumePlay();
				} else{
					Timeline.StartPlay();
				}
			}

			Timeline.currentEditItem = null;
			Timeline.UpdatePropertyPanel();
			btnPlay.innerHTML = Timeline.isPlaying ? 'Pause' : 'Play';
		};

		btnStop.onclick = () => {
			Timeline.StopPlay();
			btnPlay.innerHTML = 'Play';
		};*/

		// RunProxy();
	}

	static UpdatePropertyPanel(){
		let item = Timeline.currentEditItem || {};
		let {
			name = '',
			originDuration = '',
			delay = '',
			offset = '',
			duration = '',
			rate = ''
		} = item;

		audioName.value = name;
		audioTime.value = originDuration;
		audioDelay.value = delay;
		audioDuration.value = duration;
		audioRate.value = rate;
	}

	static CalcItemPos(item = null){
		let arr = [item] || Timeline.data;

		arr.map(item => {
			// Unit S
			item.delay = item.x / Timeline.perSecondWidth;
			// console.log(item.x,item.delay);
		});
	}

	// get maximum time
	static CalcTime(){
		let max = Number.MIN_SAFE_INTEGER;

		Timeline.data.map(item => {
			max = Math.max(max, item.delay + item.duration);
		});
		// console.log(max);
		Timeline.maxTime = max;
	}

	static CalcTimeLineWidth(){
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

		ctx.save();
		ctx.strokeStyle = '#7f7f7f';

		new Array(count).fill(undefined)
						.map(item => {
							ctx.beginPath();
							ctx.moveTo(0, currY);
							ctx.lineTo(Timeline.width, currY);
							ctx.stroke();

							currY += Timeline.trackHeight;
						});
		ctx.restore();
	}

	static DrawItems(){
		let { ctx, scalePlateHeight, trackHeight } = this;

		ctx.save();

		Timeline.data.map((item, i) => {
			let { x, canvas, width, height } = item;
			let baseY = scalePlateHeight + i * trackHeight;

			ctx.drawImage(canvas, x, baseY, width, height);
		});

		ctx.restore();
	}

	static DrawIndicator(){
		let { ctx } = this;
		// console.log(Timeline.currentPlayTime);
		let x = (Timeline.currentPlayTime / 1000) * Timeline.perSecondWidth;

		// console.log(x);
		ctx.save();
		ctx.strokeStyle = '#ff0000';
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, Timeline.height);
		ctx.stroke();
		ctx.restore();
	}

	static StartPlay(){
		Timeline.isPaused = false;
		Timeline.isPlaying = true;

		this.ACT.resume()

		AudioPlayerController.Create({
			ctx : _global_AC,
			data : this.data,
			// optional, default to do nothing
			// play, fadeIn, fadeOut
			actionAfterReady : 'Start'
		});
	}

	static PausedPlay(){
		Timeline.isPaused = true;
		Timeline.isPlaying = false;
		// AudioPlayerController.Action('Pause');
		this.ACT.suspend()
	}

	static ResumePlay(){
		Timeline.isPaused = false;
		Timeline.isPlaying = true;
		this.ACT.resume()

		// AudioPlayerController.Action('Resume');
	}

	static StopPlay(){
		Timeline.isPlaying = false;
		Timeline.isPaused = false;
		Timeline.currentPlayTime = 0;
		AudioPlayerController.Action('Stop');
		AudioPlayerController.Action('Destroy');
		// console.log(this.ACT);
		this.ACT.suspend()
		// this.ACT.close();
	}

	static Render(){
		Timeline.ctx.clearRect(0, 0, Timeline.width, Timeline.height);
		Timeline.DrawScalePlate();
		Timeline.DrawTracks();
		Timeline.DrawItems();

		if(!_LastDate){
			_LastDate = Date.now();
		}

		if(Timeline.isPlaying){
			let offset = 0;

			offset = Date.now() - _LastDate;

			Timeline.currentPlayTime += offset;
		}

		_LastDate = Date.now();

		if(Timeline.isPlaying || Timeline.isPaused){
			Timeline.DrawIndicator();
		}

	}

	static Destroy(){
		CAF(_RafId);
		_RafId = null;
	}
}