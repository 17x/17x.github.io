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

    static PlayItem(file){
        if(file.gainNode){
            file.gainNodeComp.Action('resume')
        }else{
            file.gainNodeComp = new GainNodeComponent({ ctx : _global_AC });
            console.log(file.gainNodeComp);
        }
    }

    static Add(){

    }

    static Remove(){

    }

    static Render(){
        let { files, dom } = this;

        // dom.innerHTML = '';
        files.map((file, i) => {
            let oDom = document.createElement('div');
            let oName = document.createElement('div');
            let oPlay = document.createElement('div');
            let oDelete = document.createElement('div');

            oDom.classList.add('fileList-item');
            oName.classList.add('fileList-item-name');
            oPlay.classList.add('fileList-item-play');
            oDelete.classList.add('fileList-item-delete');

            oDom.innerHTML = `
			<div class="fileList-item ${ file.playing ? 'playing' : '' }">
				<div class="fileList-item-name">${ file.name }</div>
				<div class="fileList-item-time">00:00 / ${ file.duration.toFixed(2) }s</div>
				<div class="fileList-item-action">
					<span data-action="play" title="play">▶️</span>
					<span data-action="pause" title="pause">⏸</span>
					<span data-action="stop" title="stop">⏹</span>
					<span data-action="reset" title="reset">🔄</span>
					</div>
				<div class="fileList-item-property">
					<label><input type="checkbox" name="" id="" data-action="fade-in" /><span title="fade in">fade in</span></label>
					<label><input type="checkbox" name="" id="" data-action="fade-out" /><span title="fade out">fade out</span></label>
                </div>
				<div class="fileList-item-delete"><span data-action="delete">🗑️</span></div>
			</div>`;

            oDom.onclick = (e) => {
                let ele = e.target;
                let actionName = ele.dataset['action'];

                if(actionName){
                    // console.log(actionName);

                    switch(actionName){
                        case 'play':
                            console.log(file);
                            FileListManagement.PlayItem(file);
                            break
                        case 'pause':break
                        case 'stop':break
                        case 'reset':break
                        case 'fade-in':break
                        case 'fade-out':break
                        case 'delete':break
                    }
                }
            };

            oDelete.onclick = () => {
                console.log(i);
                files.splice(i, 1);
                // file.
                // oDom.remove();
                FileListManagement.Render();
            };

            // oDom.append(oName, oPlay, oDelete);
            dom.append(oDom);
        });
    }
}