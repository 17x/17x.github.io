/*
*
*
* */
class PaintBoard{
    props = null;
    isPainting = false;
    isClean = true;
    isContinuous = false;
    _lastMouseUpTimeStamp = null;
    _bucketDoing = false;
    eraseMode = false;
    paintBucketMode = false;
    strokeConfig = {
        strokeWidth : 1,
        strokeColor : '#000000'
    };

    constructor(props){
        let { canvas, width, height, inputEventFunc, history = false, historyMax = 10 } = props;

        canvas.width = width;
        canvas.height = height;

        this.props = props;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.Init();

        if(history){
            this.history = history;
            this.historyMax = historyMax;
            this.historyIndex = -1;
            this.historyStack = [];
        }

        this.Clear();
    }

    Init(){
        let { canvas, ctx } = this;
        const disabledSelection = (event) => {
            event.preventDefault();
        };
        const move = (event) => {
            let { strokeWidth, strokeColor } = this.strokeConfig;
            let currCoord = PaintBoard.CoordTransform({
                canvas,
                event
            });

            if(this.eraseMode){
                PaintBoard.Erase({
                    lastCoord : this.lastCoord,
                    currCoord,
                    ctx
                });
            } else{
                PaintBoard.Stroke({
                    lastCoord : this.lastCoord,
                    currCoord,
                    ctx,
                    strokeWidth,
                    strokeColor
                });
            }

            this.lastCoord = currCoord;
        };
        const up = () => {
            this.isPainting = false;

            if(this.history){
                this.Snapshot(this.isContinuous);
                this._lastMouseUpTimeStamp = Date.now();
            }
            document.removeEventListener('mousemove', move);
            document.removeEventListener('selectstart', disabledSelection);
            document.removeEventListener('mouseup', up);
        };

        canvas.onmousedown = (event) => {
            this.isPainting = true;
            this.lastCoord = PaintBoard.CoordTransform({
                canvas,
                event
            });
            let { strokeWidth, strokeColor } = this.strokeConfig;

            if(this.history){
                this.isClean = false;
                this.ClearRedoList();
                // two operates interval less than 500ms
                this.isContinuous = (Date.now() - this._lastMouseUpTimeStamp) < 1000;
            }

            if(this.paintBucketMode){
                if(this._bucketDoing){
                    console.log('bucket doing');
                    return;
                }

                this._bucketDoing = true;
                PaintBoard.DumpBucket({
                    inputColor : this.strokeConfig.strokeColor,
                    currCoord : this.lastCoord,
                    ctx,
                    cb : (msg) => {
                        console.log('msg in cb', msg);
                        if(msg === 'done'){
                            this.Snapshot();
                        }
                        this._bucketDoing = false;
                    }
                });
                return;
            } else if(this.eraseMode){
                PaintBoard.Erase({
                    lastCoord : this.lastCoord,
                    currCoord : this.lastCoord,
                    ctx
                });
            } else{
                PaintBoard.Stroke({
                    lastCoord : this.lastCoord,
                    currCoord : this.lastCoord,
                    ctx,
                    strokeWidth,
                    strokeColor
                });
            }

            document.addEventListener('mousemove', move);
            document.addEventListener('selectstart', disabledSelection);
            document.addEventListener('mouseup', up);
        };
    }

    SaveData(){

    }

    Destroy(){

    }

    ToggleErase(){
        this.eraseMode = !this.eraseMode;
    }

    TogglePaintBucket(){
        this.paintBucketMode = !this.paintBucketMode;
    }

    Snapshot(replace = false){
        let historyItem = null;
        // cleared
        // console.log('Snapshot - isClean - ', this.isClean);
        if(this.isClean){
            historyItem = {
                t : 'clear'
            };

        } else{
            historyItem = {
                time : Date.now(),
                data : this.canvas.getContext('2d')
                           .getImageData(0, 0, this.canvas.width, this.canvas.height).data
            };
        }

        // replace
        if(replace){
            this.historyStack.pop();
        }

        // handle maximum to avoids overflow
        if(this.historyStack.length >= this.historyMax){
            this.historyStack.shift();
            // console.log(this.historyStack.length);
        }

        this.historyStack.push(historyItem);
        this.historyIndex = this.historyStack.length - 1;
        // console.log(this.historyStack, this.historyIndex);
    }

    ApplyHistory(){
        let handleData = this.historyStack[this.historyIndex];

        if(handleData){
            if(handleData.t === 'init' || handleData.t === 'clear'){
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.isClean = true;
            } else{
                let imageData = new ImageData(handleData.data, this.canvas.width, this.canvas.height);
                this.ctx.putImageData(imageData, 0, 0);
            }
        }
    }

    // New operations will clear
    ClearRedoList(){
        this.historyStack.length = this.historyIndex + 1;
    }

    Undo(){
        this.historyIndex -= 1;

        if(this.historyIndex < 0){
            this.historyIndex = 0;
        }

        this.ApplyHistory();
    }

    Redo(){
        this.historyIndex += 1;

        if(this.historyIndex > this.historyStack.length - 1){
            this.historyIndex = this.historyStack.length - 1;
        } else{
            this.ApplyHistory();
        }
    }

    Clear(){
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.isClean = true;
        this.ClearRedoList();
        let _b = false;

        if(this.historyIndex > -1){
            _b = this.historyStack[this.historyIndex].t === 'clear';
        }
        this.Snapshot(_b);
    }

    static Stroke({ ctx, lastCoord, currCoord, strokeWidth, strokeColor }){
        // anti-aliasing, increase max to repeatedly render
        for(let i = 0; i < 1; i++){
            ctx.beginPath();
            ctx.lineCap = 'round';
            ctx.lineWidth = strokeWidth;
            ctx.strokeStyle = strokeColor;
            ctx.moveTo(lastCoord.x, lastCoord.y);
            ctx.lineTo(currCoord.x, currCoord.y);
            ctx.stroke();
        }
    }

    static Erase({ ctx, lastCoord, currCoord, r = 10 }){
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineWidth = r * 2;
        ctx.strokeStyle = '#ffffff';
        ctx.moveTo(lastCoord.x, lastCoord.y);
        ctx.lineTo(currCoord.x, currCoord.y);
        ctx.stroke();
    }

    static DumpBucket({ ctx, currCoord, inputColor, cb }){
        let { x, y } = currCoord;
        let { width, height } = ctx.canvas;
        let imageData = ctx.getImageData(0, 0, width, height);
        let startColor = PaintBoard.GetImageDataByCoord({
            coord : currCoord,
            imageData
        });
        let pathMap = {};
        let todoArr = [[x, y]];
        let wait = false;
        let sum = null;

        inputColor = PaintBoard.hexToRgbA(inputColor);

        let d1 = PaintBoard.CompareColor(
            inputColor,
            startColor
        );

        if(d1 === 0){
            cb && cb('same color');
            return;
        }

        try{
            SafeLock();
        } catch(e){
            console.log(e);
            cb && cb(e);
        } finally{
            // console.log(Object.keys(pathMap).length);
            // console.log(pathMap);
            // cb && cb();
        }

        function SafeLock(){
            let tmp = todoArr;
            wait = false;
            sum = 5000;
            todoArr = [];

            for(let item of tmp){
                let [x, y] = item;
                Do(x, y);
            }

            if(wait){
                setTimeout(function(){
                    SafeLock();
                }, 0);
            } else{
                ctx.putImageData(imageData, 0, 0);
                cb && cb('done');
            }
        }

        // do
        function Do(x, y){
            if(pathMap[x + '_' + y]){
                pathMap[x + '_' + y]++;
            }

            if(sum-- < 0){
                wait = true;
                todoArr.push([x, y]);
                return;
            }
            let currRgb = PaintBoard.GetImageDataByCoord({
                coord : {
                    x,
                    y
                },
                imageData
            });

            // handle current
            let distance = PaintBoard.CompareColor(
                startColor,
                currRgb
            );
            if(distance < 10){
                PaintBoard.SetImageDataByCoord({
                    imageData,
                    rgba : inputColor,
                    coord : {
                        x,
                        y
                    }
                });
            } else{
                return;
            }

            pathMap[x + '_' + y] = true;

            for(let i = x - 1; i < x + 2; i++){
                for(let j = y - 1; j < y + 2; j++){
                    if(
                        0 <= i && i < width && 0 <= j && j < height && !pathMap[i + '_' + j]
                    ){
                        pathMap[i + '_' + j] = true;
                        Do(i, j);
                    }
                }
            }
        }
    }

    static CompareColor(c1, c2){
        var d = 0;

        Object.keys(c1)
              .map(k => {
                  d += (c1[k] - c2[k]) ** 2;
              });
        return Math.sqrt(d);
    }

    static hexToRgbA(hex){
        let c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c = hex.substring(1)
                   .split('');
            if(c.length === 3){
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');

            return {
                r : (c >> 16) & 255,
                g : (c >> 8) & 255,
                b : c & 255,
                a : 255
            };
        }
        throw new Error('Bad Hex');
    }

    static GetImageDataByCoord({ imageData, coord }){
        let { x, y } = coord;
        let { width, height, data } = imageData;
        var index = y * (width * 4) + x * 4;

        return {
            r : data[index],
            g : data[index + 1],
            b : data[index + 2],
            a : data[index + 3]
        };
    }

    static SetImageDataByCoord({ imageData, coord, rgba }){
        let { x, y } = coord;
        let { width, height, data } = imageData;
        var index = y * (width * 4) + x * 4;
        let { r, g, b, a } = rgba;

        // console.log(rgba);
        a = a || 255;
        // console.log(a);
        data[index] = r;
        data[index + 1] = g;
        data[index + 2] = b;
        data[index + 3] = a;
    }

    static CoordTransform({ canvas, event }){
        let _rect = canvas.getBoundingClientRect();
        let x = event.x - _rect.x;
        let y = event.y - _rect.y;

        return {
            x,
            y
        };
    }
}