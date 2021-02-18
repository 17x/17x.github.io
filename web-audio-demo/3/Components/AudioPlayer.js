// ctx controller
class AudioPlayerController{
	static Create({
		data = [],
		ctx = null,
		actionAfterReady = null
	}){

		console.log(data);

		/*this.gainNodes = data.map(item => {

		});*/

		if(actionAfterReady){
			this.Actions('Start');
		}
	}

	static Actions(action){
		this.gainNodes.map(gainNode => {
			gainNode[action]();
		});
	}

	/*
	static Start(){
		this.gainNodes.map(gainNode => {
			gainNode.Start();
		});
	}

	static Resume(){
		this.gainNodes.map(gainNode => {
			gainNode.Resume();
		});
	}

	static Pause(){
		this.gainNodes.map(gainNode => {
			gainNode.Pause();
		});
	}

	static Stop(){
		this.gainNodes.map(gainNode => {
			gainNode.Stop();
		});
	}
	*/
}

class GainNodeComponent{
	constructor({ ctx, ...props }){
		if(!this.ctx && ctx){
			this.ctx = ctx;
		}
	}

	FadeIn(){
		// this.status = 'fading';
		this.Play();
	}

	FadeOut(){
		// this.status = 'fading';
		this.Stop();
	}

	Destroy(){

	}
}

class ABSNComponent{
	constructor({ ctx, gainNode, audioBuffer, ...props }){
		if(!this.ctx && ctx){
			this.ctx = ctx;
		}

		this.audioBuffer = audioBuffer;
		this.absn = ctx.createBufferSource();
		this.status = 'stop';
		this._timer = null;
	}

	Play(){
		this.status = 'playing';
	}

	Paused(){
		this.status = 'paused';
	}

	Stop(){
		this.status = 'stop';
	}

	Destroy(){
		if(this._timer){
			clearTimeout(this._timer);
		}

	}
}