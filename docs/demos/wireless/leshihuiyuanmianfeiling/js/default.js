/*定义require js依赖，传入变量*/
define(['sizzle.min'], function($) {
    /*注册页面与忘记密码页面，获取验证码倒计时*/
    ;(function($) {
        var body = $('body')[0],
            oGetVerifyCode = $('.getVerifyCode')[0],
            oBtn = $('.btn')[0],
            oPhoneNumber = $('.phoneNumber')[0],
            oVerify = $('.verify')[0],
            oActiveTitle = $('.activeTitle')[0];

        if (oActiveTitle) {
            oTipsContentCover = $('.tipsContentCover')[0];
            oActiveTitle.onclick = function() {
                oTipsContentCover.style.display = 'block';
                bindHandler(body, "touchmove", forBidTouchMove);
                $('.tipsContentCover .close')[0].onclick = function() {
                    this.parentNode.style.display = 'none';
                    removeHandler(body, "touchmove", forBidTouchMove);
                }
            }
        }
        /*抽奖按钮*/
        if (oBtn) {
            oBtn.onclick = function() {
                if (!/^1\d{10}$/.test(oPhoneNumber.value)) {
                    alert('请输入正确的手机号码');
                    return false;
                }
                if (!/^\d{6}$/.test(oVerify.value)) {
                    alert('请输入正确的验证码');
                    return false;
                }
                dialog('么中奖', '获得200金币获得200金币获得200金币获得200金币获得200金币');
            };
        }

        /*获取验证码按钮*/
        if (oGetVerifyCode) {
            oGetVerifyCode.onclick = function() {
                verifyTimeout(this);
            }

            /*获取倒计时功能，time参数可选*/
            function verifyTimeout(obj, time) {
                if (obj.nodeType != 1) {
                    return false;
                }

                obj.setAttribute('disabled', 'true');
                time = time || 20;
                obj.innerHTML = time + "秒重新获取";

                var timer = setInterval(function() {
                    var _Y = (time <= 1) ? (clearInterval(timer) + obj.removeAttribute('disabled') + (obj.innerHTML = "获取验证码")) : (time -= 1) + (obj.innerHTML = time + "秒重新获取");
                }, 1000);
            };
        }

        /*动态对话框功能 isSuc的值为true 或false,awardName在中奖时(isSuc为true)传入有效，并在页面内高亮显示，不中奖时传不传都不会显示*/
        function dialog(isSuc, content) {

            /*禁止body滚动*/
            bindHandler(body, "touchmove", forBidTouchMove);

            /*创建标签*/
            var dialog = document.createElement('div');
            dialog.className = 'dialog';

            /*成功与失败所对应显示的内容*/
            dialog.innerHTML = '<div class="dialogBg"><img src="img/dialogBg.png" /><div class="awardsInfo"><h1>' + isSuc + '</h1><h2 class="awardsContent">' + content + '</h2></div><div class="close"></div></div>';
            body.appendChild(dialog);

            /*为close添加事件，点击后弹窗移除*/
            dialog.getElementsByClassName('close')[0].onclick = function() {
                body.removeChild(document.getElementsByClassName('dialog')[0]);
                removeHandler(body, "touchmove", forBidTouchMove);
            }
        }

        /*禁止冒泡和默认事件*/
        function forBidTouchMove(e) {
            stopPropagation(e);
            preventDefault(e);
        }

        //停止冒泡
        function stopPropagation(event) {
            var e = event || window.event;
            if (e.stopPropagation)
                e.stopPropagation();
            e.cancelBubble = true;
        }

        //停止默认事件
        function preventDefault(event) {
            var e = event || window.event;
            if (e.preventDefault)
                e.preventDefault();
            e.returnValue = false;
        }

        // 事件绑定
        function bindHandler(elem, type, handler) {
            if (window.addEventListener) { // 标准浏览器
                // elem:节点    type:事件类型   handler:事件处理程序
                // 最后一个参数为true:在捕获阶段调用事件处理程序    为false:在冒泡阶段调用事件处理程序
                elem.addEventListener(type, handler, false);
            } else if (window.attachEvent) { // IE浏览器
                elem.attachEvent("on" + type, handler);
            }
        };

        // 事件解除
        function removeHandler(elem, type, handler) {
            if (window.removeEventListener) { // 标准浏览器
                elem.removeEventListener(type, handler, false);
            } else if (window.detachEvent) { // IE浏览器
                elem.detachEvent("on" + type, handler);
            }
        };
    })($);
});
