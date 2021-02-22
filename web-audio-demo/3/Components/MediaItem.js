class MediaItem extends RectItem{
	constructor({ audioBuffer, url,delay = 0 }){
		super();
		this.audioBuffer = audioBuffer;
		this.url = url;
		this.originDuration = audioBuffer.duration;
		this.name = url.replace('../assets/', '');
		this.delay = delay;
		this.duration = this.originDuration;
		this.rate = 1.5;
		this.fadeIn = false
		this.fadeOut = false

		this.UpdateRect();
	}
}