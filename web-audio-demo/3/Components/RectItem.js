class RectItem{
	constructor(){
		this.x = 0;
		this.width = 0;
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.height = Timeline.trackHeight;
		this.canvas.height = Timeline.trackHeight;
	}

	UpdateRect(){
		let { ctx, canvas, delay, duration,rate, name,active } = this;
		let { perSecondWidth, trackHeight } = Timeline;
		let width = perSecondWidth * duration / rate;

		if(width < 10){
			width = 10
		}

		this.x = perSecondWidth * delay;
		this.width = width;
		canvas.width = width;

		ctx.fillStyle = active ? 'red' : '#000';
		// bg
		ctx.fillRect(
			1,
			1,
			width - 2,
			trackHeight - 2
		);

		// two side lines
		ctx.strokeStyle = '#de5757';
		ctx.moveTo(1, 0);
		ctx.lineTo(1, trackHeight);
		ctx.moveTo(width - 1, 0);
		ctx.lineTo(width - 1,trackHeight);
		ctx.stroke();
		// ctx.globalCompositeOperation = 'destination-out'

		// text
		ctx.strokeStyle = '#ffffff';
		ctx.font = '12px arial';
		ctx.textBaseline = 'top';
		ctx.strokeText(name, 5, 10);
	}
}