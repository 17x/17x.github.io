;
(function($) {
    /*定义touch对象、touch对象倒计时、tap倒计时、滑动倒计时。长按时间>=750ms响应为longtap事件*/
    var touch = {},
        touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
        longTapDelay = 750

    /*滑动的方向判断(left,right,up,down)*/
    function swipeDirection(x1, x2, y1, y2) {
        return Math.abs(x1 - x2) >=
            Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
    }

    /*长按处理*/
    function longTap() {
        longTapTimeout = null
        if (touch.last) {
            touch.el.trigger('longTap')
            touch = {}
        }
    }

    /*取消长按处理*/
    function cancelLongTap() {
        if (longTapTimeout) clearTimeout(longTapTimeout)
        longTapTimeout = null
    }

    /*取消所有定时器*/
    function cancelAll() {
        if (touchTimeout) clearTimeout(touchTimeout)
        if (tapTimeout) clearTimeout(tapTimeout)
        if (swipeTimeout) clearTimeout(swipeTimeout)
        if (longTapTimeout) clearTimeout(longTapTimeout)
        touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
        touch = {}
    }

    $(document).ready(function() {
        var now, delta, deltaX = 0,
            deltaY = 0,
            firstTouch

        $(document)
            .on('touchstart', function(e) {
                /*如果是多根手指触碰，只获取事件列表里的第一个*/
                firstTouch = e.touches[0]
                /*如果浏览器支持touches属性，而且当前只有一根手指触屏，而且touch对象有x2属性*/
                if (e.touches && e.touches.length === 1 && touch.x2) {
                    /*如果我们把他留下来清除触摸运动数据*/
                    // Clear out touch movement data if we have it sticking around
                    /*能解决因为阻止默认事件或其他原因导致touchcancel无法运行的问题*/
                    // This can occur if touchcancel doesn't fire due to preventDefault, etc.
                    touch.x2 = undefined
                    touch.y2 = undefined
                }
                now = Date.now()
                delta = now - (touch.last || now)
                touch.el = $('tagName' in firstTouch.target ?
                    firstTouch.target : firstTouch.target.parentNode)
                touchTimeout && clearTimeout(touchTimeout)
                touch.x1 = firstTouch.pageX
                touch.y1 = firstTouch.pageY
                if (delta > 0 && delta <= 250) touch.isDoubleTap = true
                touch.last = now
                longTapTimeout = setTimeout(longTap, longTapDelay)
                    // adds the current touch contact for IE gesture recognition
            })
            .on('touchmove', function(e) {
                firstTouch = e.touches[0]
                cancelLongTap()
                touch.x2 = firstTouch.pageX
                touch.y2 = firstTouch.pageY

                deltaX += Math.abs(touch.x1 - touch.x2)
                deltaY += Math.abs(touch.y1 - touch.y2)
            })
            .on('touchend', function(e) {
                cancelLongTap()

                // swipe
                if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
                    (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

                    swipeTimeout = setTimeout(function() {
                    touch.el.trigger('swipe')
                    touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
                    touch = {}
                }, 0)

                // normal tap
                else if ('last' in touch)
                // don't fire tap when delta position changed by more than 30 pixels,
                // for instance when moving to a point and back to origin
                    if (deltaX < 30 && deltaY < 30) {
                        // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
                        // ('tap' fires before 'scroll')
                        tapTimeout = setTimeout(function() {

                            // trigger universal 'tap' with the option to cancelTouch()
                            // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
                            var event = $.Event('tap')
                            event.cancelTouch = cancelAll
                            touch.el.trigger(event)

                            // trigger double tap immediately
                            if (touch.isDoubleTap) {
                                if (touch.el) touch.el.trigger('doubleTap')
                                touch = {}
                            }

                            // trigger single tap after 250ms of inactivity
                            else {
                                touchTimeout = setTimeout(function() {
                                    touchTimeout = null
                                    if (touch.el) touch.el.trigger('singleTap')
                                    touch = {}
                                }, 250)
                            }
                        }, 0)
                    } else {
                        touch = {}
                    }
                deltaX = deltaY = 0

            })
            // when the browser window loses focus,
            // for example when a modal dialog is shown,
            // cancel all ongoing events
            .on('touchcancel', cancelAll)

        // scrolling the window indicates intention of the user
        // to scroll, not tap or swipe, so cancel all ongoing events
        $(window).on('scroll', cancelAll)
    })

    ;
    ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
        'doubleTap', 'tap', 'singleTap', 'longTap'
    ].forEach(function(eventName) {
        $.fn[eventName] = function(callback) {
            return this.on(eventName, callback) }
    })
})(Zepto)
