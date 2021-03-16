window.onload = function(){
	let oneTimeTag = true;
	let isPlaying = false;
	let uniqueGainNode = _global_AC.createGain();
	// doms
	let oPlay = play;
	let oPause = pause;
	let oStatus = load_log;
	let oPLog = permission_log;
	let dataArray = [
		{
			url : '../assets/horse.mp3',
			audioBuffer : null,
			absn : null
		}, {
			url : '../assets/astronomia.mp3',
			audioBuffer : null,
			absn : null
		},
		{
			url : '../assets/slap.mp3',
			audioBuffer : null,
			absn : null
		}
	];
	uniqueGainNode.connect(_global_AC.destination);

	oPlay.onclick = () => {
		if(oneTimeTag){
			dataArray.map(item => {
				//console.log(item);
				item.absn.start();
			});
		}

		oneTimeTag = false;

		_global_AC.resume()
				  .then(() => {
					  console.log('resumed');
				  });
	};

	oPause.onclick = () => {
		_global_AC.suspend()
				  .then(() => {
					  console.log('suspend');
				  });
	};

	window.addEventListener('click', () => {
		oPLog.innerHTML = 'permission status: <span style="color:green">authorization</span>';
	});

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

	const StructureAudioData = (data) => {
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
	};

	RequestAudioData()
		.then(data => StructureAudioData(data))
		.then(() => {

			// abs.start();
			oPlay.style.display = 'inline-block';
			oPause.style.display = 'inline-block';
			oStatus.innerHTML = 'Data status: <span style="color:green">loaded</span>';
		});
};