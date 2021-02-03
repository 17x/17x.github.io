class RectItem{
	constructor({ perSecondWidth }){
		this.x = 0;
		this.width = 0;
		this.perSecondWidth = perSecondWidth;
	}

	UpdateRect(){
		this.x = this.perSecondWidth * this.delay;
		this.width = this.perSecondWidth * this.duration;
	}
}