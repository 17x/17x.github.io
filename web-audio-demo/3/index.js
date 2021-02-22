window.onload = function(){
	let dataArray = [
		[
			{
				url : '../assets/horse.mp3',
				delay : 5.5,
				audioBuffer : null
			},
			{
				url : '../assets/yu-gi-oh.mp3',
				delay : 8.5,
				audioBuffer : null
			}
		],
		[
			{
				url : '../assets/slap.mp3',
				delay : 10,
				audioBuffer : null
			}
		]
	];

	const RequestAudioData = () => {
		return new Promise((resolve, reject) => {
			let count = 0;
			let allLen = 0;

			dataArray.map((subArr) => {
				allLen += subArr.length;
				subArr.map((src, j) => {
					_XHR({
						url : src.url,
						responseType : 'arraybuffer',
						method : 'get'
					})
						.then((arraybuffer) => {
							return _decodeAudioData(arraybuffer);
						})
						.then(audioBuffer => {
							src.audioBuffer = audioBuffer;
							count++;

							if(count === allLen){
								resolve();
							}
						})
						.catch(err => {
							console.log(err);
						});
				});
			});

		});
	};

	/*	const StructureAudioData = (data) => {
			return new Promise((resolve, reject) => {
				// uniqueGainNode.connect()
				data.map(item => {
					let absn = _global_AC.createBufferSource();

					absn.loop = true;
					absn.buffer = item.audioBuffer;
					absn.connect(uniqueGainNode);
					item.absn = absn;
				});

				resolve(data);
			});
		};*/

	RequestAudioData()
		.then(() => {
			Timeline.Init({
				audioContext : window._global_AC,
				container : '#cv1',
				data : dataArray
			});

			btnPlay.style.display = 'inline-block';
			btnStop.style.display = 'inline-block';

			// dataArray = Timeline.data;

			audioName.oninput = (e) => {
				if(Timeline.currentEditItem){
					Timeline.currentEditItem.name = Number(e.target.value);
					Timeline.currentEditItem.UpdateRect();
				}
			};

			audioTime.oninput = (e) => {
				if(Timeline.currentEditItem){
					Timeline.currentEditItem.originDuration = Number(e.target.value);
					Timeline.currentEditItem.UpdateRect();
				}
			};

			audioDelay.oninput = (e) => {
				if(Timeline.currentEditItem){
					Timeline.currentEditItem.delay = Number(e.target.value);
					Timeline.currentEditItem.UpdateRect();
				}
			};

			audioDuration.oninput = (e) => {
				if(Timeline.currentEditItem){
					let max = Timeline.currentEditItem.originDuration;
					let currD = Number(e.target.value);

					console.log(max,currD);
					if(currD > max){
						currD = max;
					}
					audioDuration.value = currD
					Timeline.currentEditItem.duration = currD
					Timeline.currentEditItem.UpdateRect();
				}
			};

			audioRate.oninput = (e) => {
				if(Timeline.currentEditItem){
					Timeline.currentEditItem.rate = Number(e.target.value);
					Timeline.currentEditItem.UpdateRect();
				}
			};

		});
};