/*
*
* Supported input
*
* String
*** rgb String 'rgb(R,G,B)'
*** rgba String 'rgb(R,G,B,A)'
*** hexa String '#f00' | '#f00f' | '#ff0000' | '#ff0000ff'
* Object
*** rgb : {r,g,b}
*** rgba : {r,g,b,a}
*** hex : {r:R_Hex, g:G_Hex, b:B_Hex}
*** hexa :{r:R_Hex, g:G_Hex, b:B_Hex, a:A_Hex}
*** hsv :{h[0-1], s[0-1], v:[0-1]}
*** hsva :{h[0-1], s[0-1], v:[0-1], a[0-1]
*
*/

const ColorHelpers = {
    ValidateColor : (i) => {
        let R = ColorHelpers.StandardizeColor(i);
        let { rgba } = R;

        if(
            rgba.r < 0 ||
            rgba.r > 255 ||
            rgba.g < 0 ||
            rgba.g > 255 ||
            rgba.b < 0 ||
            rgba.b > 255 ||
            rgba.a < 0 ||
            rgba.a > 1
        ){
            return false;
        }

        return R;
    },
    StandardizeColor : (i) => {
        // console.log(i);
        let _f = false;
        let t = Object.prototype.toString.call(i);
        let rgba;
        let hexa;
        let hsva;
        let hsla;
        let hexs;
        let hueColor;
        let alpha;
        let inputType = {};

        if(t === '[object String]'){
            i = i.toLowerCase();
            inputType.t1 = 's';
            if(/rgb/g.test(i)){
                rgba = ColorHelpers.RGBs2RGB(i);
                inputType.t2 = 'rgb';
            } else if(/#/g.test(i)){
                // hexs = i;
                hexa = ColorHelpers.HEXs2HEX(i);
                rgba = ColorHelpers.HEX2RGB(hexa);
            } else{
                _f = !0;
            }
        } else if(t === '[object Object]'){
            inputType.t1 = 'o';
            // copy
            i = { ...i };

            if(isNaN(i.a)){
                i.a = 1;
            }

            if(
                !isNaN(i.r)
                && !isNaN(i.g)
                && !isNaN(i.b)
            ){
                inputType.t2 = 'rgb';
                rgba = { ...i };
                hexa = ColorHelpers.RGB2HEX(rgba);
            } else if(
                !isNaN(i.h)
                && !isNaN(i.s)
                && !isNaN(i.v)
            ){
                inputType.t2 = 'hsv';
                hsva = { ...i };
                rgba = ColorHelpers.HSV2RGB(hsva);
            } else{
                _f = !0;
            }
        } else{
            _f = !0;
        }

        if(_f){
            // debugger
            throw new Error('Input type error');
        }

        if(!hexa){
            hexa = ColorHelpers.RGB2HEX(rgba);
        }

        if(!hsva){
            hsva = ColorHelpers.RGB2HSV(rgba);
        }

        if(!hsla){
            hsla = ColorHelpers.HSV2HSL(hsva);
        }

        if(!hexs){
            hexs = `#${ hexa.r }${ hexa.g }${ hexa.b }`;
        }

        hueColor = ColorHelpers.GetColorFromHUEByPercent(1 - hsva.h);
        alpha = rgba.a;

        return {
            rgba,
            hexa,
            hexs,
            hsva,
            hsla,
            alpha,
            hueColor,
            inputType
        };
    },
    HEX2RGB : ({ r, g, b, a = 'ff' }) => {
        return {
            r : parseInt(r, 16),
            g : parseInt(g, 16),
            b : parseInt(b, 16),
            a : parseInt(a, 16) / 255
        };
    },
    HEXs2HEX : (s) => {
        s = s.substr(1);

        /*
        refer https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
        R (red), G (green), B (blue), and A (alpha) are hexadecimal characters (0–9, A–F).
        A is optional.
        The three-digit notation (#RGB) is a shorter version of the six-digit form (#RRGGBB).
        For example, #f09 is the same color as #ff0099.
        Likewise, the four-digit RGB notation (#RGBA) is a shorter version of the eight-digit form (#RRGGBBAA).
        For example, #0f38 is the same color as #00ff3388.
         */
        let hexa;

        if(s.length === 3){
            hexa = {
                r : s[0] + s[0],
                g : s[1] + s[1],
                b : s[2] + s[2]
            };
        } else if(s.length === 4){
            hexa = {
                r : s[0] + s[0],
                g : s[1] + s[1],
                b : s[2] + s[2],
                a : s[3] + s[3]
            };
        } else if(s.length === 6){
            hexa = {
                r : s.substr(0, 2),
                g : s.substr(2, 2),
                b : s.substr(4, 2)
            };
        } else if(s.length === 8){
            hexa = {
                r : s.substr(0, 2),
                g : s.substr(2, 2),
                b : s.substr(4, 2),
                a : s.substr(6, 2)
            };
        }

        if(!hexa){
            throw new Error('Input type error');
        }

        if(!hexa.a){
            hexa.a = 'ff';
        }

        return hexa;
    },
    RGBs2RGB : (s) => {
        let from = s.indexOf('(');
        s = s.substring(from + 1, s.length - 1)
             .split(',');
        if(from === -1 || s.length < 3){
            throw new Error('Input type error');
        }

        return {
            r : Number(s[0]),
            g : Number(s[1]),
            b : Number(s[2]),
            a : Number(s[3]) || 1
        };
    },
    RGB2HEX : ({ r, g, b, a = 1 }) => {
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);
        a = Math.round(a * 255)
                .toString(16);

        r = r.length === 1 ? '0' + r : r;
        g = g.length === 1 ? '0' + g : g;
        b = b.length === 1 ? '0' + b : b;
        a = a.length === 1 ? '0' + a : a;

        return {
            r,
            g,
            b,
            a
        };
    },
    RGB2HSV : ({ r, g, b, a = 1 }) => {
        var max = Math.max(r, g, b), min = Math.min(r, g, b),
            d = max - min,
            h,
            s = (max === 0 ? 0 : d / max),
            v = max / 255;

        switch(max){
            case min:
                h = 0;
                break;
            case r:
                h = (g - b) + d * (g < b ? 6 : 0);
                h /= 6 * d;
                break;
            case g:
                h = (b - r) + d * 2;
                h /= 6 * d;
                break;
            case b:
                h = (r - g) + d * 4;
                h /= 6 * d;
                break;
        }

        return {
            h : h,
            s : s,
            v : v,
            a
        };
    },
    HSV2RGB : ({ h, s, v, a = 1 }) => {
        var r, g, b, i, f, p, q, t;

        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch(i % 6){
            case 0:
                r = v, g = t, b = p;
                break;
            case 1:
                r = q, g = v, b = p;
                break;
            case 2:
                r = p, g = v, b = t;
                break;
            case 3:
                r = p, g = q, b = v;
                break;
            case 4:
                r = t, g = p, b = v;
                break;
            case 5:
                r = v, g = p, b = q;
                break;
        }
        return {
            r : Math.round(r * 255),
            g : Math.round(g * 255),
            b : Math.round(b * 255),
            a
        };
    },
    HSV2HSL : ({ h, s, v, a = 1 }) => {
        return {
            h,
            s : (s * v / ((h = (2 - s) * v) < 1 ? h : 2 - h)) || 0,
            l : h / 2,
            a
        };
    },
    HSL2HSV : (h, s, l, a = 1) => {
        let _s;
        let _v;

        l *= 2;
        s *= (l <= 1) ? l : 2 - l;
        _v = (l + s) / 2;
        _s = (2 * s) / (l + s);

        return {
            h,
            s : _s,
            v : _v,
            a
        };
    },
    GetColorFromHUEByPercent : (p) => {
        // console.log('input p', p);
        if(p === 0 || p === 1){
            return { ...ColorHelpers.HUE_Data[0].o };
        }

        let newRgb;
        // let d = Number((p * 360).toFixed(2));
        let d = p * 360;

        for(let i = 0; i < ColorHelpers.HUE_Data.length; i++){
            let next = ColorHelpers.HUE_Data[i + 1];

            if(d === next.d){
                newRgb = { ...next.o };
            } else if(d < next.d){
                let curr = ColorHelpers.HUE_Data[i];
                newRgb = {};

                Object.keys(curr.o)
                      .map(k => {
                          let a = curr.o[k];
                          let b = next.o[k];
                          let p2 = (d - curr.d) / 60;

                          if(a < b){
                              // incre
                              newRgb[k] = Math.round(p2 * 255);
                          } else if(a > b){
                              // decre
                              newRgb[k] = Math.round((1 - p2) * 255);
                          } else{
                              newRgb[k] = a;
                          }
                      });

                break;
            }
        }

        return newRgb;
    },
    HSV2Pos : ({ s, v }) => {

    },
    HUE_Data : [
        /*
        Red R 255 0
        Yellow R 255 G 255 60
        Green G 255 120
        Cyan G 255 B 255 180
        Blue B 255 240
        Magenta R 255 B 255 300
        */
        {
            o : {
                r : 255,
                g : 0,
                b : 0
            },
            n : 'rgb(255,0,0)',
            d : 0
        },
        {
            o : {
                r : 255,
                g : 0,
                b : 255
            },
            n : 'rgb(255,0,255)',
            d : 60
        },
        {
            o : {
                r : 0,
                g : 0,
                b : 255
            },
            n : 'rgb(0,0,255)',
            d : 120
        },
        {
            o : {
                r : 0,
                g : 255,
                b : 255
            },
            n : 'rgb(0,255,255)',
            d : 180
        },
        {
            o : {
                r : 0,
                g : 255,
                b : 0
            },
            n : 'rgb(0,255,0)',
            d : 240
        },
        {
            o : {
                r : 255,
                g : 255,
                b : 0
            },
            n : 'rgb(255,255,0)',
            d : 300
        },
        {
            o : {
                r : 255,
                g : 0,
                b : 0
            },
            n : 'rgb(255,0,0)',
            d : 360
        }
    ]
};

class ColorPicker{
    static domString = `
        <style>        
        .colorPickerWrap {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }    
        .colorPickerWrap .backdrop {
            position: absolute;
            width: 100%;
            height: 100%;
        }    
        .colorPickerWrap .main {
            background-color: #ffffff;
            position: absolute;
            box-shadow: 0 0 2px 0 #3a3a3a;
            border-radius: 1px;
            /*width: 235px;*/
            /*height: 335px;*/
        }    
        .colorPickerWrap .main::before,
        .colorPickerWrap .main::after {
            position: absolute;
            width: 15px;
            height: 9px;
        }    
        .colorPickerWrap .main.top::before {
            content: "";
            background: transparent url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAJCAYAAADtj3ZXAAABfmlDQ1BIRCA3MDktQQAAKJGVjrFKI1EUhr8bo1EMGCSohSwXFLGYSHSLGLUZIxjFQqJCkm4yGePCJLlMrqgPYGejhWizy+orLLvNFpZioYUgCMFnEARBRMZi0DQusn/1nQ/OOT+EtKWUGwaqNe3l5mdlvlCUkSbdROllin7LbihzeXmJjyPg8QYBcJ2wlHLXF55uZ3a3fvzqWDz+MqWNf+y9pbvsNGwQnYBdbthVEC5g2MrTII6AxJZWGsQ5EPfyhSKIJhCvBHwPxEv5QhFCYSDureYyEBoAYqWAR4FYJeBJIGZvWGUIZQEj6ABAV3ZOppLphPlJ7/9O1d18+yGAqFNbWwFiwCBZ5pCkSJImgamdbQ2Qqasd71tlQ0tTKdeRmXpVbWrHM+RCzR4z5ERyPAmQLxRlcPohhwBE31XL1X9Cegja9lqudAh//sLARcsNf4eeafh9qSzPei8uHsOfzY31rxMBR2eh/c73H0YgcgAv+77/fOL7L6fQ1oQz9xUmqGnhJTh2ngAAAAlwSFlzAAALEwAACxMBAJqcGAAAB01pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA0LTI1VDE4OjU4OjE5KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTA0LTI2VDExOjE2OjA5KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wNC0yNlQxMToxNjowOSswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjOWI5MTJmOC00YWNiLTRjZGItODhiNS01NjA1MDkxYjJkMGQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4OTk5NDc0ZC1mYmIzLWY3NDEtODdhMi01YWJlYTJmZjMxZWQiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiODBiMzcxMy01ZDAzLTRiMzAtYjNkOC1kYTFjY2I5ZmIxNTEiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJIRCA3MDktQSIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmI4MGIzNzEzLTVkMDMtNGIzMC1iM2Q4LWRhMWNjYjlmYjE1MSIgc3RFdnQ6d2hlbj0iMjAyMS0wNC0yNVQxODo1ODoxOSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjg0ZjlhODBiLTFiZDAtNGE2ZS1hYWFhLWIxMWZhZmE3ZDM1YyIgc3RFdnQ6d2hlbj0iMjAyMS0wNC0yNVQxODo1ODoxOSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM5YjkxMmY4LTRhY2ItNGNkYi04OGI1LTU2MDUwOTFiMmQwZCIgc3RFdnQ6d2hlbj0iMjAyMS0wNC0yNlQxMToxNjowOSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPnhtcC5kaWQ6NzMwMDA0NjQtM2YxYi00NjBkLWFmMzYtYjQ1MzgxMzY0ZGE4PC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5B3YBwAAAINJREFUKJGdkLENgzAURH8oKFJAJmCHKDUTMC0Va7h068JyY3uBk3wpwAUOJiQnXfFPeq/4klJ6Fb2TlBjjc5lnkpRaD8cQwriBPBMIgA5AA6DJYwZzaoLd4Zx7lOCZQLz3o7W2NcYMNbAmEJKite6/gUcCUUpNV8FS8PGcXwS3VfFf3oL0nGPexqR2AAAAAElFTkSuQmCC");
            top: -9px;
            left: 3px;
        }    
        .colorPickerWrap .main.bottom::after {
            content: "";
            background: transparent url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAJCAYAAADtj3ZXAAABgWlDQ1BIRCA3MDktQQAAKJGVjj9rWmEUh59XTUxRqARpHUp5IaV0uAZjB6vJ4h+ohgxiW1C36/VGA1d9ub5i8gGyZUmG0C4tbb9CSZYMGUOGZAgUCtLPUBACpYTb4ZI6hdDf9JwHzjk/CGhTKScE9Prarb0uyHqjKcMTIkRZJMdj0xqqfLW6wZ25/o4AuEqaSjmbld8/1nbHn77Nr394mtPG3XsARNr20AKxAFjtodUD4QCGpVwN4j2QHGulQZwBcbfeaIKYAPGOz7+AeKveaEIgBMTdt7UiBBJArOXzCyDW8fkVELO6ZhsCZcDwOwDwoFySmVQ2mb+n93+n54xufwggavffvQFiwBPKlJBkSJElSV7b2xqgOFA77lanq2VeKceWxUFPjbTtGrLSt5YNmU6tpADqjab0T09rCEA8upy5wWfILkFwb+Zah3B8AonzmXv2ER6uwtGFMl3zX3FxHbpvHm6+TPscLcDcT8+bPofwAdzse96fL5538xWCEzh1/gIkd2ngdRvKIgAAAAlwSFlzAAALEwAACxMBAJqcGAAABeBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA0LTI1VDE4OjQ4OjM4KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wNC0yNVQxODo1NDoyNCswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNC0yNVQxODo1NDoyNCswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJIRCA3MDktQSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmYjVkYzQ1NC04ZTE0LTRhMGMtYTIzMS1kNmI1MTA4MjVjMjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzMwMDA0NjQtM2YxYi00NjBkLWFmMzYtYjQ1MzgxMzY0ZGE4IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NzMwMDA0NjQtM2YxYi00NjBkLWFmMzYtYjQ1MzgxMzY0ZGE4Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MzAwMDQ2NC0zZjFiLTQ2MGQtYWYzNi1iNDUzODEzNjRkYTgiIHN0RXZ0OndoZW49IjIwMjEtMDQtMjVUMTg6NDg6MzgrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmYjVkYzQ1NC04ZTE0LTRhMGMtYTIzMS1kNmI1MTA4MjVjMjciIHN0RXZ0OndoZW49IjIwMjEtMDQtMjVUMTg6NTQ6MjQrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvZ0lgsAAADNSURBVCiRnZAxi8JQEIT3RbBQUNMIXqEWNgo2Nlb5B/cv/QX7mpcfcWKb0oSE1+xr0q5kbMwRxePUge3mm1nGAAB9qCi19iMwtZair+Vyk1p7fBecLRbfBIAAkGP+wQtyzMiybAyASESGZVn2iqLoOeb/wEOe5/Oqqvoikvw2AyDv/favAMcM7/2k6ydVjVTVqKqp69qIyNQxp49gC9z8kaqO7prbCyFM2w8cM0IIyTOfaZpm1RnyTERkjLncVsU+SXZxHJ8ADIho3V39CrynEkQVDqOiAAAAAElFTkSuQmCC");
            bottom: -9px;
            left: 2px;
        }
        .colorPickerWrap .section-middle{
            height: 95px;
            border-bottom: 1px solid #dfdfdf;
            padding-top: 15px;
        }
        .colorPickerWrap .section-middle-a{
            display: flex;
            width: 200px;
            margin: 0 auto;
        }
        .colorPickerWrap canvas{
            display: block;            
        }
        .colorPickerWrap .hsvCanvas {
            cursor: pointer;
            width: 235px;
            height: 124px;
        }    
        .colorPickerWrap .sampleCanvas {
            border-radius: 32px;
            margin-right: 10px;
        }    
        .colorPickerWrap .hueWrap,
        .colorPickerWrap .alphaWrap {
            position: relative;
            /*float: left;*/
            cursor: pointer;
            width: 150px;
            height: 10px;
            margin-left: 7px;
        }
        .colorPickerWrap .hueWrap{
            margin-bottom: 10px;
        }
        .colorPickerWrap .hueHandle,
        .colorPickerWrap .alphaHandle {
            position: absolute;
            width: 0;
            height: 0;
            left: 0;
            top: 0;
        }
        .colorPickerWrap .hueHandle::after,
        .colorPickerWrap .alphaHandle::after{
            content: '';
            position: absolute;
            left: -7px;
            top: -2px;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            box-shadow: 0 0 4px 1px #999999;
            background-color: #f7f7f7;
        }
        .colorPickerWrap .modeWrap{
            clear: both;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 210px;
            height: 55px;
            margin: 9px auto 0 auto;
        }
        .colorPickerWrap .modeWrap > div{
            display: none;
            width: 178px;
        }
        .colorPickerWrap p{
            user-select: none;
        }
        .colorPickerWrap p,
        .colorPickerWrap input{
           margin: 0;
           padding: 0;
           text-align: center;
           font-size: 12px;
        }
        .colorPickerWrap input{
            color: #2d2d2d;
            box-sizing: border-box;
            outline: none;
        }
        .colorPickerWrap .modeWrap p{          
           color:#8b8b8e;
           font-family: sans-serif;
           height: 26px;
           line-height: 26px;
        }
        .colorPickerWrap .modeWrap input{
            height: 24px;
            border: 1px solid #dcdbdc;
        }
        .colorPickerWrap .modeWrap .active{
            display: flex;
        }
        .colorPickerWrap .mode-hex{
            display: flex;
            flex-direction: column;
            align-self: center;
            text-align: center;
        }
        .colorPickerWrap .mode-hex input{
            width: 100%;
        }
        .colorPickerWrap .mode-rgba,
        .colorPickerWrap .mode-hsva{
            justify-content: space-between;
        }
        .colorPickerWrap .mode-rgba>div,
        .colorPickerWrap .mode-hsva>div{
            
        }
        .colorPickerWrap .mode-rgba>div>input,
        .colorPickerWrap .mode-hsva>div>input{
            width: 40px;
        }
        .colorPickerWrap .mode-hsva{}
        .colorPickerWrap .switch{
            width: 20px;
            height: 20px;
            border-radius: 3px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;      
        }
        .colorPickerWrap .switch:hover{
            background-color: #d8d8d8;
        }
        .colorPickerWrap .switch::before,
        .colorPickerWrap .switch::after{
            content: '';
            width: 0;
            height: 0;
            border-style: solid;
            font-size: 0;
        }
        .colorPickerWrap .switch::before{            
            margin-bottom: 4px;
            border-width: 0 3px 4px 3px;
            border-color: transparent transparent #1d1e21 transparent; 
        }
        .colorPickerWrap .switch::after{
            border-width: 4px 3px 0 3px;
            border-color: #1d1e21 transparent transparent transparent;                     
        }
        .colorPickerWrap .section-recent-wrap{
        }
        .colorPickerWrap .section-recent{
            width: 216px;
            height: 72px;
            margin: 14px auto 0 15px;
            /*display: grid;*/
            /*grid-template-columns: repeat(9, 24px);*/
        }
        .colorPickerWrap .recent-item{
            width: 12px;
            height: 12px;
            /*align-self: center;*/
            /*justify-self: center;*/
            border-radius: 2px;
            float: left;
            margin: 0 12px 12px 0;
        }
        .colorPickerWrap .recent-item:hover{
            cursor:pointer;
            box-shadow: 0 0 5px 1px #c5c5c5;
        }
        </style>
        <div class="backdrop"></div>
        <div class="main">
            <div class="hsvWrap">
                <canvas class="hsvCanvas"></canvas>
            </div>
            <div class="section-middle">
                <div class="section-middle-a">
                    <canvas class="sampleCanvas"></canvas>
                    <div>
                        <div class="hueWrap">
                            <canvas class="hueCanvas"></canvas>
                            <div class="hueHandle"></div>
                        </div>
                        <div class="alphaWrap">
                            <canvas class="alphaCanvas"></canvas>
                            <div class="alphaHandle"></div>
                        </div>
                    </div>
                </div>
                <div class="modeWrap">
                    <div class="mode-hex">
                        <div>
                            <input type="text" />
                            <p>HEX</p>
                        </div>
                    </div>
                    <div class="mode-rgba">
                        <div>
                            <input type="text" />
                            <p>R</p>
                        </div>
                        <div>
                            <input type="text" />
                            <p>G</p>
                        </div>
                        <div>
                            <input type="text" />
                            <p>B</p>
                        </div>
                        <div>
                            <input type="text" />
                            <p>A</p>
                        </div>
                    </div>
                    <div class="mode-hsva active">
                        <div>
                            <input type="text" />
                            <p>H</p>
                        </div>
                        <div>
                            <input type="text" />
                            <p>S</p>
                        </div>
                        <div>
                            <input type="text" />
                            <p>V</p>
                        </div>
                        <div>
                            <input type="text" />
                            <p>A</p>
                        </div>
                    </div>
                    <span class="switch"></span>
                </div>
            </div>
            <div class="section-recent-wrap">
                <div class="section-recent"></div>
            </div>
        </div>
    `;
    static w = 235;
    static h = 320;
    static sampleLen = 32;
    static HSVHeight = 120;
    static HSVPos = {
        x : 0,
        y : 0
    };
    static hueWidth = 150;
    static hueHeight = 10;
    static alphaHeight = 10;
    static colorData = null;
    static recent = [];
    static inputMode = null;


    static Open({
        x = 0,
        y = 0,
        // refer * Supported input *
        color,
        // hsv, enter, backdrop
        close = 'hsv',
        onColorUpdate = null,
        onClose = null
    } = {}){
        let host = document.createElement('div');
        let domWrap = document.createElement('div');
        // copy
        let domMain = null;
        const DisabledSelection = (event) => {
            event.preventDefault();
        };
        const SetSize = (d, w, h) => {
            d.width = w;
            d.height = h;
            d.style.width = w + 'px';
            d.style.height = h + 'px';
        };
        const CommonHandle = (canvas, handle, cb) => {
            canvas.onmousedown = handle.onmousedown = (event) => {
                let _rect = canvas.getBoundingClientRect();
                let w = _rect.width;

                const move = ({ x }) => {
                    let p;
                    let l;

                    x = x - _rect.x;
                    p = x / w;
                    p = p < 0 ? 0 : p;
                    p = p > 1 ? 1 : p;
                    l = p * 100;
                    l = l < 0 ? 0 : l;
                    l = l > 100 ? 100 : l;

                    handle.style.left = l + '%';

                    cb(p);
                };
                const up = () => {
                    document.removeEventListener('mousemove', move);
                    document.removeEventListener('mouseup', up);
                };
                document.addEventListener('mousemove', move);
                document.addEventListener('selectstart', DisabledSelection);
                document.addEventListener('mouseup', up);

                move(event);
            };
        };
        const Get = (a, s) => {
            return a.getElementsByClassName(s)[0];
        };

        // no input
        if(!color){
            // no last
            if(!ColorPicker.colorData){
                color = 'rgba(255,0,0,1)';
                ColorPicker.colorData = ColorHelpers.StandardizeColor(color);
            }
        } else{
            ColorPicker.colorData = ColorHelpers.StandardizeColor(color);
        }

        // skeleton
        domWrap.id = 'colorPicker-' + Date.now();
        domWrap.className = 'colorPickerWrap';
        domWrap.innerHTML = ColorPicker.domString;
        domMain = domWrap.getElementsByClassName('main')[0];
        domMain.classList.add('top');
        domMain.style.width = ColorPicker.w + 'px';
        domMain.style.height = ColorPicker.h + 'px';

        x -= 12;
        domMain.classList.remove('top', 'bottom');
        if((y + 320 + 9) > window.innerHeight){
            y -= 320 + 9;
            domMain.classList.add('bottom');
        } else{
            y += 9;
            domMain.classList.add('top');
        }
        domMain.style.left = x + 'px';
        domMain.style.top = y + 'px';

        // hsvCanvas
        let hsvCanvas = Get(domWrap, 'hsvCanvas');
        SetSize(hsvCanvas, ColorPicker.w, ColorPicker.HSVHeight);
        // event entrance
        hsvCanvas.onmousedown = (event) => {
            let _rect = hsvCanvas.getBoundingClientRect();
            const move = ({ x, y }) => {
                let h;
                let s;
                let v;
                let a = ColorPicker.colorData.alpha;
                let mX = x - _rect.x;
                let mY = y - _rect.y;

                if(mX < 0){
                    mX = 0;
                }
                if(mY < 0){
                    mY = 0;
                }
                if(mX >= ColorPicker.w){
                    mX = ColorPicker.w;
                }
                if(mY >= ColorPicker.HSVHeight){
                    mY = ColorPicker.HSVHeight;
                }

                h = ColorPicker.colorData.hsva.h;
                s = mX / ColorPicker.w;
                v = 1 - (mY / ColorPicker.HSVHeight);
                ColorPicker.colorData = ColorHelpers.StandardizeColor({
                    h,
                    s,
                    v,
                    a
                });
                ColorPicker.onColorUpdate && ColorPicker.onColorUpdate(ColorPicker.colorData);
                // console.log(ColorPicker.colorData);

                ColorPicker.HSVPos = {
                    x : mX,
                    y : mY
                };
                ColorPicker.RenderHSV();
                ColorPicker.RenderSample();
                ColorPicker.RenderAlpha();
                ColorPicker.RenderInput();
            };
            const up = () => {
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
                if(close === 'hsv'){
                    ColorPicker.Close();
                }
            };
            document.addEventListener('mousemove', move);
            document.addEventListener('selectstart', DisabledSelection);
            document.addEventListener('mouseup', up);

            move(event);
        };

        // section2
        let sampleCanvas = Get(domWrap, 'sampleCanvas');
        let hueCanvas = Get(domWrap, 'hueCanvas');
        let hueHandle = Get(domWrap, 'hueHandle');
        let alphaCanvas = Get(domWrap, 'alphaCanvas');
        let alphaHandle = Get(domWrap, 'alphaHandle');

        SetSize(sampleCanvas, ColorPicker.sampleLen, ColorPicker.sampleLen);
        SetSize(hueCanvas, ColorPicker.hueWidth, ColorPicker.hueHeight);
        SetSize(alphaCanvas, ColorPicker.hueWidth, ColorPicker.hueHeight);
        CommonHandle(hueCanvas, hueHandle, (p) => {
            // console.log(p);
            let hsva = {
                ...ColorPicker.colorData.hsva,
                h : 1 - p
            };

            ColorPicker.colorData = ColorHelpers.StandardizeColor(hsva);
            ColorPicker.onColorUpdate && ColorPicker.onColorUpdate(ColorPicker.colorData);
            ColorPicker.RenderHSV();
            ColorPicker.RenderSample();
            ColorPicker.RenderHue();
            ColorPicker.RenderAlpha();
            ColorPicker.RenderInput();
        });
        CommonHandle(alphaCanvas, alphaHandle, (p) => {
            let alphaHex;

            p = Number(p.toPrecision(2));
            alphaHex = Math.floor(p * 255)
                           .toString(16);
            if(alphaHex === '0'){
                alphaHex += '0';
            }
            // set data and re-render sample, input area
            // ColorPicker.SetColor();
            // p =  Number(p.toFixed(2))
            ColorPicker.colorData.alpha = p;
            ColorPicker.colorData.hexa.a = alphaHex;
            ColorPicker.colorData.hsla.a = p;
            ColorPicker.colorData.hsva.a = p;
            ColorPicker.colorData.rgba.a = p;

            ColorPicker.onColorUpdate && ColorPicker.onColorUpdate(ColorPicker.colorData);
            ColorPicker.RenderSample();
            ColorPicker.RenderAlpha();
            ColorPicker.RenderInput();
        });

        // User input area
        let modeWrap = Get(domWrap, 'modeWrap');
        let hexDom = Get(modeWrap, 'mode-hex');
        let rgbaDom = Get(modeWrap, 'mode-rgba');
        let hsvDom = Get(modeWrap, 'mode-hsva');
        let modeSwitch = Get(modeWrap, 'switch');
        let modeDomMap = {
            hex : hexDom,
            rgb : rgbaDom,
            hsv : hsvDom
        };
        const SetInputMode = (t = 'rgb') => {
            ColorPicker.inputMode = t;
            Object.keys(modeDomMap)
                  .map(k => {
                      if(t === k){
                          modeDomMap[k].classList.add('active');
                      } else{
                          modeDomMap[k].classList.remove('active');
                      }
                  });
        };
        const CheckAndCalcInput = (t) => {
            let c;
            let inputs = [...modeDomMap[t].getElementsByTagName('input')];
            let result;

            if(t === 'rgb'){
                c = {
                    r : Number(inputs[0].value),
                    g : Number(inputs[1].value),
                    b : Number(inputs[2].value),
                    a : Number(inputs[3].value)
                };
            } else if(t === 'hex'){
                c = inputs[0].value;
            } else if(t === 'hsv'){
                let h = (Number(inputs[0].value) / 360);
                if(h === 360){
                    h = 0;
                }
                c = {
                    h : h,
                    s : parseInt(inputs[1].value) / 100,
                    v : parseInt(inputs[2].value) / 100,
                    a : Number(inputs[3].value)
                };
            } else{
                return;
            }

            result = ColorHelpers.ValidateColor(c);

            console.log(result);
            if(result){
                ColorPicker.colorData = result;
                ColorPicker.onColorUpdate && ColorPicker.onColorUpdate(ColorPicker.colorData);
                ColorPicker.CalcHSVPos();
                ColorPicker.RenderHSV();
                ColorPicker.RenderSample();
                ColorPicker.SetHueAndAlpha();
                ColorPicker.RenderHue();
                ColorPicker.RenderAlpha();
            }
        };
        const CommonInputHandle = (t, p) => {
            let inputArr = [...p.getElementsByTagName('input')];
            inputArr.map(input => {
                input.onkeyup = () => {
                    CheckAndCalcInput(t);
                };
            });
        };

        ColorPicker.modeDomMap = modeDomMap;
        ColorPicker.inputMode = ColorPicker.colorData.inputType.t2;
        modeSwitch.onclick = () => {
            ColorPicker.RenderInput();
            if(ColorPicker.inputMode === 'rgb'){
                SetInputMode('hsv');
            } else if(ColorPicker.inputMode === 'hsv'){
                SetInputMode('hex');
            } else if(ColorPicker.inputMode === 'hex'){
                SetInputMode('rgb');
            }
        };
        SetInputMode(ColorPicker.inputMode);
        Object.keys(modeDomMap)
              .map(k => {
                  CommonInputHandle(k, modeDomMap[k]);
              });

        let shadow = host.attachShadow({ mode : 'closed' });
        host.setAttribute('style', 'position:fixed;width:100%;height:100%;top:0;left:0;');

        shadow.append(domWrap);
        document.body.append(host);

        // recently usage
        let recent = Get(domWrap, 'section-recent');
        recent.onclick = function(event){
            let _ele = event.target;

            if(_ele.classList.contains('recent-item')){
                // ColorPicker.a;
            }
        };

        // close way
        if(close === 'backdrop'){
            let backdrop = Get(domWrap, 'backdrop');
            backdrop.onclick = () => {
                ColorPicker.Close();
            };
        } else if(close === 'enter'){
            let keyup = (e) => {
                if(e.code.toLowerCase() === 'enter'){
                    ColorPicker.Close();
                    document.removeEventListener('keyup', keyup);
                }
            };

            document.addEventListener('keyup', keyup);
        }

        // shortcut close
        document.addEventListener('keyup', ColorPicker.ShortCloseFunc);

        ColorPicker.shadowHost = host;
        ColorPicker.domWrap = domWrap;
        ColorPicker.onColorUpdate = onColorUpdate;
        ColorPicker.onClose = onClose;
        ColorPicker.CalcHSVPos();
        ColorPicker.hsvCanvas = hsvCanvas;
        ColorPicker.sampleCanvas = sampleCanvas;
        ColorPicker.hueCanvas = hueCanvas;
        ColorPicker.hueHandle = hueHandle;
        ColorPicker.alphaHandle = alphaHandle;
        ColorPicker.alphaCanvas = alphaCanvas;
        ColorPicker.recentDom = recent;
        ColorPicker.SetHueAndAlpha();
        ColorPicker.RenderHSV();
        ColorPicker.RenderSample();
        ColorPicker.RenderHue();
        ColorPicker.RenderAlpha();
        ColorPicker.RenderRecent();
        ColorPicker.RenderInput();
    }

    static ShortCloseFunc(e){
        if(e.code.toLowerCase() === 'escape'){
            ColorPicker.Cancel(false);
            document.removeEventListener('keyup', ColorPicker.ShortCloseFunc);
        }
    }

    static CalcHSVPos(){
        ColorPicker.HSVPos = {
            x : ColorPicker.colorData.hsva.s * ColorPicker.w,
            y : (1 - ColorPicker.colorData.hsva.v) * ColorPicker.HSVHeight
        };
    }

    static SetHueAndAlpha(){
        ColorPicker.hueHandle.style.left = (1 - ColorPicker.colorData.hsva.h) * 100 + '%';
        ColorPicker.alphaHandle.style.left = ColorPicker.colorData.alpha * 100 + '%';
    }

    static RenderHSV(color){
        let cvs = ColorPicker.hsvCanvas;
        let ctx = cvs.getContext('2d');
        let w = ColorPicker.w;
        let h = ColorPicker.HSVHeight;

        if(!color){
            color = ColorPicker.colorData.hueColor;
        }

        ctx.fillStyle = `rgb(${ color.r },${ color.g },${ color.b })`;
        ctx.fillRect(0, 0, w, h);

        // left middle to right middle
        let gradient = ctx.createLinearGradient(0, h / 2, w, h / 2);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        // top center to bottom center
        let gradient2 = ctx.createLinearGradient(w / 2, 0, w / 2, h);
        gradient2.addColorStop(0, 'rgba(0,0,0,0)');
        gradient2.addColorStop(1, 'rgba(0,0,0,1)');
        ctx.fillStyle = gradient2;
        ctx.fillRect(0, 0, w, h);

        // pointer
        let { x, y } = ColorPicker.HSVPos;
        ctx.strokeStyle = '#4082e3';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2, true);
        ctx.stroke();
    }

    static RenderHue(){
        let cvs = ColorPicker.hueCanvas;
        let ctx = cvs.getContext('2d');
        let cData = ColorHelpers.HUE_Data;
        let len = ColorHelpers.HUE_Data.length;
        let w = ColorPicker.hueWidth;
        let h = ColorPicker.hueHeight;
        // left middle to right middle
        let gradient = ctx.createLinearGradient(0, h / 2, w, h / 2);

        for(let i = 0; i < len; i++){
            gradient.addColorStop(cData[i].d / 360, cData[i].n);
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
    }

    static RenderAlpha(){
        let cvs = ColorPicker.alphaCanvas;
        let ctx = cvs.getContext('2d');
        let w = ColorPicker.hueWidth;
        let h = ColorPicker.alphaHeight;
        let _l = 5;
        let len = ColorPicker.hueWidth / _l;

        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#c5c5c5';
        for(let i = 0; i < len; i++){
            ctx.fillRect(
                i * _l,
                i % 2 === 0 ? 0 : _l,
                _l,
                _l
            );
        }

        // left middle to right middle
        let gradient = ctx.createLinearGradient(0, h / 2, w, h / 2);
        let endColor = ColorPicker.colorData.hexs || '#b3b3b3';
        gradient.addColorStop(0, 'rgba(255,255,255,0)');
        gradient.addColorStop(1, endColor);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
    }

    static RenderSample(){
        let cvs = ColorPicker.sampleCanvas;
        let ctx = cvs.getContext('2d');
        let l = 5;
        let w = ColorPicker.sampleLen;
        let h = w;
        let x = 0;
        let y = 0;

        ctx.clearRect(0, 0, w, h);
        ctx.save();
        ctx.fillStyle = '#c5c5c5';
        while(y * l < h){
            ctx.fillRect(
                x * l,
                y * l,
                l,
                l
            );

            // new line
            if((x + 2) * l > w){
                y++;
                x = y % 2 === 0 ? 0 : 1;
            } else{
                x += 2;
            }
        }

        // debugger
        ctx.globalAlpha = ColorPicker.colorData.alpha;
        ctx.fillStyle = ColorPicker.colorData.hexs;
        ctx.fillRect(0, 0, w, h);

        // contrast circle
        if(ColorPicker.colorData.hsva.s < 0.05 && ColorPicker.colorData.hsva.v > 0.95){
            ctx.strokeStyle = '#d8d8d8';
            // ctx.strokeStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(w / 2, h / 2, w / 2, 0, Math.PI * 2, true);
            ctx.stroke();
        }

        ctx.restore();
    }

    static RenderInput(){
        let { rgba, hsva, hexs, hexa } = ColorPicker.colorData;

        // rgb
        let arr1 = [...ColorPicker.modeDomMap['rgb'].getElementsByTagName('input')];
        arr1[0].value = rgba.r;
        arr1[1].value = rgba.g;
        arr1[2].value = rgba.b;
        arr1[3].value = Number(rgba.a.toFixed(2));

        // hsv
        let arr2 = [...ColorPicker.modeDomMap['hsv'].getElementsByTagName('input')];
        let hValue = Math.floor((hsva.h % 360) * 360);

        if(hValue === 360){
            hValue = 0;
        }
        arr2[0].value = hValue;
        arr2[1].value = Math.floor(hsva.s * 100) + '%';
        arr2[2].value = Math.floor(hsva.v * 100) + '%';
        arr2[3].value = Number(hsva.a.toFixed(2));

        // hex
        let arr3 = [...ColorPicker.modeDomMap['hex'].getElementsByTagName('input')];
        let v = hexs;
        if(hexa.a !== 'ff'){
            v += hexa.a;
        }
        arr3[0].value = v;
    }

    static RenderRecent(){
        for(let i = ColorPicker.recent.length - 1; i >= 0; i--){
            let item = ColorPicker.recent[i];
            let d = document.createElement('div');
            d.className = 'recent-item';
            d.setAttribute('style', `background-color:${ item };`);
            ColorPicker.recentDom.append(d);
        }
    }

    static Cancel(){
        ColorPicker.onClose = null;
        ColorPicker.shadowHost.remove();
        document.removeEventListener('keyup', ColorPicker.ShortCloseFunc);
    }

    static Close(){
        if(ColorPicker.onClose){
            ColorPicker.onClose(ColorPicker.colorData);
        }

        let _l = ColorPicker.recent[ColorPicker.recent.length - 1];
        let _c = ColorPicker.colorData.hexs + ColorPicker.colorData.hexa.a;
        if(_l !== _c){
            if(ColorPicker.recent.length === 27){
                ColorPicker.recent.shift();
            }
            ColorPicker.recent.push(_c);
        }
        ColorPicker.onClose = null;
        ColorPicker.shadowHost.remove();
    }
}