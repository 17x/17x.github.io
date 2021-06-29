class FileListManagement{
    static files = [];

    static Init({
        data, container
    }){
        console.log(data);
        this.files = data;
        this.dom = document.querySelector(container);
        let ctx = _global_AC;

        this.files.map(file => {
            file.gainNodeComp = new GainNodeComponent({ ctx });

            let ABSNComp = new ABSNComponent({
                ...file,
                GNComp : file.gainNodeComp,
                ctx
            });
            file.gainNodeComp.ABSNComp = ABSNComp;
            file.ABSNComp = ABSNComp;
        });

        /* setInterval(() => {
             this.Render();
         }, 1000);*/

        this.Render();
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
            // console.log(file);
            oDom.innerHTML = `
			<div class="fileList-item ${ file.ABSNComp.status === 'playing' ? 'playing' : '' }">
				<div class="fileList-item-name">${ file.name }</div>
				<div class="fileList-item-time">00:00 / ${ file.duration.toFixed(2) }s</div>
				<div class="fileList-item-action">
					<button class="btn-1" type="button" data-action="play" title="play">play</button>
					<button class="btn-1" type="button" data-action="pause" title="pause">pause</button>
					<button class="btn-1" type="button" data-action="stop" title="stop">stop</button>
					<!--<button class="btn-1" type="button" data-action="reset" title="reset">reset</button>-->
					<button class="btn-1" type="button" data-action="fade-in" title="fade in">fade-in</button>
					<button class="btn-1" type="button" data-action="fade-out" title="fade out">fade-out</button>
					<button class="btn-1" type="button" data-action="vol-up" title="vol up">vol +</button>
					<button class="btn-1" type="button" data-action="vol-down" title="vol down">vol -</button>
<!--					<button class="btn-1" type="button" data-action="delete" title="delete">delete</button>-->
                </div>
			</div>`;

            oDom.onclick = (e) => {
                let ele = e.target;
                let actionName = ele.dataset['action'];

                if(actionName){
                    // console.log(actionName);

                    switch(actionName){
                        case 'play':
                            console.log(file);

                            if(file.ABSNComp.status === 'stop'){
                                file.ABSNComp.Action('Start');
                            } else if(file.ABSNComp.status === 'paused'){
                                file.ABSNComp.Action('Resume');
                            } else{
                                file.ABSNComp.Action('Pause');
                            }

                            FileListManagement.Render();
                            break;
                        case 'pause':
                            file.gainNodeComp.Action('Pause');
                            break;
                        case 'stop':
                            break;
                        case 'fade-in':
                            break;
                        case 'fade-out':
                            break;
                        case 'delete':
                            break;
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