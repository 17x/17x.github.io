window.addEventListener('load', Onload);

// string :

function Onload(){
    /* ColorPicker.Open({
         x : 5,
         y : 20,
         // color : 'rgb(58,214,191)'
         // color : '#ffff217d',
         /!*  color : {
               r : 255,
               g : 0,
               b : 0
           }*!/
         /!*  color:{
               h:0.16,
               s:0.8,
               v:0.67,
               a:0.67
           },*!/
         // hsv, enter, backdrop
         close : 'enter',
 /!*        onClose : (value) => {
             console.log(value.rgba);
         },*!/
         onColorUpdate : (value) => {
             console.log(value);
         }
     });*/

    // hsv
    div1.onclick = (e) => {
        ColorPicker.Open({
            x : e.x,
            y : e.y,
            color : div1.dataset.color,
            close : 'hsv',
            onClose : (value) => {
                let v = value.hexs + value.hexa.a;
                div1.dataset.color = v;
                div1.style.backgroundColor = v;
            }
        });
    };

    // enter
    div2.onclick = (e) => {
        ColorPicker.Open({
            x : e.x,
            y : e.y,
            color : div2.dataset.color,
            close : 'enter',
            onClose : (value) => {
                let v = value.hexs + value.hexa.a;
                div2.dataset.color = v;
                div2.style.backgroundColor = v;
            }
        });
    };

    // backdrop
    div3.onclick = (e) => {
        ColorPicker.Open({
            x : e.x,
            y : e.y,
            color : div3.dataset.color,
            close : 'backdrop',
            onColorUpdate : (value) => {
                div3.dataset.color = value.hexs;
                div3.style.backgroundColor = value.hexs;
            }
        });
    };
}