window.onload = () => {
    const showingText = window.showingText;
    const blankDotColor = window.blankDotColor;
    const blankDotOpacity = window.blankDotOpacity;
    const blankDotRadius = window.blankDotRadius;
    const regenerate = window.regenerate;
    const cv1 = window.cv1;
    const ctx = cv1.getContext('2d');
    const cvsSize = {
        width : 0,
        height : 600
    };
    let dotsArray = [];
    let blankDot;
    let blankDotDefaultStyle = {
        x : 0,
        y : 0,
        r : 30,
        color : '#ff0000',
        opacity : 1
    };
    let lineMap = {};
    cv1.height = cvsSize.height;

    // cv1.style.height = cvsSize.height + 'px';

    const Random = (min, max) => {
        if(min > 0){
            max = max - min + 1;
        }
        return Math.floor(Math.random() * max) + min;
    };

    const Random2 = () => {
        let f = Math.random();
        let isSub = Math.ceil(Math.random() * 10) % 2 === 0;

        return isSub ? -f : f;
    };

    const RandomColor = () => {
        let str = '#';
        for(let i = 0; i < 3; i++){
            let t = Random(0, 255)
                .toString(16);

            if(t.length === 1){
                t = '0' + t;
            }

            str += t
        }

        return str
    };

    class Dot{
        constructor({
            x = 0,
            y = 0,
            r = 0,
            i = 0,
            color = 0,
            opacity = 1,
            offsetX = 0,
            offsetY = 0
        }){
            this._x = x;
            this._y = y;
            this.x = x;
            this.y = y;
            this.i = i;
            this.offsetX = offsetX;
            this.offsetY = offsetY;
            this.r = r;
            this.color = color;
            this.opacity = opacity;
            this._timer = null;
            this.showStatus = 'show';
        }

        BounceTo(x, y, d){
            if(this.aniStatus === 'leaving'){
                return;
            }

            clearInterval(this._timer);
            this._timer = null;
            // 记录起点
            let startX = this.x;
            let startY = this.y;
            // 每 S 移动的距离
            let speed = 50;
            // 总计距离
            let totalTime = (d / speed) * 1000;
            let currentTime = 0;
            if(totalTime === 0){
                return;
            }
            this._timer = setInterval(() => {
                if(currentTime >= totalTime){
                    // console.log('当前时间大于等于总时长', currentTime, totalTime, this.x, this.y, this._x, this._y);
                    // console.log(currentTime, totalTime);
                    clearInterval(this._timer);
                    this._timer = null;
                    this.aniStatus = 'backing';
                    // this.x = startX - x;
                    // this.y = startY - y;

                    if(Math.abs(this.x - this._x) <= 2 && Math.abs(this.y - this._y) < 3){
                        this.x = this._x;
                        this.y = this._y;
                        return;
                    }

                    let dotCurrentPos = {
                        x : this.x,
                        y : this.y
                    };
                    let dotOriginPos = {
                        x : this._x,
                        y : this._y
                    };
                    let d = GetDistance(dotCurrentPos, dotOriginPos);
                    let vel = GetVel(dotOriginPos, dotCurrentPos, d);
                    this.BounceTo(vel.x, vel.y, d);
                    return;
                }

                let rate = 17 / totalTime;
                let offsetX = x * rate;
                let offsetY = y * rate;
                // console.log(x, y, rate, offsetX, offsetY);
                this.x -= offsetX;
                this.y -= offsetY;
                if((currentTime + 17) >= totalTime){
                    currentTime = totalTime;
                } else{
                    currentTime += 17;
                }
            }, 17);
        }

        Draw(ctx){
            let { x, y, r, color, opacity } = this;
            /*            if(opacity < 0.5){
             console.log(opacity);

             }*/
            ctx.globalAlpha = opacity;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    const Throttle = (fn, threshold = 1000) => {
        let timer;
        let _last = false;

        return (e) => {
            if(!_last){
                _last = true;

                fn(e);

                timer = setTimeout(() => {
                    // reset
                    _last = null;
                }, threshold);
            }
        };
    };

    const IsIntersection = (d1, d2) => {
        let max = d1.r + d2.r;
        let distance = GetDistance(d1, d2);
        let result = null;

        if(distance <= max){
            result = {
                max,
                distance
            };
        }

        return result;
    };

    const GetDistance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

    const GetVel = (p1, p2, vel) => {
        let dx = p2.x - p1.x;
        let dy = p2.y - p1.y;
        let angle = Math.atan2(dy, dx);
        let xVel = vel * Math.cos(angle);
        let yVel = vel * Math.sin(angle);

        return {
            x : xVel,
            y : yVel
        };
    };

    const Render = () => {
        // console.log('render');
        ctx.clearRect(0, 0, cvsSize.width, cvsSize.height);
        // blankDot && blankDot.Draw(ctx);
        dotsArray.map(dot => dot.Draw(ctx));

        // lines
        ctx.save();
        ctx.strokeStyle = '#ddd';
        Object.keys(lineMap)
              .map(str => {
                  let ids = str.split('_');
                  let start = dotsArray[parseInt(ids[0])];
                  let end = dotsArray[parseInt(ids[1])];

                  // console.log(lineMap[str]);
                  ctx.moveTo(start.x, start.y);
                  ctx.lineTo(end.x, end.y);
                  ctx.stroke();
              });
        ctx.restore();
    };

    const Init = () => {
        let _width = window.innerWidth;
        let _height = window.innerHeight;

        ctx.font = 'bold 310px arial';
        // _width = Math.ceil(ctx.measureText(showingText.value).width);
        cvsSize.width = _width;
        cvsSize.height = _height;
        cv1.width = _width;
        cv1.height = _height;
        // cv1.style.width = _width + 'px';

        // todo  貌似canvas size变化后 font 相关将会失效
        // ctx.font = 'bold 310px arial';
        // ctx.textBaseline = 'top';
        // ctx.textAlign = 'left';
        ctx.fillStyle = '#000000';

        dotsArray = [];

        const CreatePoints = () => {
            let x;
            let y;
            let offsetX;
            let offsetY;

            for(let i = 0; i < 100; i++){
                x = Random(2, cvsSize.width - 2);
                y = Random(2, cvsSize.height - 2);
                offsetX = Random2() / 7;
                offsetY = Random2() / 7;
                dotsArray.push(new Dot({
                    offsetX,
                    offsetY,
                    r : 2,
                    color : '#000000',
                    i,
                    x,
                    y
                }));
            }
        };

        CreatePoints();
    };

    const StartEvents = () => {
        const raf = window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.oRequestAnimationFrame
            || window.msRequestAnimationFrame;

        const checkTouch = (x, y, radius) => {
            let t = y - radius;
            let r = x + radius;
            let b = y + radius;
            let l = x - radius;

            if(t < 0){
                return 't';
            }

            if(r >= cvsSize.width){
                return 'r';
            }

            if(b >= cvsSize.height){
                return 'b';
            }

            if(l < 0){
                return 'l';
            }

            return false;
        };
        const func = () => {
            // move
            dotsArray.length && dotsArray.map(dot => {
                let nextX = dot.x + dot.offsetX;
                let nextY = dot.y + dot.offsetY;
                let r = checkTouch(nextX, nextY, dot.r);

                if(r){
                    if(r === 't' || r === 'b'){
                        dot.offsetY = -dot.offsetY;
                    }

                    if(r === 'r' || r === 'l'){
                        dot.offsetX = -dot.offsetX;
                    }
                } else{
                    dot.x = nextX;
                    dot.y = nextY;
                }
            });

            // line to
            lineMap = {};
            for(let i = 0; i < dotsArray.length; i++){
                let dot = dotsArray[i];
                for(let k = 0; k < dotsArray.length; k++){
                    if(i === k){
                        continue;
                    }
                    let combinedId = (i <= k) ? (i + '_' + k) : (k + '_' + i);

                    if(lineMap[combinedId]){
                        continue;
                    }

                    let d = GetDistance(dot, dotsArray[k]);
                    if(d < 100){
                        // lineMap[combinedId] = RandomColor();
                        lineMap[combinedId] = true;
                    }
                }
            }
            Render();
            raf(func);
        };

        func();

        cv1.onmouseenter = () => {
            blankDot = new Dot(blankDotDefaultStyle);
        };
        cv1.onmouseout = () => {
            blankDot = null;
        };

        document.addEventListener('mousemove', Throttle((e) => {
            if(e.target !== cv1){
                return;
            }
            if(blankDot){
                let rect = cv1.getBoundingClientRect();
                blankDot.x = e.x - rect.left;
                blankDot.y = e.y - rect.top;
            }
        }, 10));
    };

    // 创建所有点
    Init();

    StartEvents();

    window.onresize = Throttle(() => {
        // console.log('throttled');
        Init();
    }, 100);
};