class RectItem{
	constructor({ perSecondWidth }){
		this.x = 0;
		this.width = 0;
		this.perSecondWidth = perSecondWidth;
	}

	UpdateRect(){
		this.x = this.perSecondWidth * this.offset;
		this.width = this.perSecondWidth * this.duration;
	}

	HoverOn(){

	}

	Click(){

	}

	Draw(ctx, i){
		let { x, width, name } = this;
		let currY = Timeline.scalePlateHeight;
		let baseY = currY + i * Timeline.trackHeight;

		ctx.beginPath();
		ctx.fillRect(
			x + 1,
			baseY + 1,
			width - 2,
			Timeline.trackHeight - 2
		);

		ctx.stroke();

		ctx.strokeStyle = '#ffffff';
		ctx.font = '12px arial';
		ctx.textBaseline = 'top';
		ctx.strokeText(name, 5, baseY + 10);
	}
}