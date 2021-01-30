;(() => {
	// Get Authority of play audio
	const Authorization = () => {
		// only once
		window.removeEventListener('click', Authorization, true);
		window._audio_permission = true;

		let audioBuffer = audioContext.createBuffer(2, 1, 22050);
		let bufferSource = audioContext.createBufferSource();

		bufferSource.buffer = audioBuffer;
		bufferSource.connect(audioContext.destination);

		bufferSource.onended = function(){
			bufferSource.disconnect();
			bufferSource = null;
			audioBuffer = null;
		};

		bufferSource.start();
	};

	const IsSafari = () => {
		let ua = window.navigator.userAgent.toLowerCase();
		return ua.indexOf('apple') >= 0 && ua.indexOf('safari') >= 0;
	};

	const AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
	const audioContext = new AudioContext();

	window._audio_permission = false;
	window.addEventListener('click', Authorization, true);
	window._AudioContext = AudioContext;
	window._global_AC = audioContext;
	window._decodeAudioData = (buffer,AC = audioContext) => {
		if(IsSafari()){
			return new Promise((resolve, reject) => {
				AC.decodeAudioData(
					 buffer,
					 (audioBuffer) => {
						 resolve(audioBuffer);
					 },
					 e => {
						 console.warn('error: decoding audio data failed!');
						 reject(e);
					 }
				);
			});
		}

		return AC.decodeAudioData(buffer);
	};
	window._XHR = ({
		url,
		data,
		method = 'post',
		responseType = '',
		async = true
	}) => {
		let xhr = new XMLHttpRequest();

		return new Promise((resolve, reject) => {
			xhr.responseType = responseType;
			xhr.onloadend = (e) => {
				if(xhr.readyState === 4 && xhr.status === 200){
					resolve(xhr.response);
				}
			};
			xhr.open(method, url, async);
			xhr.send(data);
		});
	};
})();