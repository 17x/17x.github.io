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
    paintBoard.Tool('pen');

    let lineWidth = document.querySelector('#line-width');
    let lineColor = document.querySelector('#line-color');
    let btnClean = document.querySelector('#btn-clean');
    let btnUndo = document.querySelector('#btn-undo');
    let btnRedo = document.querySelector('#btn-redo');

    // console.log(lineWidth, lineColor);

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
                let v = value.hexs + value.hexa.a;

                penColor = v;
                lineColor.style.backgroundColor = v;
                paintBoard.strokeConfig.strokeColor = v;
            }
        });
    };

    btnClean.onclick = () => {
        paintBoard.Method('clear');
    };

    btnUndo.onclick = () => {
        paintBoard.Method('undo');
    };

    btnRedo.onclick = () => {
        paintBoard.Method('redo');
    };
}