class MediaItem{
	constructor({ audioBuffer, url, delay = 0,rate = 1 }){
		this.audioBuffer = audioBuffer;
		this.url = url;
		this.originDuration = audioBuffer.duration;
		this.name = url.replace('../assets/', '');
		this.delay = delay;
		this.duration = this.originDuration;
		this.rate = rate;
		this.fadeIn = false;
		this.fadeOut = false;
	}
}