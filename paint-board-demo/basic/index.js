window.addEventListener('load', Onload);

function Onload(){
    let canvas = document.querySelector('#canvas1');
    let penColor = '#ff0000';
    let paintBoard = new PaintBoard({
        canvas,
        logicalWidth : window.innerWidth,
        logicalHeight : window.innerHeight,
        strokeConfig : {
            strokeWidth : 10,
            strokeColor : penColor
        }
    });

    paintBoard.Tool('pen');

    let lineWidth = document.querySelector('#line-width');
    let lineColor = document.querySelector('#line-color');
    let btnClean = document.querySelector('#btn-clean');

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
                let v = value.hexs ;

                penColor = v;
                lineColor.style.backgroundColor = v;
                paintBoard.strokeConfig.strokeColor = v;

            }
        });
    };

    btnClean.onclick = () => {
        paintBoard.Method('clear');
    };
}