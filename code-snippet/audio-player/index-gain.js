let fileMap = {
	// bg : null,
	// 1 : null,
	slap : null,
	slap2 : null,
	// horse : null,
	// 2 : null,
	// 2 : null,
	/*2 : null,
	3 : null,
	4 : null,
	5 : null,
	6 : null,
	7 : null,
	8 : null,
	9 : null,
	10 : null*/
};

function BinaryStringToArrayBuffer(b){
	let length = b.length;
	let buf = new ArrayBuffer(length);
	let arr = new Uint8Array(buf);
	let i = -1;
	while(++i < length){
		arr[i] = b.charCodeAt(i);
	}
	return buf;
}

function PlayMutedM(){
	let _b64 = '';
	let sP = 'TEFNRTMuOTkuN';
	let s1 = '';
	let s2 = '';

	for(let i = 0; i < 627; i++){
		if(i < 579){
			s1 += 'V';
		}
		s2 += 'V';
	}

	_b64 = '//vkBAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAE' + sP + s1 + sP + s2;
	_b64 += _b64;

	return BinaryStringToArrayBuffer(window.atob(_b64));
}

// 全局音频播放控制器
class GlobalSpeakerController{
	static gainNodeMap = {};

	static Init(){
		this.context = new AudioContext();
		this.bgGainNode = new SpeakerGainNode(this.context);
		this.stepBgGainNode = new SpeakerGainNode(this.context);
		this.effectGainNode = new SpeakerGainNode(this.context);
		this.previewGainNode = new SpeakerGainNode(this.context);
	}

	static Decode(buffer){
		return new Promise((resolve, reject) => {
			this.context.decodeAudioData(buffer)
				.then((audioBuffer) => {
					resolve(audioBuffer);
				});
		});
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

		if(startPlay){
			this.Start({ delay });
		}
	}

	Create(){
		this.ABS = this.ctx.createBufferSource();
		this.ABS.buffer = this.audioBuffer;
		this.ABS.loop = this.loop;
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
	Fadeout({ duration = 1, destroyOnEnd } = {}){
		let endTime = this.ctx.currentTime + duration;
		let action = null;
		this.controller.gainNode.gain.linearRampToValueAtTime(0.01, endTime);

		if(destroyOnEnd){
			action = 'Stop';
		} else{
			action = 'Pause';
		}

		clearTimeout(this._timer);
		this._timer = setTimeout(() => {
			if(destroyOnEnd){
				this.controller.Destroy();
			}
			this[action]();
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

	Resume({ volume, fadeIn = false }){
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

	Start({ when = 0, offset = 0, delay = 0 } = {}){
		// 更新位于 context 的开始播放时间
		this.startTimeInContext = this.ctx.currentTime + delay;

		//  start(when?: number, offset?: number, duration?: number);
		this.ABS.start(when + delay, offset);
		this.status = 'play';
	}

	Stop(){
		this.DestroyABS();
		this.status = 'stop';
	}

	DestroyABS(){
		if(this.ABS){
			this.ABS.disconnect();
			this.ABS.stop(0);
			this.ABS = null;
		}
	}

}

function createBtns(id, name, length){
	let dom = document.createElement('div');
	let ctx = GlobalSpeakerController.context;
	let gain = null;

	if(name === 'bg'){
		gain = GlobalSpeakerController.bgGainNode;
	}

	dom.id = id;
	dom.innerHTML = `
		<p>
			<span>${ name }</span> 
		</p>
		<button class="control Start">play</button>
		<button class="control Fadein">fadein</button>
		<button class="control Fadeout">fadeout</button>
		<button class="control Pause">pause</button>
		<button class="control Stop">stop</button>`;
	document.body.append(dom);

	dom.onclick = (e) => {
		let btn = e.target;

		if(btn.classList.contains('control')){
			let action = btn.classList[1];
			let audioBuffer = fileMap[name].audioBuffer;
			let playerBuffer = fileMap[name].playBuffer;

			console.log(action, name, audioBuffer, playerBuffer);
			if(!playerBuffer || !playerBuffer.ABS){
				playerBuffer = new PlayerBuffer({
					controller : GlobalSpeakerController.bgGainNode,
					audioBuffer,
					loop : true
				});
				fileMap[name].playBuffer = playerBuffer;
				// gain.AddPlayerBuffer(playerBuffer.ABS);
			}

			console.log(action);
			playerBuffer[action]({ loop : true });
		}
	};
}

window.onload = () => {
	let oPlay = document.getElementById('play');
	let oFadein = document.getElementById('fadein');
	let oFadeout = document.getElementById('fadeout');
	let oPause = document.getElementById('pause');
	let oStop = document.getElementById('stop');

	let _count = 0;
	let bgBuffer = undefined;
	let otherBuffer = undefined;

	// 初始化播放器
	GlobalSpeakerController.Init();

	// 请求数据
	Object.keys(fileMap)
		  .map(k => {
			  let xhr = new XHR();

			  // 创建dom
			  fileMap[k] = {};

			  xhr.Send({
				  url : `./audio/${ k }.mp3`,
				  responseType : 'arraybuffer',
				  type : 'POST',
				  success : (resp) => {
					  // 存储
					  // fileMap[k].arrayBuffer = resp;

					  try{
						  GlobalSpeakerController.Decode(resp)
												 .then(audioBuffer => {
													 _count--;
													 if(_count === 0){
														 console.log('end');
													 }

													 createBtns(Date.now(), k, fileMap.k);
													 fileMap[k].audioBuffer = audioBuffer;
												 });
					  } catch(e){
						  console.log(e);
					  }
				  }
			  });

			  _count++;
		  });
};


/*


stepBgPlayer = new PlayerBuffer({
	controller : new SpeakerGainNode(GlobalSpeakerController.context),
	audioBuffer : Resources.data.fileMap[currStepBGM].buffer,
	loop : true
});

stepBgPlayer.Fadein({ volume : destVolume });
stepBgPlayer.Fadeout({ destroyOnEnd : true });

// 淡出全局 BGM 播放
bgAudioPlayer && bgAudioPlayer.Fadeout();

bgAudioPlayer.Fadein({ volume : destVolume });


*/