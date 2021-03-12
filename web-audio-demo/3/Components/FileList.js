class FileListManagement{
	static files = [];

	static Init({
		data,
		container
	}){
		//console.log(data, container);
		this.files = data;
		this.dom = document.querySelector(container);

		this.Render();
	}

	static Add(){

	}

	static Remove(){

	}

	static Render(){
		let { files, dom } = this;

		dom.innerHTML = '';
		files.map((file, i) => {
			let oDom = document.createElement('div');
			let oName = document.createElement('div');
			let oPlay = document.createElement('div');
			let oDelete = document.createElement('div');

			oDom.classList.add('fileList-item');
			oName.classList.add('fileList-item-name');
			oPlay.classList.add('fileList-item-play');
			oDelete.classList.add('fileList-item-delete');

			oName.innerHTML = file.name;
			oPlay.innerHTML = '<span>▶</span>️'; // ⏸
			oDelete.innerHTML = '➖️';

			oPlay.onclick = () => {

			};

			oDelete.onclick = () => {
				console.log(i);
				files.splice(i, 1);
				// file.
				// oDom.remove();
				FileListManagement.Render();
			};

			oDom.append(oName, oPlay, oDelete);
			dom.append(oDom);
		});
	}
}