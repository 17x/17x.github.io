/*
 * javascript document
 * 2016-01-18
 * haiyan PC
 */
;
(function() {

    var doc = document,
        oBody = doc.documentElement || doc.body,
        aProps = getElementsByClassName('propertysItem'),
        aShowMoreBtn = getElementsByClassName('showMoreBtn'),
        aTextbook = getElementsByClassName('textbook'),
        aBookDetail = getElementsByClassName('bookDetail'),
        aBtnGetVerify = getElementsByClassName('btnGetVerify');

    /*注册页面与忘记密码页面，获取验证码倒计时*/
    if (aBtnGetVerify.length>0) {
        (function() {
            var oTimeout = getElementsByClassName('timeout')[0];
            aBtnGetVerify[0].onclick = function() {
                aBtnGetVerify[0].style.display = "none";
                x = 60;
                oTimeout.style.display = "block";
                var timer = setInterval(function() {
                    if (x == 60) {
                        x = 59;
                    }
                    if (x <= 1) {
                        clearInterval(timer);
                        aBtnGetVerify[0].style.display = "block";
                        oTimeout.style.display = "none";
                    } else {
                        x -= 1;
                    }
                    oTimeout.innerHTML = x + "秒重新获取";
                }, 1000);
            }
        })();
    }
    /*课本选择页面 点选功能*/
    if (aProps.length>0) {
        for (var i = 0; i < aProps.length; i++) {
            aProps[i].onclick = function(e) {
                var _target = (!e) ? window.event.srcElement : e.target;
                chooseItems(_target);
            }
        };

        function chooseItems(obj) {
            if ((obj.nodeName).toLowerCase() == 'span') {
                if (obj.className.search('active') != -1) {
                    return false;
                }
                var _siblings = obj.parentNode.getElementsByTagName('span');
                for (var i = 0; i < _siblings.length; i++) {
                    _siblings[i].className = '';
                };
                obj.className = 'active';

                var _itmes = getElementsByClassName('active');
                filterEle(_itmes);
            };
        }
    }
    /*显示更多教材*/
    if (aShowMoreBtn.length != 0) {
        // console.log(aShowMoreBtn);
        aShowMoreBtn[0].onclick = function() {
            aTextbook[0].style.height = 'auto';
        }
    }
    /*IE8 getClas处理*/
    function getElementsByClassName(className, root, tagName) {
        if (root) {
            root = typeof root == "string" ? document.getElementById(root) : root;
        } else {
            root = document.body;
        }
        tagName = tagName || "*";
        if (document.getElementsByClassName) { //如果浏览器支持getElementsByClassName，就直接的用
            return root.getElementsByClassName(className);
        } else {
            var tag = root.getElementsByTagName(tagName); //获取指定元素
            var tagAll = []; //用于存储符合条件的元素
            for (var i = 0; i < tag.length; i++) //遍历获得的元素
            {
                for (var j = 0, n = tag[i].className.split(' '); j < n.length; j++) //遍历此元素中所有class的值，如果包含指定的类名，就赋值给tagnameAll
                {
                    if (n[j] == className) {
                        tagAll.push(tag[i]);
                        break;
                    }
                }
            }
            return tagAll;
        }
    }
    /*筛选功能*/
    function filterEle(itmes) {
        var _tempArr = [];
        switch (itmes[0].innerHTML) {
            case '全部':
                _tempArr[0] = 'all';
                break;
            case '语文':
                _tempArr[0] = 'yuwen';
                break;
            case '数学':
                _tempArr[0] = 'shuxue';
                break;
            case '英语':
                _tempArr[0] = 'yingyu';
                break;
            default:
                _tempArr[0] = 'all';
                break;
        }
        switch (itmes[1].innerHTML) {
            case '全部':
                _tempArr[1] = 'all';
                break;
            case '一年级':
                _tempArr[1] = '1';
                break;
            case '二年级':
                _tempArr[1] = '2';
                break;
            case '三年级':
                _tempArr[1] = '3';
                break;
            case '四年级':
                _tempArr[1] = '4';
                break;
            case '五年级':
                _tempArr[1] = '5';
                break;
            case '六年级':
                _tempArr[1] = '6';
                break;
            default:
                _tempArr[1] = 'all';
                break;
        }
        switch (itmes[2].innerHTML) {
            case '全部':
                _tempArr[2] = 'all';
                break;
            case '上册':
                _tempArr[2] = '上册';
                break;
            case '下册':
                _tempArr[2] = '下册';
                break;
            default:
                _tempArr[2] = 'all';
                break;
        }
        console.log(_tempArr)
        if (aBookDetail) {
            var aLis = aBookDetail[0].getElementsByTagName('li');
            aBookDetail[0].style.display = 'none';
            for (var i = 0; i < aLis.length; i++) {
                var _sub = aLis[i].getAttribute('data-subject');
                var _grade = aLis[i].getAttribute('data-grade');
                var _updown = aLis[i].getAttribute('data-up-down');
                var _X = (((_tempArr[0] == 'all') || (_tempArr[0] == _sub))) && (((_tempArr[1] == 'all') || (_tempArr[1] == _grade))) && (((_tempArr[2] == 'all') || (_tempArr[2] == _updown)));
                if (_X) {
                    console.log(_sub,_grade,_updown)
                    aLis[i].style.display = 'block';
                } else {
                    aLis[i].style.display = 'none';
                }
            };
            aBookDetail[0].style.display = 'block';
        }
    }
})();
