// 全局音频播放控制器
class GlobalSpeakerController{
	static gainNodeMap = {};

	static Init(){
		this.context = new AudioContext();
		this.bgGainNode = new SpeakerGainNode(this.context);
		// this.stepBgGainNode = new SpeakerGainNode(this.context);
		this.effectGainNode = new SpeakerGainNode(this.context);
		this.previewGainNode = new SpeakerGainNode(this.context);
	}

	static Decode(buffer){
		return DecodeAudioData(this.context, buffer);
	}
}

// 建立一个节点 用于绑定一个或者多个play buffer
class SpeakerGainNode{
	constructor(ctx){
		this.ctx = ctx;
		this.gainNode = ctx.createGain();
		this.gainNode.connect(ctx.destination);
	}

	Destroy(){
		this.gainNode.disconnect(this.ctx.destination);
		this.gainNode = null;
		this.ctx = null;
	}

	AddPlayerBuffer(playerBuffer){
		playerBuffer.connect(this.gainNode);
	}
}

//  每一个 audio buffer 创建而成的 Buffer Source Node
class PlayerBuffer{
	constructor({
		controller,
		audioBuffer,
		delay = 0,
		loop = false,
		startPlay = false
	}){
		this.ctx = controller.ctx;
		this.audioBuffer = audioBuffer;
		this.controller = controller;
		this.loop = loop;
		this.status = 'stop';
		this.elapsed = 0;
		this.Create();
		this._timer = null;
		this._volume = null;

		if(startPlay){
			this.Start({ delay });
		}
	}

	Create(){
		this.ABS = this.ctx.createBufferSource();
		this.ABS.buffer = this.audioBuffer;
		// this.ABS.loop = this.loop;
		this.ABS.connect(this.controller.gainNode);
	}

	Fadein({ volume = 1, duration = 1, param = {} } = {}){
		let endTime = this.ctx.currentTime + duration;
		this.controller.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
		this.controller.gainNode.gain.linearRampToValueAtTime(volume, endTime);
		this.Start(param);
	}

	// duration 过大的情况下
	// 可能会导致多个倒计时存在
	Fadeout({ duration = 1, action = 'pause' } = {}){
		if(this.status === 'pause' || this.status === 'stop'){
			return;
		}
		let endTime = this.ctx.currentTime + duration;
		this.controller.gainNode.gain.linearRampToValueAtTime(0.01, endTime);

		clearTimeout(this._timer);
		this._timer = setTimeout(() => {
			let a = action === 'stop' ? 'Stop' : 'Pause';

			if(action === 'stop'){
				this.controller.Destroy();
			}
			this[a]();
		}, duration * 1000);
	}

	Pause(){
		if(this.status === 'pause' || this.status === 'stop'){
			return;
		}
		// 计算当前资源已经播放时长
		this.elapsed = this.elapsed + this.ctx.currentTime - this.startTimeInContext;
		this.DestroyABS();
		this.status = 'pause';
	}

	Resume({ volume, fadeIn = false }={}){
		if(this.status === 'play'){
			return
		}

		// this._volume = volume;
		let when = this.ctx.currentTime;
		let offset = this.elapsed;

		// 如果已播放时长小于零
		// 即代表还未开始播放，值为剩余 delay 时间
		if(offset < 0){
			when -= offset;
			offset = 0;
		}

		this.Create();
		if(fadeIn){
			this.Fadein({
				param : {
					when,
					offset,
					volume
				}
			});
		} else{
			this.Start({
				when,
				offset,
				volume
			});
		}
	}

	// when 指定一个具体的开始播放时间 传入大于等于零有效
	// delay 指定音频相对于主时间轴的偏移量
	// offset 指定一段音频开始时间
	Start({ when = -1, offset = 0, delay = 0, volume = 1 } = {}){
		// 更新位于 context 的开始播放时间
		this.startTimeInContext = this.ctx.currentTime + delay;
		this._volume = volume;

		if(when >= 0){
			this.startTimeInContext = when;
		}
		//  start(when?: number, offset?: number, duration?: number);
		this.ABS.start(this.startTimeInContext, offset);
		this.ABS.onended = () => this.OnEnd();
		this.status = 'play';
	}

	OnEnd(){
		if(this.loop){
			if(this.status === 'pause' || this.status === 'stop'){
				return;
			}
			this.elapsed = 0;
			this.Create();
			this.Start({
				volume : this._volume
			});
		}
	}

	Stop(){
		this.DestroyABS();
		this.status = 'stop';
	}

	DestroyABS(){
		if(this.ABS){
			if(this.status === 'play'){
				this.ABS.stop(0);
			}

			this.ABS.disconnect();
			this.ABS = null;
		}
	}

	SetVolume(volume){
		if(this.controller){
			this.controller.gainNode.gain.value = volume
		}
	}
}

module.exports = {
	GlobalSpeakerController,
	SpeakerGainNode,
	PlayerBuffer
};