class MediaItem extends RectItem{
	constructor({ audioBuffer, url, perSecondWidth }){
		super({ perSecondWidth });
		this.audioBuffer = audioBuffer;
		this.url = url;
		this.originDuration = audioBuffer.duration;
		this.name = url.replace('../assets/', '');
		this.delay = 0;
		this.offset = 0;
		this.duration = this.originDuration;
		this.rate = 1;
		this.perSecondWidth = perSecondWidth;

		// this.gainNode =
		this.UpdateRect();
	}
}