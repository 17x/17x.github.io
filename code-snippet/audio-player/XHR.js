class XHR{
	xhr;

	static Create(param){
		let xhr = new XHR(param);
		xhr.Send(param);
		return xhr;
	}

	constructor(){
		let xhr = new XMLHttpRequest();
		if(xhr.overrideMimeType){
			xhr.overrideMimeType('text/xml');
		}
		this.xhr = xhr;
	}

	Send({
		url,
		data,
		type = 'post',
		async = true,
		timeout = 0,
		responseType = '',
		header = {
			'Content-Type' : 'application/json'
		},
		success,
		error
	} = {}){
		let xhr = this.xhr;
		if(type.toLowerCase() === 'get'){
			if(data){
				url += '?' + data;
			}
			data = null;
		}
		xhr.timeout = timeout;
		xhr.responseType = responseType;
		xhr.onloadend = function(){
			if(xhr.readyState === 4){
				if(/^(200|204|206|304)$/.test(xhr.status)){
					success && success(xhr.response, xhr);
				} else if(xhr.status !== 0){//abort信号
					error && error(null, xhr);
				}
			}
		};
		try{
			xhr.open(type, url, async);
			for(let key in header){
				if(header.hasOwnProperty(key)){
					xhr.setRequestHeader(key, header[key]);
				}
			}
			xhr.send(data);
		} catch(e){
			error && error(e, xhr);
		}
	}

	Destroy(){
		this.xhr.abort();
	}
}