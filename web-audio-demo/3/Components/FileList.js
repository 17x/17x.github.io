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

		files.map(file => {
			//console.log(file);
			// <div class="fileList-item">
			// 			<div class="fileList-item-name">name0.mpr</div>
			// 			<div class="fileList-item-play">▶️⏸</div>
			// 			<div class="fileList-item-delete">➖️</div>
			// 		</div>

			let oDom = document.createElement('div');
			let oName = document.createElement('div');
			let oPlay = document.createElement('div');
			let oDelete = document.createElement('div');

			oDom.classList.add('fileList-item')
			oName.classList.add('fileList-item-name')
			oPlay.classList.add('fileList-item-play')
			oDelete.classList.add('fileList-item-delete')

			oName.innerHTML = file.name;
			oPlay.innerHTML = '▶️'; // ⏸
			oDelete.innerHTML = '➖️';

			oDom.append(oName, oPlay, oDelete);
			dom.append(oDom);
		});
	}
}