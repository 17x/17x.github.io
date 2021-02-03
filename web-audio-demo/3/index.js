window.onload = function(){
	let dataArray = [
		{
			url : '../assets/horse.mp3',
			audioBuffer : null
		}, {
			url : '../assets/yu-gi-oh.mp3',
			audioBuffer : null
		},
		{
			url : '../assets/slap.mp3',
			audioBuffer : null
		}
	];

	const RequestAudioData = () => {
		return new Promise((resolve, reject) => {
			let count = 0;

			dataArray.map((src, i) => {
				_XHR({
					url : src.url,
					responseType : 'arraybuffer',
					method : 'get'
				})
					.then((arraybuffer) => {
						return _decodeAudioData(arraybuffer);
					})
					.then(audioBuffer => {
						dataArray[i].audioBuffer = audioBuffer;
						count++;

						if(count === dataArray.length){
							resolve(dataArray);
						}
					})
					.catch(err => {
						console.log(err);
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
		.then((data) => {
			Timeline.Init({
				audioContext : window._global_AC,
				container : '#cv1',
				data
			});

			btnPlay.style.display = 'inline-block'
			btnStop.style.display = 'inline-block'

			dataArray = Timeline.data

			audioName.oninput=(e) =>{
				if(Timeline.currentEditItem){
					Timeline.currentEditItem.name = Number(e.target.value)
					Timeline.currentEditItem.UpdateRect()
				}
			}

			audioTime.oninput=(e) =>{
				if(Timeline.currentEditItem){
					Timeline.currentEditItem.originDuration = Number(e.target.value)
					Timeline.currentEditItem.UpdateRect()
				}
			}

			audioDelay.oninput=(e) =>{
				if(Timeline.currentEditItem){
					Timeline.currentEditItem.delay = Number(e.target.value)
					Timeline.currentEditItem.UpdateRect()
				}
			}

			audioOffset.oninput=(e) =>{
				if(Timeline.currentEditItem){
					Timeline.currentEditItem.offset = Number(e.target.value)
					Timeline.currentEditItem.UpdateRect()
				}
			}

			audioDuration.oninput=(e) =>{
				if(Timeline.currentEditItem){
					Timeline.currentEditItem.duration = Number(e.target.value)
					Timeline.currentEditItem.UpdateRect()
				}
			}

			audioRate.oninput=(e) =>{
				if(Timeline.currentEditItem){
					Timeline.currentEditItem.rate = Number(e.target.value)
					Timeline.currentEditItem.UpdateRect()
				}
			}

		});
};