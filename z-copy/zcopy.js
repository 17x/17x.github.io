const ZCopy = ({ input, mode = 'text', fileOption = null, cb, error, alertMsg = '' }) => {
    let isClipApi = 'ClipboardItem' in window && navigator.clipboard;

    const CopyText = (text) => {
        // Clipboard api
        if('ClipboardItem' in window && navigator.clipboard){
            // let _i = [new ClipboardItem({ 'text/plain' : new Blob([text], { type : 'text/plain' }) })];
            navigator.clipboard.writeText(text).then(() => {
                if(cb){
                    cb(text);
                } else if(alertMsg){
                    alert(alertMsg);
                }
            }, (e) => {
                error && error(e);
            });
        } else if('execCommand' in document){
            // create element and select text
            let ele = document.createElement('input');

            document.body.append(ele);
            ele.style.position = 'fixed';
            ele.style.left = '100%';
            ele.value = text;
            ele.focus();
            ele.select();

            try{
                document.execCommand('copy');
                if(cb){
                    cb(text);
                } else if(alertMsg){
                    alert(alertMsg);
                }
            } catch(e){
                error && error(e);
            } finally{
                document.body.removeChild(ele);
            }
        }
    };
    const CopyFile = (blob, mime) => {
        // Clipboard api
        if(isClipApi){
            let _i = [new ClipboardItem({ [mime] : blob })];
            navigator.clipboard.write(_i).then(() => {
                if(cb){
                    cb();
                } else if(alertMsg){
                    alert(alertMsg);
                }
            }, (e) => {
                console.log(e);
                error && error(e);
            });
        } else{
            throw new Error('Compatibility error.');
        }
    };

    let t = Object.prototype.toString.call(input).toLowerCase();

    if(t === '[object string]'){
        CopyText(input);
    } else if(mode === 'file'){
        if(fileOption.mime.indexOf('image') === -1){
            throw new Error('Only Image kind be supported.');
        }
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');

        canvas.width = fileOption.width;
        canvas.height = fileOption.height;
        ctx.drawImage(input, 0, 0);
        canvas.toBlob((r) => {
            console.log(r);
            CopyFile(r, fileOption.mime);
        });
    }
};