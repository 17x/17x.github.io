/* name : zTouch */
/* date : 2017-01-01 */
/* author : Yahone */
/* version : 1.0.0 */
;
(function() {
    var touch = {},
        longTapDelay = 750,
        touchTimeout,
        longTapTimeout

    /*长按处理*/
    function longTap() {
        /*清除长按判断定时器*/
        longTapTimeout = null
            /*为保存的对象触发长按事件*/
        trigger(touch.el, 'longTap')
            /*清空touch对象为空状态*/
        touch = {}
    }

    /*触发器*/
    function trigger(ele, method) {
        //创建、初始化、派发事件
        if (ele[method]) {
            ele[method]()
        } else {
            var evt = document.createEvent("HTMLEvents")
            evt.initEvent(method, true, true)
                //initEvent(type,'can bubble','can be prevent')
            ele.dispatchEvent(evt)

        }
    }

    /*取消所有定时器*/
    function cancelAll() {
        if (touchTimeout) clearTimeout(touchTimeout)
            // if (tapTimeout) clearTimeout(tapTimeout);
            // if (swipeTimeout) clearTimeout(swipeTimeout);
        if (longTapTimeout) clearTimeout(longTapTimeout)
        touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
        touch = {}
    }

    /*判断滑动方向*/
    function swipeDirection(x1, y1, x2, y2) {
        return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 > x2) ? 'Left' : 'Right' : (y1 > y2) ? 'Up' : 'Down'
    }

    /*页面加载完成后定义变量于与绑定事件*/
    window.addEventListener('load', function() {
        var now,
            delta,
            deltaX = 0,
            deltaY = 0,
            firstTouch

        /*手指触碰到屏幕的第一瞬间*/
        document.ontouchstart = document.addEventListener('touchstart', function(e) {
            if (e.touches && e.touches.length === 1) {
                /*更新本次点击时间*/
                now = Date.now()
                    /*判断如果存在上次点击，计算时间增量*/
                delta = now - (touch.last || now)

                /*时间增量大于0ms而小于300ms，判定为doubleTap */
                /*当用户在短时间内点击了第二次，允许出现±5的位置偏移*/
                if (delta > 0 && delta <= 300 && Math.abs(touch.x1 - e.touches[0].pageX) < 5 && Math.abs(touch.y1 - e.touches[0].pageY) < 5) {
                    touch.isDoubleTap = true
                }
                firstTouch = e.touches[0]
                touch.el = 'tagName' in firstTouch.target ? firstTouch.target : firstTouch.target.parentNode
                touch.x1 = firstTouch.pageX
                touch.y1 = firstTouch.pageY
                longTapTimeout = null
                longTapTimeout = setTimeout(longTap, longTapDelay)
                touch.last = now
            }
        })

        /*手指触碰到屏幕后开始移动(未离开屏幕)*/
        document.ontouchmove = document.addEventListener('touchmove', function(e) {
            firstTouch = e.touches[0]
            if (longTapTimeout) clearTimeout(longTapTimeout)
            touch.x2 = firstTouch.pageX
            touch.y2 = firstTouch.pageY
            deltaX += Math.abs(touch.x1 - touch.x2)
            deltaY += Math.abs(touch.y1 - touch.y2)
        })

        /*手指离开屏幕后*/
        document.ontouchend = document.addEventListener('touchend', function(e) {
            /*手指离开了屏幕判断清除长按定时*/
            if (longTapTimeout) clearTimeout(longTapTimeout)
            longTapTimeout = null

            /*如果存在二次点击增量，并移动了大于30个单位*/
            if (touch.x2 && Math.abs(touch.x1 - touch.x2) > 30 ||
                touch.y2 && Math.abs(touch.y1 - touch.y2) > 30) {
                /*触发swipe事件*/
                /*判断并触发对应方向的swipe事件*/
                trigger(touch.el, 'swipe')
                trigger(touch.el, 'swipe' + swipeDirection(touch.x1, touch.y1, touch.x2, touch.y2))
                    /*清空touch对象*/
                cancelAll()
            }

            /*如果存在上一次点击*/
            else if ('last' in touch)
                if (deltaX < 30 && deltaY < 30) {
                    if (touch.isDoubleTap) {
                        if (touch.el) trigger(touch.el, 'dblTap')
                        touch = {}
                    } else {
                        touchTimeout = setTimeout(function() {
                            touchTimeout = null
                            if (touch.el) trigger(touch.el, 'tap')
                        }, 300)
                    }
                } else {
                    touch = {}
                }
            deltaX = deltaY = 0
        })
    })
})()
