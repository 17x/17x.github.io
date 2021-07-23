window.addEventListener('load', Onload);

function Onload(){
    let canvas = document.querySelector('#canvas1');
    let penColor = '#ff0000';
    let paintBoard = new PaintBoard({
        canvas,
        enableHistory : true,
        historyMax : 5,
        logicalWidth : window.innerWidth,
        logicalHeight : window.innerHeight,
        strokeConfig : {
            strokeWidth : 10,
            strokeColor : penColor
        }
    });

    // console.log(paintBoard);
    // paintBoard.Tool('pen');

    let lineWidth = document.querySelector('#line-width');
    let clearRadius = document.querySelector('#clear-radius');
    let lineColor = document.querySelector('#line-color');
    let oClean = document.querySelector('#clean');
    let oUndo = document.querySelector('#undo');
    let oRedo = document.querySelector('#redo');
    let oPen = document.querySelector('#pen');
    let oLine = document.querySelector('#line');
    let oPolygon = document.querySelector('#polygon');
    let oEraser = document.querySelector('#eraser');
    let oPaintBucket = document.querySelector('#paint-bucket');

    // console.log(lineWidth, lineColor);

    clearRadius.onchange = (e) => {
        paintBoard.clearRadius = Number(clearRadius.value);
    };

    lineWidth.onchange = (e) => {
        paintBoard.strokeConfig.strokeWidth = Number(lineWidth.value);
    };

    lineColor.onclick = (e) => {
        ColorPicker.Open({
            x : e.x,
            y : e.y,
            color : penColor,
            close : 'backdrop',
            onClose : (value) => {
                let v = value.hexs;

                penColor = v;
                lineColor.style.backgroundColor = v;
                paintBoard.strokeConfig.strokeColor = v;
            }
        });
    };

    oClean.onclick = () => {
        paintBoard.Method('clear');
    };

    oUndo.onclick = () => {
        paintBoard.Method('undo');
    };

    oRedo.onclick = () => {
        paintBoard.Method('redo');
    };

    oPen.onclick = () => {
        classTool(oPen);
        paintBoard.Tool('pen');
    };

    oLine.onclick = () => {
        classTool(oLine);
        paintBoard.Tool('line');
    };

    oPolygon.onclick = () => {
        classTool(oPolygon);
        paintBoard.Tool('polygon');
    };

    oEraser.onclick = () => {
        classTool(oEraser);
        paintBoard.Tool('eraser');
    };

    oPaintBucket.onclick = () => {
        classTool(oPaintBucket);
        paintBoard.Tool('paintBucket');
    };

    classTool(oPen);
    paintBoard.Tool('pen');

    function classTool(newOne){
        const className = 'tool-active';
        let oldOne = document.querySelector('.' + className);

        if(oldOne){
            oldOne.classList.remove(className);
        }

        if(oldOne !== newOne){
            newOne.classList.add(className);
        }
    }
}