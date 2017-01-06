/* name : zAnchorScroll */
/* date : 2016-12-29 */
/* author : Yahone */
/* version : 1.0.0 */

(function(window) {
    // expose for called
    window.zAnchorScroll = function(args) {
        // structure func
        function Anchor(anchorContainer, anchorTagName, scrollContentContainer, scrollTagName) {
            // anchor's parentNode: dom node(cant' be nodeList)
            this.anchorContainer = anchorContainer;
            // anchor's TagName : lowercase
            this.anchorTagName = anchorTagName;
            // scrollContent's parentNode : dom node(cant' be nodeList)
            this.scrollContentContainer = scrollContentContainer;
            // scrollContent's TagName : lowercase
            this.scrollTagName = scrollTagName;
        }
        // initailize
        Anchor.prototype.init = function() {
            // Function throttling
            function throttle(method, context) {
                clearTimeout(method.tId);
                method.tId = setTimeout(function() {
                    method.call(context);
                }, 100);
            }

            // all anchors transto pseudo array
            var anchorLists = getChildNode(this.anchorContainer, this.anchorTagName),
                // all scroll content transto pseudo array
                scrollLists = getChildNode(this.scrollContentContainer, this.scrollTagName),
                // this pointer
                _this = this,
                // current item
                currentIndex = 0,
                // create a activeBar element
                oActiveBar = document.createElement('span');

            // when page is loaded , if scrollBar isn't on the top
            // detemine the page on which part and highlight its correspond anchor
            detemineWitchPartToActive();

            // modified and append oActiveBar
            oActiveBar.className = "activeBar";
            oActiveBar.style.top = 0;
            oActiveBar.style.display = "block";
            oActiveBar.style.position = "absolute";
            oActiveBar.style.width = "100%";
            oActiveBar.style.height = "20px";
            oActiveBar.style.zIndex = "1";
            this.anchorContainer.appendChild(oActiveBar);

            this.timer = null;

            this.anchorContainer.addEventListener('click', function(e) {
                // 如果事件源来自目标类型的标签
                if (e.target.tagName.toLowerCase() === _this.anchorTagName) {
                    // update currentIndex
                    currentIndex = anchorLists.indexOf(e.target);
                    scrollbarMoveTo(scrollLists[currentIndex].offsetTop);
                    updateAnchorStatus();
                }

                // def func
                function scrollbarMoveTo(target) {
                    // target's maximum value is (pageHeight - clientHeight)
                    target = target > (document.body.offsetHeight - window.innerHeight) ? (document.body.offsetHeight - window.innerHeight) : target;
                    clearInterval(_this.timer);
                    var speed = 0;
                    _this.timer = setInterval(function() {
                        if (f_scrollTop() !== target) {
                            speed = (target - f_scrollTop()) / 3;
                            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                            window.scrollTo(0, f_scrollTop() + speed);
                        } else {
                            clearInterval(_this.timer);
                        }
                    }, 30);
                }

            }, false);

            // getScrollTop
            function f_scrollTop() {
                return f_filterResults(
                    window.pageYOffset ? window.pageYOffset : 0,
                    document.documentElement ? document.documentElement.scrollTop : 0,
                    document.body ? document.body.scrollTop : 0
                );
            }
            // determine result
            function f_filterResults(n_win, n_docel, n_body) {
                var n_result = n_win ? n_win : 0;
                if (n_docel && (!n_result || (n_result > n_docel)))
                    n_result = n_docel;
                return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
            }
            // get ChildNodes
            function getChildNode(parent, tagName) {
                var tempList = []
                for (var i = 0; i < parent.childNodes.length; i++) {
                    parent.childNodes[i]
                    if (parent.childNodes[i].nodeType === 1 && parent.childNodes[i].tagName.toLowerCase() === tagName) {
                        tempList.push(parent.childNodes[i])
                    }
                }
                return tempList
            }
            // when mousewhell 
            window.addEventListener('scroll', function(e) {
                throttle(detemineWitchPartToActive, window);
            }, false);

            function detemineWitchPartToActive() {
                function GetRect(element) {
                    var rect = element.getBoundingClientRect();
                    var top = document.documentElement.clientTop;
                    var left = document.documentElement.clientLeft;
                    return {
                        // dom top to the browser top (clientX 0 line)
                        top: rect.top - top,
                        // dom bottom to the browser top (clientX 0 line)
                        bottom: rect.bottom - top,
                        // dom left to the browser left (clientY 0 line)
                        left: rect.left - left,
                        // dom right to the browser left (clientY 0 line)
                        right: rect.right - left
                    };
                }

                // enumerate the scroll content lists
                for (var i = 0; i < scrollLists.length; i++) {
                    // if dom topLine nearby the clientX Line ( Deviation 100px)
                    // if dom topLine under the clientX Line
                    // if dom bottomLine above the clientHeight 1/2 line
                    if (GetRect(scrollLists[i]).top > -100 ||
                        GetRect(scrollLists[i]).bottom > window.innerHeight * 0.5) {
                        currentIndex = scrollLists.indexOf(scrollLists[i]);

                        updateAnchorStatus();

                        return false;
                    }
                }
            }

            // update the anchor status
            function updateAnchorStatus() {
                // remove class "active" from all anchors
                for (var i = 0; i < anchorLists.length; i++) {
                    anchorLists[i].className = replaceAll(anchorLists[i].className, 'active');
                }

                // replaceAll the 'active' class
                function replaceAll(operateStr, toReplace) {
                    var newStr = "";
                    innerReplace(operateStr, toReplace);

                    function innerReplace(str, str2) {
                        if (str.indexOf(toReplace) !== -1) {
                            newStr = str.replace(str2, '');
                            innerReplace(newStr, str2);
                        } else {
                            return;
                        }
                    }
                    return newStr;
                }

                // highlight  
                anchorLists[currentIndex].className += ' active';
                // move the active Bar
                bufferMove(oActiveBar, 'top', anchorLists[currentIndex].offsetTop);

                function bufferMove(obj, attr, target) {
                    clearInterval(obj.timer);
                    var speed = 0;
                    obj.timer = setInterval(function() {
                        if (obj.offsetTop !== target) {
                            speed = (target - obj.offsetTop) / 3;
                            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                            obj.style.top = obj.offsetTop + speed + "px";
                        } else {
                            clearInterval(obj.timer);
                        }
                    }, 30);
                }
            }
        };
        // new instance
        var newAnchor = new Anchor(args.anchorContainer, args.anchorTagName, args.scrollContentContainer, args.scrollTagName);
        // init
        // waiting for IE load
        setTimeout(function() {
            newAnchor.init();
        }, 500);
    };
})(window);
