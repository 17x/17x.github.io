;(() => {
	// Get Authority of play audio
	const Authorization = () => {
		// only once
		window.removeEventListener('click', Authorization, true);

		//
		var gainNode = audioContext.createGain();
		var audioBuffer = audioContext.createBuffer(2, 1, 22050);
		var bufferSource = audioContext.createBufferSource();

		gainNode.connect(audioContext.destination);
		bufferSource.buffer = audioBuffer;
		bufferSource.connect(gainNode);

		bufferSource.onended = function(){
			console.log(bufferSource);
			// debugger
			bufferSource = null;
			// audioBuffer.disconnect();
			audioBuffer = null;
			gainNode.disconnect();
			gainNode = null;
		};

		bufferSource.start();
	};

	const IsSafari = () => {
		let ua = window.navigator.userAgent.toLowerCase();
		return ua.indexOf('apple') >= 0 && ua.indexOf('safari') >= 0;
	};

	const AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
	const audioContext = new AudioContext();

	window.addEventListener('click', Authorization, true);
	window._global_AC = audioContext;
	window._decodeAudioData = (buffer) => {
		if(IsSafari()){
			return new Promise((resolve, reject) => {
				audioContext.decodeAudioData(
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

		return audioContext.decodeAudioData(buffer);
	};
	window._XHR = ({ url, data, method = 'post', responseType = '', async = true }) => {
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