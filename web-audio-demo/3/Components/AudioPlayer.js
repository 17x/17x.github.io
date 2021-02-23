// ctx controller
class AudioPlayerController{
	static gainNodeComps = [];
	static ctx = null;

	static Create({
		data = [],
		ctx = null,
		actionAfterReady = null
	}){

		// console.log(ctx);

		data.map(subArr => {
			subArr.map(item => {
				let GAIN_NODE = new GainNodeComponent({
					...item,
					ctx
				});
				let ABSN = new ABSNComponent({
					...item,
					GNComp : GAIN_NODE,
					ctx
				});

				GAIN_NODE.ABSNMap = {
					'1' : ABSN
				};

				// console.log(GAIN_NODE, ABSN);
				this.gainNodeComps.push(GAIN_NODE);
			});

		});

		if(actionAfterReady){
			this.Actions('Start');
		}
	}

	static Actions(action){
		this.gainNodeComps.map(gainNodeComp => {
			gainNodeComp[action]();
		});
	}

	static Destroy(){
		this.gainNodeComps.map(gainNodeComp => {
			gainNodeComp.Destroy();
		});

		this.gainNodeComps = [];
	}
}

class GainNodeComponent{
	constructor({ ctx, ...props }){
		if(!this.ctx && ctx){
			this.ctx = ctx;
		}

		this.gainNode = ctx.createGain();
		this.gainNode.connect(ctx.destination);
	}

	Start(){
		// this.status = 'fading';
		// this.Play();
		Object.values(this.ABSNMap)
			  .map(ABSNComp => {
				  ABSNComp.Play();
			  });
	}

	Pause(){
		// this.status = 'fading';
		// this.Play();
		Object.values(this.ABSNMap)
			  .map(ABSNComp => {
				  ABSNComp.Pause();
			  });
	}

	Stop(){
		Object.values(this.ABSNMap)
			  .map(ABSNComp => {
				  ABSNComp.Stop();
			  });
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
		Object.values(this.ABSNMap)
			  .map(ABSNComp => {
				  ABSNComp.Destroy();
			  });

		this.gainNode.disconnect(this.ctx.destination);
	}
}

class ABSNComponent{
	constructor({ ctx, audioBuffer, GNComp, rate, ...props }){
		if(!this.ctx && ctx){
			this.ctx = ctx;
		}

		this.GNComp = GNComp;
		this.audioBuffer = audioBuffer;
		this.absn = ctx.createBufferSource();
		this.status = 'stop';
		this._timer = null;
		// when offset duration
		this._when = 0;
		this._offset = 0;
		this._duration = 0;

		this.delay = props.delay;
		this.duration = props.duration;
		this.absn.buffer = audioBuffer;
		this.absn.connect(this.GNComp.gainNode);
		this.absn.playbackRate.value = rate;
		// delay: 10
		// duration: 0.4723356009070295
		// fadeIn: false
		// fadeOut: false
		console.log(props);
	}

	Play(){
		this.status = 'playing';
		this._when = this.ctx.currentTime + this.delay;
		this._offset = 0;
		this._duration = this.duration;
		this.absn.start(this._when, this._offset, this._duration);
	}

	Pause(){
		this.status = 'paused';
	}

	Resume(){

	}

	Stop(){
		this.status = 'stop';
		this.absn.stop();
	}

	Destroy(){
		if(this._timer){
			clearTimeout(this._timer);
		}

		this.absn.disconnect(this.GNComp.gainNode);
	}
}