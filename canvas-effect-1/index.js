window.onload = () => {
	const showingText = window.showingText;
	const blankDotColor = window.blankDotColor;
	const blankDotOpacity = window.blankDotOpacity;
	const blankDotRadius = window.blankDotRadius;
	const regenerate = window.regenerate;
	const cv1 = window.cv1;
	const ctx = cv1.getContext('2d');
	const cvsSize = {
		width : 0,
		height: 300
	};
	let dotsArray = [];
	let blankDot;
	let blankDotDefaultStyle = {
		x      : 0,
		y      : 0,
		r      : 30,
		color  : '#FF0000',
		opacity: 1
	};

	cv1.height = cvsSize.height;
	cv1.style.height = cvsSize.height + 'px';

	class Dot{
		constructor({
			x = 0,
			y = 0,
			r = 0,
			color = 0,
			opacity = 1
		}){
			this._x = x;
			this._y = y;
			this.x = x;
			this.y = y;
			this.r = r;
			this.color = color;
			this.opacity = opacity;
			this._timer = null;
			this.showStatus = 'show';
		}

		BounceTo(x, y, d){
			if(this.aniStatus === 'leaving'){
				return;
			}

			clearInterval(this._timer);
			this._timer = null;
			// 记录起点
			let startX = this.x;
			let startY = this.y;
			// 每 S 移动的距离
			let speed = 50;
			// 总计距离
			let totalTime = (d / speed) * 1000;
			let currentTime = 0;
			if(totalTime === 0){
				return;
			}
			this._timer = setInterval(() => {
				if(currentTime >= totalTime){
					// console.log('当前时间大于等于总时长', currentTime, totalTime, this.x, this.y, this._x, this._y);
					// console.log(currentTime, totalTime);
					clearInterval(this._timer);
					this._timer = null;
					this.aniStatus = 'backing';
					// this.x = startX - x;
					// this.y = startY - y;

					if(Math.abs(this.x - this._x) <= 2 && Math.abs(this.y - this._y) < 3){
						this.x = this._x;
						this.y = this._y;
						return;
					}

					let dotCurrentPos = {
						x: this.x,
						y: this.y
					};
					let dotOriginPos = {
						x: this._x,
						y: this._y
					};
					let d = GetDistance(dotCurrentPos, dotOriginPos);
					let vel = GetVel(dotOriginPos, dotCurrentPos, d);
					this.BounceTo(vel.x, vel.y, d);
					return;
				}

				let rate = 17 / totalTime;
				let offsetX = x * rate;
				let offsetY = y * rate;
				// console.log(x, y, rate, offsetX, offsetY);
				this.x -= offsetX;
				this.y -= offsetY;
				if((currentTime + 17) >= totalTime){
					currentTime = totalTime;
				} else{
					currentTime += 17;
				}
			}, 17);
		}

		Draw(ctx){
			let {x, y, r, color, opacity} = this;
			if(opacity < 0.5){
				console.log(opacity);

			}
			ctx.globalAlpha = opacity;
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(x, y, r, 0, 2 * Math.PI);
			ctx.fill();
		}
	}

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

	const IsIntersection = (d1, d2) => {
		let max = d1.r + d2.r;
		let distance = GetDistance(d1, d2);
		let result = null;

		if(distance <= max){
			result = {
				max,
				distance
			};
		}

		return result;
	};

	const GetDistance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

	const GetVel = (p1, p2, vel) => {
		let dx = p2.x - p1.x;
		let dy = p2.y - p1.y;
		let angle = Math.atan2(dy, dx);
		let xVel = vel * Math.cos(angle);
		let yVel = vel * Math.sin(angle);

		return {
			x: xVel,
			y: yVel
		};
	};

	const Render = () => {
		// console.log('render');
		ctx.clearRect(0, 0, cvsSize.width, cvsSize.height);
		blankDot && blankDot.Draw(ctx);
		dotsArray.map(dot => dot.Draw(ctx));
	};

	const CreateDots = () => {
		let _width;

		ctx.font = 'bold 310px arial';
		_width = Math.ceil(ctx.measureText(showingText.value).width);
		cvsSize.width = _width;
		cv1.width = _width;
		cv1.style.width = _width + 'px';

		// todo  貌似canvas size变化后 font 相关将会失效
		ctx.font = 'bold 310px arial';
		ctx.textBaseline = 'top';
		ctx.textAlign = 'left';
		ctx.fillStyle = '#000000';

		ctx.fillText(showingText.value, 0, 20);

		dotsArray = [];

		const Random = (min, max) => {
			if(min > 0){
				max = max - min + 1;
			}
			return Math.floor(Math.random() * max) + min;
		};

		const AnalysisPoints = () => {
			let data = ctx.getImageData(0, 0, cv1.width, cv1.height).data;
			let _f = true;
			const colorList = [
				'#FA4245',
				'#333F44',
				'#777777',
				'#888888',
				'#BFBFBF'
			];
			const dotSize = {
				max      : 14,
				renderMax: 20,
				min      : 8
			};
			let _d = dotSize.max;
			let _r = _d / 2;
			let currX = _r;
			let currY = _r;

			while(_f){
				let currPos = currY * cvsSize.width + currX;
				let count = data[currPos * 4] + data[currPos * 4 + 1] + data[currPos * 4 + 2] + data[currPos * 4 + 3];

				//有颜色
				if(count > 0){
					let _temp_d = Random(dotSize.min, dotSize.renderMax);
					let obj = new Dot({
						r    : _temp_d / 2,
						color: colorList[Random(0, colorList.length - 1)],
						x    : currX,
						y    : currY
					});

					if(_temp_d > dotSize.max){
						obj.opacity = 0.9;
						obj.index = 2;
					}
					// 保存
					dotsArray.push(obj);
				}

				// 下一个点的中心在画布外
				if((currX + _d) >= cvsSize.width){
					currX = _r;
					currY += _d;
				} else{
					currX += _d;
				}

				if(currY >= cvsSize.height){
					// console.log('end');
					// console.log(dotsArray);
					// Render();
					break;
				}
			}
		};

		AnalysisPoints();
	};

	const StartEvents = () => {
		const raf = window.requestAnimationFrame
			 || window.webkitRequestAnimationFrame
			 || window.mozRequestAnimationFrame
			 || window.oRequestAnimationFrame
			 || window.msRequestAnimationFrame;

		const func = () => {
			// 找出所有与空白点有交集的点
			if(blankDot){
				dotsArray.map(dot => {
					let _f = IsIntersection(blankDot, dot);

					if(_f){
						let vel = GetVel(dot, blankDot, _f.max - _f.distance);
						// console.log(vel);
						dot.x -= vel.x;
						dot.y -= vel.y;

						let vel2 = GetVel(dot, blankDot, 20);
						dot.BounceTo(
							 vel2.x,
							 vel2.y,
							 20
						);
						dot.aniStatus = 'leaving';
					}
				});
			}
			Render();
			raf(func);
		};

		func();

		cv1.onmouseenter = () => {
			blankDot = new Dot(blankDotDefaultStyle);
		};
		cv1.onmouseout = () => {
			blankDot = null;
		};

		document.addEventListener('mousemove', Throttle((e) => {
			if(e.target !== cv1){
				return;
			}
			if(blankDot){
				let rect = cv1.getBoundingClientRect();
				blankDot.x = e.x - rect.left;
				blankDot.y = e.y - rect.top;
			}
		}, 10));
	};

	// 创建所有点
	CreateDots();

	StartEvents();

	showingText.onkeyup = (e) => {
		showingText.value = showingText.value.trim();
	};
	regenerate.onclick = () => {
		ctx.clearRect(0, 0, cvsSize.width, cvsSize.height);
		CreateDots();
	};
	blankDotColor.onchange = () => {
		if(blankDot){
			blankDot.color = blankDotColor.value;
		}

		blankDotDefaultStyle.color = blankDotColor.value;
	};
	blankDotOpacity.onchange = () => {
		if(blankDot){
			blankDot.opacity = blankDotOpacity.value;
		}
		blankDotDefaultStyle.opacity = blankDotOpacity.value;
	};
	blankDotRadius.onchange = () => {
		if(blankDot){
			blankDot.r = Number(blankDotRadius.value);
		}
		blankDotDefaultStyle.r = Number(blankDotRadius.value);
	};
};