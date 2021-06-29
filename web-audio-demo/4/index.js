window.onload = function(){
	let dataArray = [
		{
			url : '../assets/astronomia.mp3',
			audioBuffer : null
		},
        {
            url : '../assets/horse.mp3',
            audioBuffer : null,
            rate : 0.6
        },
        {
			url : '../assets/slap.mp3',
			audioBuffer : null
		}
	];
	const RAF = window.requestAnimationFrame
		|| window.webkitRequestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| window.oRequestAnimationFrame
		|| window.msRequestAnimationFrame;

	const CAF = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
	const RunProxy = () => {
		_RafId = RAF(RunProxy);
	};
	let _RafId = null;

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

			FileListManagement.Init({
				data : dataArray,
				container : '#fileList'
			});

			RunProxy();

			// btnPlay.style.display = 'inline-block';
			// btnStop.style.display = 'inline-block';

			// dataArray = Timeline.data;
		});
};