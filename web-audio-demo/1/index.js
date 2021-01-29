window.onload = function(){
	let abs = _global_AC.createBufferSource();
	let oPlay = play;
	let oPause = pause;

	oPlay.onclick = () => {
		// abs.start();
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

	_XHR({
		url : '../assets/yu-gi-oh.mp3',
		responseType : 'arraybuffer',
		method : 'get'
	})
		.then((arraybuffer) => {
			return _decodeAudioData(arraybuffer);
		})
		.then(audioBuffer => {
			// console.log('get audio');
			abs.buffer = audioBuffer;
			abs.connect(_global_AC.destination);
			abs.start();
			oPlay.style.display = 'inline-block';
			oPause.style.display = 'inline-block';
		})
		.catch(err => {
			console.log(err);
		});

};