/* name : zSelect */
/* date : 2017-01-05 */
/* author : Yahone */
/* version : 1.0.0 */
;(function(window, document) {
    // 定义对象
    function Select(ele, para) {
        // the element
        // 为后期获取属性开启通道
        this.ele = ele;
        // parameters
        // 每个实例的参数与属性
        this.para = para;
    }
    // init
    Select.prototype.init = function() {
        // 触发默认为click
        this.para.triggerOpt = this.para.triggerOpt ? this.para.triggerOpt : 'click';
        // 多选默认为关闭
        this.para.multiple = this.para.multiple === true ? this.para.multiple : false;
        // 过滤默认为关闭
        this.para.filter = this.para.filter === true ? this.para.filter : false;
        // 默认显示在maskWrap的下方
        this.para.boxShowPlace = this.para.boxShowPlace ? this.para.boxShowPlace : 'below';
        // set multiple attribute for native select 
        // 为select元素添加 multiple 特性
        this.ele.multiple = this.para.multiple;
        // default status of zselect-box
        this.isOpen = false;
        var curDomRect = {
                top: this.ele.offsetTop,
                left: this.ele.offsetLeft,
                width: this.ele.offsetWidth,
                height: this.ele.offsetHeight
            },
            _this = this,
            // a wrap of select
            // 未打开时 mask 的容器
            zselectMaskWrap = document.createElement('div'),
            // 已选项的容器,如果开启多选，此元素将被插入domTree
            zselectMaskMultipleSelectedWrap = document.createElement('div'),
            // a input
            // 一个 input 用来触发事件，接收用户输入(筛选),显示已选值
            zselectMaskInput = document.createElement('input'),
            // a icon of status
            // 一个状态图标，作为一个 switch 存在
            zselectMaskStatus = document.createElement('span');

        zselectMaskWrap.className = 'zselect-mask-wrap';

        // 点击maskWrap后触发内部input的focus
        zselectMaskWrap.addEventListener('click', function(e) {
            // 如果box已开启
            if (_this.isOpen) {
                return false;
            }
            // 避免在开启多选时点击 selecteditems 触发内部input的focus
            if (e.target === this) {
                this.getElementsByTagName('input')[0].focus();
                this.getElementsByTagName('input')[0].click();
            }
        }, false);

        zselectMaskInput.type = 'text';
        zselectMaskInput.className = 'zselect-mask-input';
        zselectMaskStatus.className = "zselect-mask-status";
        // 如果开启了多选，那么将处理之前已经创建了的div,并插入到domTree
        if (this.para.multiple) {
            zselectMaskMultipleSelectedWrap.className = 'zselect-mask-multiple-selected-wrap';
            zselectMaskWrap.appendChild(zselectMaskMultipleSelectedWrap);
        }
        zselectMaskWrap.appendChild(zselectMaskInput);
        zselectMaskWrap.appendChild(zselectMaskStatus);

        // 用户的select并不会被删除,而是被vivibility:hidden了
        // zselectMaskWrap basic style
        // 此处设置maskWrap的位置偏移，top与left值基于select元素的位置
        // 参数 this.para.top 与  this.para.left 定义偏移量
        zselectMaskWrap.style.top = curDomRect.top + this.para.top + 'px';
        zselectMaskWrap.style.left = curDomRect.left + this.para.left + 'px';
        // insertBefore to curDom
        // 插入到select之前
        this.ele.parentNode.insertBefore(zselectMaskWrap, this.ele);

        // Invisible this select dom
        // 开放的配置项，用来显示select元素
        this.ele.style.visibility = this.para.visibility ? this.para.visibility : 'hidden';

        // behavior and binding event
        // 点击mask 内的 switch 进行box的开与关
        zselectMaskStatus.addEventListener('click', switchStatus, false);

        // enter page update the mask view
        // 在进入页面后设置mask内的信息显示，如默认选择等
        updataViewInMask();

        // switchStatus
        function switchStatus(e) {
            // 当你点击状态箭头的时候
            // 如果是未打开状态
            if (!_this.isOpen) {
                // clear other box
                //未打开时先清除所有box，不管存不存在
                resetAllbox();
                // 打开一个box
                open();
            }
            // 如果是打开的
            else {
                // 移除box
                resetAllbox();
                // return false;
            }
        }

        // remove all ZselectBox
        // 移除所有打开的box
        function resetAllbox() {
            // 获取所有打开了的box
            // 获取所有 mask内的switch图标
            var getOpenedZselectBox = document.getElementsByClassName('zselect-box-wrap');
            var getAllMaskStatus = document.getElementsByClassName('zselect-mask-status');

            // 存在就删除
            if (getOpenedZselectBox.length > 0) {
                for (var i = 0; i < getOpenedZselectBox.length; i++) {
                    document.getElementsByTagName('body')[0].removeChild(getOpenedZselectBox[i]);
                }
            }
            // 改变状态 
            // 改变图标样式
            for (var i = 0; i < getAllMaskStatus.length; i++) {
                _allZselect[i].isOpen = false;
                getAllMaskStatus[i].className = 'zselect-mask-status';
            }
        }

        // open a box
        // 打开一个box
        function open() {
            // 打开前清除所有box
            resetAllbox();
            // 控制此属性设置的顺序
            // 在resetAllbox内部会设置所有isOpen为false
            _this.isOpen = true;
            // 打开待选列表后
            var zselectBoxWrap = document.createElement('div'),
                zselectBox = document.createElement('div');

            // 为box的容器添加事件
            zselectBoxWrap.addEventListener('click', function(e) {
                // 触发事件源为其自身
                // 若为其后代元素则无效
                if (e.target === zselectBoxWrap) {
                    resetAllbox();
                }
            }, false);

            zselectBoxWrap.className = "zselect-box-wrap";
            // 此容器的作用：当用户点击任意空白处则关闭box
            // 所有要覆盖于整个页面
            zselectBoxWrap.style.width = document.documentElement.clientWidth + "px";
            zselectBoxWrap.style.height = document.getElementsByTagName('body')[0].offsetHeight + "px";

            //同时要改变Switch图标的显示状态
            zselectMaskStatus.className += " zselect-mask-status-open";

            zselectBox.className = 'zselect-box';
            // 为box定位left
            zselectBox.style.left = zselectMaskWrap.offsetLeft + "px";

            // box内将要显示的所有待选项目
            (function() {
                for (var i = 0; i < _this.ele.options.length; i++) {
                    var zselectBoxItems = document.createElement('div');
                    zselectBoxItems.className = 'zselect-box-items';
                    zselectBoxItems.innerHTML = _this.ele.options[i].value;
                    zselectBoxItems.index = i;
                    // 检查所有option 
                    // 如果此索引对应 option 已经被选择
                    if (_this.ele.options[i].selected) {
                        //添加一个class 来 highlight 它
                        zselectBoxItems.className += ' zselect-box-items-active';
                    }
                    // when click any items
                    // 为列表中每个项目绑定点击事件
                    // 点击后更新视图，并关闭所有box
                    zselectBoxItems.addEventListener('click', function() {
                        // 点击后改变数据，
                        // 改变对应 option 的属性
                        // your clicked element correspoding option set as selected
                        _this.ele.options[this.index].selected = true;
                        // 更新视图
                        updataViewInMask();
                        resetAllbox();
                    }, false);
                    //放进box内
                    zselectBox.appendChild(zselectBoxItems);
                }
            })();

            // 子元素放入包裹
            zselectBoxWrap.appendChild(zselectBox);

            //一次性append到body
            document.getElementsByTagName('body')[0].appendChild(zselectBoxWrap);

            // 创建元素时无法获取高度
            // 所以在插入domTree后计算box的高度
            // 根据参数，设定box相对于maskWrap出现的位置
            zselectBox.style.top = _this.para.boxShowPlace === 'below' ? zselectMaskWrap.offsetTop + zselectMaskWrap.offsetHeight + "px" : zselectMaskWrap.offsetTop - zselectBox.offsetHeight + 'px';

            //打开box后更新mask视图
            updataViewInMask();
            // filterBoxList(zselectMaskInput.value);
        }

        // 负责处理 mask view ， 根据每个_this的数据进行视图更新
        function updataViewInMask() {
            //  set default value
            // 不存在多选
            if (!_this.para.multiple) {
                _this.ele.selectedIndex = _this.ele.selectedIndex >= 0 ? _this.ele.selectedIndex : 0;
                _this.ele.options[_this.ele.selectedIndex].selected = true;
            }
            // 为multiple框填入已选项
            if (_this.para.multiple === true) {
                //先清空容器
                zselectMaskMultipleSelectedWrap.innerHTML = '';
                // enumerate all options
                // 遍历获取所有option中selected为true的index，然后输出dom
                for (var i = 0; i < _this.ele.options.length; i++) {
                    if (_this.ele.options[i].selected) {
                        var zselectMaskMultipleSelected = document.createElement('div'),
                            zselectMaskMultipleSelectedText = document.createElement('span'),
                            zselectMaskMultipleSelectedIcon = document.createElement('b');

                        zselectMaskMultipleSelected.className = 'zselect-mask-multiple-selected';
                        zselectMaskMultipleSelectedText.className = 'zselect-mask-multiple-selected-text';
                        zselectMaskMultipleSelectedText.innerHTML = _this.ele.options[i].value;
                        zselectMaskMultipleSelectedIcon.className = 'zselect-mask-multiple-selected-icon';
                        zselectMaskMultipleSelectedIcon.innerHTML = '&times;';
                        zselectMaskMultipleSelectedIcon.index = i;
                        zselectMaskMultipleSelected.appendChild(zselectMaskMultipleSelectedText);
                        zselectMaskMultipleSelected.appendChild(zselectMaskMultipleSelectedIcon);

                        // 绑定删除此item事件
                        zselectMaskMultipleSelectedIcon.addEventListener('click', function(e) {
                            // 更新数据
                            _this.ele.options[this.index].selected = false;

                            // 移除自身
                            this.parentNode.parentNode.removeChild(this.parentNode);
                            return false;
                        }, true);

                        zselectMaskMultipleSelectedWrap.appendChild(zselectMaskMultipleSelected);
                    }
                }
            }
            // 为single框填入值
            else {
                zselectMaskInput.value = _this.ele.options[_this.ele.selectedIndex].value;
            }

        }

        // 过滤功能
        function filterBoxList(filterStr) {
            // 获取当前开启的box内的所有待选项
            var aAllItemsInBox = document.getElementsByClassName('zselect-box-items');
            if (!(aAllItemsInBox.length > 0)) {
                return false;
            }
            for (var i = 0; i < _this.ele.options.length; i++) {
                // 先显示
                aAllItemsInBox[i].style.display = 'block';
                /// 再判断是否匹配过滤
                if (filterStr.replace(/\s+/g, '') === '') {
                    aAllItemsInBox[i].style.display = 'block';
                }
                /// 不匹配的隐藏
                if (_this.ele.options[i].value.indexOf(filterStr) === -1) {
                    aAllItemsInBox[i].style.display = 'none';
                }
            }
        }
        // when trigger the input click/focus event
        zselectMaskInput.addEventListener(this.para.triggerOpt, function(e) {
            if (_this.isOpen === true) {
                return false;
            }
            // clean all box
            resetAllbox();
            // open thisBox
            setTimeout(function() {
                open();
            }, 100);
            // its opening now
            _this.isOpen = true;
        }, false);

        // 失去焦点后触发
        zselectMaskInput.addEventListener('blur', function(e) {
            updataViewInMask();

            // delay (bigger than 70) the function execute to avoid a bug 
            // that when click statusIcon will repeat run the openbox()
            setTimeout(function() {
                resetAllbox();
            }, 100);
        }, false);

        // backspace to delete last selected item
        // 通过 backspace 删除已选项功能
        zselectMaskInput.addEventListener('keydown', function(e) {
            // 检测 按下按键的一瞬间(未形成操作或输入字符)
            if (this.value === '' && e.code.toLowerCase() === 'backspace' && _this.para.multiple) {
                // 获取最后一个已选item的index
                var lastSlectedItemIndex = false;
                for (var i = 0; i < _this.ele.options.length; i++) {
                    if (_this.ele.options[i].selected) {
                        lastSlectedItemIndex = i;
                    }
                }
                if (lastSlectedItemIndex !== false && lastSlectedItemIndex >= 0) {
                    _this.ele.options[lastSlectedItemIndex].selected = false;
                    updataViewInMask();
                    resetAllbox();
                    open();
                }
            }

        }, false);

        // add event for filter and multiple's delete func
        zselectMaskInput.addEventListener('keyup', function(e) {
            // 如果已打开box 或者
            // 通过tab触发此事件
            // 避免在进入页面时使用tab触发一个input后，再次触发keyup
            // 导致对box内的item进行筛选
            if (!_this.isOpen || e.code.toLowerCase() === 'tab') {
                return false;
            }
            if (_this.para.filter) {
                // 传入input的值进行筛选
                filterBoxList(zselectMaskInput.value);
            }
        }, false);
    };
    // 访问全部select对象的接口
    var _allZselect = [];
    // here will be return a empty array if all select tag haven't zSelect attribute
    _allZselect = document.querySelectorAll('select').length > 0 ? (function() {
        var tempArr = document.querySelectorAll('select');
        for (var i = 0; i < tempArr.length; i++) {
            var zSelect;
            if (tempArr[i].getAttribute('zSelect')) {
                try {
                    zSelect = JSON.parse(tempArr[i].getAttribute('zSelect'));
                } catch (e) {
                    // console.warn("parameter can\'t be parse using JSON.parse , on attribute zSelect of:", tempArr[i]);
                    try {
                        zSelect = eval('(' + tempArr[i].getAttribute('zSelect') + ')');
                    } catch (e) {
                        if (e) continue;
                    }
                }
                var newSelect = new Select(tempArr[i], zSelect);
                newSelect.init();
                _allZselect.push(newSelect);
            }
        }
        return _allZselect;
    })() : [];

})(window, document);
