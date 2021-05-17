window.addEventListener('load', Onload);

function Onload(){
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let paintBoard = new PaintBoard({
        canvas,
        width : window.innerWidth * 0.8,
        height : window.innerHeight * 0.6,
        showTool : true,
        history : true,
        historyMax : 10
    });
    // console.log(paintBoard);
    // window.a = paintBoard
    let toolbarConfig = {
        attrs : [
            {
                code : 'lineWidth',
                name : 'Line width',
                type : 'select',
                options : new Array(20).fill(undefined)
                                       .map((v, i) => {
                                           return i + 1;
                                       }),
                cb : (v) => {
                    paintBoard.strokeConfig.strokeWidth = Number(v.target.value);
                }
            }, {
                code : 'strokeColor',
                type : 'color-picker',
                name : 'Color',
                cb : (v) => {
                    console.log(v);
                    paintBoard.strokeConfig.strokeColor = v;
                }
            }
        ],
        methods : [
            {
                code : 'undo',
                onclick : () => {
                    paintBoard.Undo();
                },
                icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAACiElEQVRYCe2WPWhTURTHm/Sl0A5BEPxAoUsMLjq5CWIGF5EOBbM4JcQXRBQJ1EVBB+sgLn4sSYbwaEAIOnSQDkWiODk5iRgFBVGsgmQoJLHmxd+BG0lz330vFV+W9sDl3I/zP///O/e9e9/ExI5t9wpEggrgOM7uTqfzmLgp27aPB8VvdT3qB6hUKvva7fbzXq93krgZfKBgv3xea8aE5XL5IITPaMlIJPIxGo0WSPDTKwlzXdpaPB7/kk6nW4YYz2mjgFKptAz5HChJOO2J1id/M/UCsY8SiYSTSqVk7Gt+Ai4h4D5olwp8oP/NlIl1i7U9xMziYyruHULOYy9NOJk3CpBFtmHBdd07EJC7dzmfzz+UeZNVq9V4q9WaA3ONmMPgfoGzwTkmjK8AASHiIkke0F3naXaR1DUl68/X63Wr0WjcZrxAkwqe4Qta6a8P+kABEoyIU7gZBCwPgoP6xWJRKnELAU3LspLZbPbHMGYkAcOgrYx5mZ9SwdOIuEcVrgxjfc+B4eB/HF8F58q7UKvVtK8pdAE89RsEvKJNN5tN2cpNFroAYaP8q+KpwjHxgzYWARB/VqT7B8mlPxYB8Gwo4v4hpYZjEsCJeEAY2Yqvf5lVZywVYAtOKD55ITdZ6AI4jGTfUzx9l0pop2HoAiC/SQWm8E9yuZx2nYcqgKc/C7FN24jFYtfxmoUmgCP4HGxLirGQyWTea+xMyD3+X42L6yjX8Q3KPi+J2fu7nIbGa1y7jFCeBJenyb6NZJBNEriXdoR2SIHWIS9AXlZjT6dVgGQXiNRuLU+0xySka0zX8Itc39L3NU0A0Yt8Lm8p48gVANOF8DvtE2/6a3zgT4uvqp3FbVWBP/wF1KVfqIIdAAAAAElFTkSuQmCC'
            },
            {
                code : 'redo',
                onclick : () => {
                    paintBoard.Redo();
                },
                icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAACpklEQVRYCe2WO4gTQRjHL5vLwcIWIugp1yiIqQVbH0EsxMJGBTGQJk9QQRALvUKLqw5FEcmTNHYBrxDRQiFWgq0iJNFOEQ6MhBQRNy9/syZHbmd2V2WszMDwzXyP//efb2ZnZ2Fh3v73CoT+RQEKhcJrcH+Ypnk2kUi0/XIYfsa/sY3HY7EoE3m81+u9KpfLy344f1yBWq1mdrvdlX6/vxwKhcIqcPQ7IXCXvp9xKxwOn0ilUp9VvosqpVtXr9cXm81mAv2Fdrt9DOnEkcDt6sxn9N8ZHxwMBg8xnFE5BxKghEcajUaZ4KgAYEV9QD8iN5kOhc6j7cHvgLDh+9LD59dKvIzFYjExHA5L2JcAaSDXLMt6Eo/Hu14xQp/P5y8hHoixYRjXM5mMMxZzd/M8A6VS6RTJnxJgkHw9Go3eiMViAzeAe86qDYh30FvEXSa5KL9nUxKoVqu7bNtuAbaDyNVcLrfmiaAw8BmK/e5ls9kXCvM2lZIAJbyP1xVW8AyQ09siNE+ke0B8ZuRI0Udi/zTnk+AkAp1O5yReJqt/k06n30sRmhUSAQ7e4UmOwP3TwUUiAOheAUwFPulIEIShIhCZBPWDgnXYJQKs/MsEeEVHgiAMiQDfvnPwRqPR0aBgHXaJQCQSeU4VhvQYN5pzHnQk8sKQCCSTyW84P6YSS/RbXoG69BKBCfAqcgCBNFU4pyuZCkdJgOv3A85XRQBn4RFX80VVsA6d8l8wBeansk4Vrok5Z2KDl81tXjZvp3Yd0peASMAWpKnCHYaWmENEVOcdxDb5V/g9SIT7VsPfxr/I9d7aUjIIJCCcxcOSK/omw/MA+T4yhb9Xg/w9ttfZ2qnPbxGYOpPcqFQqh5D76LupjPJROvWflazeZr7BA+XrrH4+nlfgJyKa7MaJ5phWAAAAAElFTkSuQmCC'
            },
            {
                code : 'eraser',
                radius : 5,
                onclick : (e, data) => {
                    let _ele = e.target;

                    if(_ele.classList.contains('active')){
                        _ele.classList.remove('active');
                        _ele.style.borderColor = 'transparent';
                        canvas.style.cursor = 'default';
                    } else{
                        canvas.style.cursor = `url(${ data.icon }) -20 -20, auto`;
                        _ele.classList.add('active');
                        _ele.style.borderColor = '#000000';
                    }

                    // console.log(data);
                    paintBoard.ToggleErase(e);
                },
                icon : 'data:image/png;base64,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'
            },
            {
                code : 'clear',
                onclick : () => {
                    paintBoard.Clear();
                },
                icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAnCAYAAAB9qAq4AAABfGlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGAqSSwoyGFhYGDIzSspCnJ3UoiIjFJgv8PAzcDDIMRgxSCemFxc4BgQ4MOAE3y7xsAIoi/rgsxK8/x506a1fP4WNq+ZclYlOrj1gQF3SmpxMgMDIweQnZxSnJwLZOcA2TrJBUUlQPYMIFu3vKQAxD4BZIsUAR0IZN8BsdMh7A8gdhKYzcQCVhMS5AxkSwDZAkkQtgaInQ5hW4DYyRmJKUC2B8guiBvAgNPDRcHcwFLXkYC7SQa5OaUwO0ChxZOaFxoMcgcQyzB4MLgwKDCYMxgwWDLoMjiWpFaUgBQ65xdUFmWmZ5QoOAJDNlXBOT+3oLQktUhHwTMvWU9HwcjA0ACkDhRnEKM/B4FNZxQ7jxDLX8jAYKnMwMDcgxBLmsbAsH0PA4PEKYSYyjwGBn5rBoZt5woSixLhDmf8xkKIX5xmbARh8zgxMLDe+///sxoDA/skBoa/E////73o//+/i4H2A+PsQA4AJHdp4IxrEg8AAAJISURBVFgJ7Vi/a8JAFH6WLtKOOjno4OAqOLSDtKvg2IKDpf0vKlIni1j/i/4YhHYUdHdIF3HRouCgjU5GJ8WhBctLuTSJzyRnamwhB+Hu3X257/O7M3kXz+fH5xL+cNm3q202n8HT4xMIrwI51fHRMaQv0nB4cEiOm3XumQHMxqvV6lpxeC8KR8ymxbaDnU5H5vZ6vZBKpcDn88mxJElQLpdhsVgAw2wi0rZARhoIBOD05JSFcl2v16HX62n6eAPbS8xLyIt3BfI6pse7Duod4Y1dB3kd0+NdB/WO8Maug7yO6fFr38WYRg0GAz1+JcZkwKwgpv3WNoNBMBhcSctIgf1+H4p3RTkTMZ3VAmA0GkGpVDJFYkaUuc5AKBRSsOQerNVqvyZOYbLQQKeRW11IB8fSWMZgCpXNZldsV09g1M7d5IyGlTHcToVCAdBpxs0GSQfZYDQa3Vgcm8NKjccB5KKKoUDqBqf7yCVmIgRBgG63y8Kt1tPplJzfUOBkMgG8dllIgfF4HCKRyE50+f1+DS8pEJ+Dw+FQA3QqmM/nACc/bKRAURRtn8Z+KPhay6X2QwcpkE0ZDocdW2o8O1NHVEOBuA/Pz86Z3q3Wzy/PpMA//xx0RCC6c3l1CfnbvLIKGOPVareUPqrhiECK2Grf/xbYbDat/lDbuHVchv9iTH/uH+4hFovZEjCRvl+XVGYtvovQaDTkVIsi8VCfgHFTVyoVCr/1vmQyqXm0kXswkUgAfrp1uiAncqsL6aAasOs26eCuRan5vwA8GsD9JV8DyAAAAABJRU5ErkJggg=='
            },
            {
                code : 'paintBucket',
                onclick : (e, data) => {
                    let _ele = e.target;

                    if(_ele.classList.contains('active')){
                        _ele.classList.remove('active');
                        _ele.style.borderColor = 'transparent';
                        // canvas.style.cursor = 'default';
                    } else{
                        // canvas.style.cursor = `url(${ data.icon }) -20 -20, auto`;
                        _ele.classList.add('active');
                        _ele.style.borderColor = '#000000';
                    }

                    paintBoard.TogglePaintBucket(e);
                },
                icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAABfGlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGAqSSwoyGFhYGDIzSspCnJ3UoiIjFJgv8PAzcDDIMRgxSCemFxc4BgQ4MOAE3y7xsAIoi/rgsxK8/x506a1fP4WNq+ZclYlOrj1gQF3SmpxMgMDIweQnZxSnJwLZOcA2TrJBUUlQPYMIFu3vKQAxD4BZIsUAR0IZN8BsdMh7A8gdhKYzcQCVhMS5AxkSwDZAkkQtgaInQ5hW4DYyRmJKUC2B8guiBvAgNPDRcHcwFLXkYC7SQa5OaUwO0ChxZOaFxoMcgcQyzB4MLgwKDCYMxgwWDLoMjiWpFaUgBQ65xdUFmWmZ5QoOAJDNlXBOT+3oLQktUhHwTMvWU9HwcjA0ACkDhRnEKM/B4FNZxQ7jxDLX8jAYKnMwMDcgxBLmsbAsH0PA4PEKYSYyjwGBn5rBoZt5woSixLhDmf8xkKIX5xmbARh8zgxMLDe+///sxoDA/skBoa/E////73o//+/i4H2A+PsQA4AJHdp4IxrEg8AAAKESURBVFgJ7Za/a1pRFMdPmi7SDII/cHCoAadmbWgmG3F3060RJxdXwUW6CeLo4CKYNv+Dm7EuKXERSUEQUhWnRJ1SHBpo8z1ww7vvl/eqkKE98N595/44n3vOPffet/f4+/EPvYC8egEmI/+DXSN//uWcLjuXUp+bHzeSrqq8Vu348OuB2u32c/fTj6dUr9fp6vsVZTIZgq4jezpZDW+bzSbbj0ajNBqNyOPx0Gq10oZrJRe8gncQQAGvVqsUDod5QuZl4I4OLy2w2QbgvV6PisWiNlwLfN27Zs/gYSqV4nkg9JvA90ul0mezJ3b67c9bqtVqFAqF2MOjd0fk9Xqp3+/zEwwGKZ1O02AwoG63y22RtxE7U1ynBAa0UqlwIj1NlA7eHPBgGN4UvjbUAgpSPp9/hjL56WVMOIR9PB4rrbkrGHu30Wgwo1Ao0GHkUPCkUsCxtRByRGRdwjnuY0DL5TItFgtyg0ozMCnCxmw2s+xzW4+NA7LZrKOnJo5FdfPcFnzx9YLELI/fH1sMqlTgDMeDNU8mk5yYyAFsSYjlrBbn78mHEwoEAtT51qH5fC6xhsOhpC+XS14SqdJBmU6nBGckMGaIQx+CUnw72NCqFme6GCSFejKZiPqdloheIpGQbErgWCzGayH12FKJx+OUy+UsViQwshBbB2HZheAmO/t0ZmtKAqMHDoldwAF1+zmwgLeFI1rroGDYgjeFA4pouXkK2xBHMBp1wi6gTuc57BnFFYyOKnAVqM/n418llBDHS4JbDS9xPeLHzij4G8FNJO5oY5vb91qPxWA7zzeFwqayx2ICd/d31Gq1yO/3Ew4cXU+FHW2wGLhtqRzqbUHm8f8e+C/s3Cw3dZCfAQAAAABJRU5ErkJggg=='
            }
        ]/*,
        shapes : [
            'pentagram',
            'rPolygon'
        ]*/
    };
    let toolbar = document.createElement('div');

    toolbar.style.display = 'flex';
    toolbar.style.height = '20px';
    toolbar.style.marginTop = '5px';
    toolbarConfig.attrs.map(attr => {
        let toolbarDomItem = document.createElement('div');
        let itemName = document.createElement('div');

        toolbarDomItem.style.display = 'flex';
        toolbarDomItem.style.marginLeft = '5px';
        toolbarDomItem.id = attr.code;
        itemName.innerHTML = attr.name;
        toolbarDomItem.append(itemName);

        if(attr.type === 'select'){
            let select = document.createElement('select');
            attr.options.map(option => {
                let optionDom = document.createElement('option');
                optionDom.value = option;
                optionDom.innerHTML = option;
                select.append(optionDom);
            });

            select.selectedIndex = 0;
            select.onchange = attr.cb;
            toolbarDomItem.append(select);
        } else if(attr.type === 'color-picker'){
            let color = document.createElement('div');

            color.style.width = '80px';
            color.style.height = '20px';
            color.style.backgroundColor = '#000000';

            color.onclick = () => {
                let c = document.createElement('input');

                c.onchange = () => {
                    console.log(c.value);
                    color.style.backgroundColor = c.value;
                    paintBoard.strokeConfig.strokeColor = c.value;
                };
                c.type = 'color';
                c.click();
            };
            toolbarDomItem.append(color);
        }

        toolbar.append(toolbarDomItem);
    });
    toolbarConfig.methods.map(method => {
        let toolbarDomItem = document.createElement('div');
        toolbarDomItem.style.width = '20px';
        toolbarDomItem.style.height = '20px';
        toolbarDomItem.style.marginLeft = '25px';
        toolbarDomItem.style.border = '1px solid transparent';
        toolbarDomItem.style.background = `url('${ method.icon }') 0 0 no-repeat`;
        toolbarDomItem.style.backgroundSize = `100% 100%`;

        toolbarDomItem.onclick = (event) => method.onclick(event, method);
        toolbar.append(toolbarDomItem);
    });
    document.body.append(canvas, toolbar);

    file.onclick = () => {
        paintBoard.SaveData('file',(file) =>{
            console.log('file',file);
        })
    };

    arraybuffer.onclick = () => {
        console.log(
            'arraybuffer',
            paintBoard.SaveData('arraybuffer')
        );

    };

    base64.onclick = () => {
        console.log(
            'base64',
            paintBoard.SaveData('base64')
        );

    };
}