window.onload = function(){
	function Authorization() {
		console.log('one time');
		window.removeEventListener('click', Authorization);
		var gainNode = audioContext.createGain();
		gainNode.connect(audioContext.destination);
		var audioBuffer = audioContext.createBuffer(2, 1, 22050);
		var bufferSource = audioContext.createBufferSource();
		bufferSource.buffer = audioBuffer;
		bufferSource.connect(gainNode);

		bufferSource.onended = function() {
			bufferSource = null;
			audioBuffer = null;
			gainNode = null;
		};

		bufferSource.start();
	}

	window.addEventListener('click', Authorization, true);
	const AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
	const audioContext = new AudioContext()
};