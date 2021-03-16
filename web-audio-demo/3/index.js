window.onload = function(){
	let dataArray = [
		{
			url : '../assets/horse.mp3',
			delay : 0.8,
			audioBuffer : null,
			rate : 0.6
		},
		{
			url : '../assets/astronomia.mp3',
			delay : 4,
			audioBuffer : null
		},
		{
			url : '../assets/slap.mp3',
			delay : 0.2,
			audioBuffer : null
		}
	];

	const RequestAudioData = () => {
		return new Promise((resolve, reject) => {
			let count = 0;
			let allLen = dataArray.length;

			dataArray.map((item) => {
				//console.log(item);
				_XHR({
					url : item.url,
					responseType : 'arraybuffer',
					method : 'get'
				})
					.then((arraybuffer) => {
						return _decodeAudioData(arraybuffer);
					})
					.then(audioBuffer => {
						item.audioBuffer = audioBuffer;
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
	};

	RequestAudioData()
		.then(() => {
			dataArray = dataArray.map((item) => {
				return new MediaItem({
					...item
				});
			});

			/*FileListManagement.Init({
				data : dataArray,
				container : '#fileList'
			});*/

			Timeline.Init({
				audioContext : window._global_AC,
				container : '#cv1',
				data : dataArray,
				onStart : () => {
					FileListManagement.Action({});
				},
				onPause : () => {

				},
				onStop : () => {

				},
				onItemAction : () => {

				}
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

					//console.log(max,currD);
					if(currD > max){
						currD = max;
					}
					audioDuration.value = currD;
					Timeline.currentEditItem.duration = currD;
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