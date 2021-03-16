window.onload = function(){
	let abs = _global_AC.createBufferSource();
	let oPlay = play;
	let oPause = pause;
	let oStatus = load_log;
	let oPLog = permission_log;

	oPlay.onclick = () => {
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
	_XHR({
		url         : '../assets/astronomia.mp3',
		responseType: 'arraybuffer',
		method      : 'get'
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
			 oStatus.innerHTML = 'Data status: <span style="color:green">loaded</span>';
		 })
		 .catch(err => {
			 console.log(err);
		 });

};