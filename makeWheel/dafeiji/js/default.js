/*定义require js依赖，传入变量*/
define(['sizzle.min'], function($) {
    // var $ = Sizzle;
    ;
    (function() {
        var oBody = $('body')[0]; //body

        oBody.innerHTML += '<div id="infoPane"><div id="rolePane"><h1 id="exp"></h1></div></div><div id="readyGame"><button id="gameStart">开始游戏</button></div>'

        $('#gameStart')[0].onclick = function() {
            gameStart();
            oBody.style.cursor = 'none';
            $('#readyGame')[0].style.display = 'none';
        }

        function gameStart() {
            // 播放BGM音乐
            setTimeout(function() {
                playAudio({ BGM: true })
            }, 2000);

            //角色初始化
            var oRoleInit = ({
                    hp: 3, //角色生命
                    exp: 0, //角色经验
                    oBulletPower: 1 //角色子弹攻击力
                }),
                oBullet, //角色子弹
                nRolesSp = 0, //角色能量点
                oEnemies, //敌机
                nEnemiesLv = 1, //敌机等级
                nBodyWidth = oBody.offsetWidth, //body宽度
                nBodyHeight = oBody.offsetHeight, //body高度
                nIsMobile = (/(nokia|iphone|android|ipad|motorola|^mot\-|softbank|foma|docomo|kddi|up\.browser|up\.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam\-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte\-|longcos|pantech|gionee|^sie\-|portalmmm|jig\s browser|hiptop|^ucweb|^benq|haier|^lct|opera\s*mobi|opera\*mini|320x320|240x320|176x220)/i).test(navigator.userAgent.toLowerCase());

            updateInfoPane('开始初始化角色...')

            oRole = function() {
                var tmpDiv = document.createElement('div');

                console.log('初始化角色样式...');

                tmpDiv.id = 'role';
                tmpDiv.style.width = '20%';
                tmpDiv.style.height = '13%';
                tmpDiv.style.background = 'url(./img/roleBg.png) no-repeat 100% 100% / 100% 100%';
                tmpDiv.style.position = 'absolute';
                tmpDiv.style.left = '40%';
                tmpDiv.style.bottom = '0px';

                oBody.appendChild(tmpDiv);

                console.log('为角色绑定跟随鼠标移动事件...')
                    /*判断移动端*/
                if (!nIsMobile) {
                    document.addEventListener('mousemove', function(e) {
                        // console.log(tmpDiv.offsetLeft)
                        /*延迟跟随移动*/
                        setTimeout(function() {
                            tmpDiv.style.left = (e.clientX - tmpDiv.offsetWidth / 2) + 'px'
                            tmpDiv.style.top = (e.clientY - tmpDiv.offsetHeight / 2) + 'px'
                        }, 20)
                    }, false)
                } else {
                    document.ontouchmove = function(e) {
                        var touch = event.targetTouches[0];
                        e.preventDefault();
                        tmpDiv.style.left = (touch.pageX - tmpDiv.offsetWidth / 2) + 'px';
                        tmpDiv.style.top = (touch.pageY - tmpDiv.offsetHeight / 1.5) + 'px';

                    }
                }
            };
            oRole();

            updateInfoPane('加载子弹...');

            oBullet = setInterval(function() {
                var role = $('#role')[0],
                    nRoleWidth = role.offsetWidth,
                    nRoleHeight = role.offsetHeight,
                    nRoleLeft = role.offsetLeft,
                    nRoleTop = role.offsetTop,
                    tmpDiv = document.createElement('div');
                playAudio({ bullet: true })

                tmpDiv.className = 'RolesBullet';
                tmpDiv.style.width = '0.6%';
                tmpDiv.style.height = '1.8%';
                tmpDiv.style.position = 'absolute';
                tmpDiv.style.zIndex = '10';
                tmpDiv.style.background = 'url(./img/bulletBg.png) no-repeat 100% 100% /100% 100%';
                tmpDiv.style.left = ((nRoleLeft) + nRoleWidth / 2 - 3) + 'px';
                tmpDiv.style.top = nRoleTop + 'px';

                oBody.appendChild(tmpDiv);
                var timer = setInterval(function() {
                    if ($('.enemies')[0]) {
                        for (var i = 0; i < $('.enemies').length; i++) {
                            var that = $('.enemies')[i],
                                thisEnemysBottomToBrowserTop = that.offsetTop + that.offsetHeight, //this Enemy bottom to browser top distance
                                thisEnemysL = that.offsetLeft, //this enemy left 
                                thisEnemysW = that.offsetWidth, //this enemy left 
                                BulletT = tmpDiv.offsetTop, //this Bullet top
                                BulletL = tmpDiv.offsetLeft; //this Bullet left
                            BulletW = tmpDiv.offsetWidth; //this Bullet left
                            if ((thisEnemysBottomToBrowserTop >= BulletT) && (BulletL + thisEnemysW - thisEnemysL) >= 0 && BulletL < (thisEnemysL + thisEnemysW)) {
                                clearInterval(timer);
                                // 输出信息
                                updateInfoPane('击中敌机，经验值增加500！');
                                //播放音效
                                playAudio({ explode: true })
                                    //增加经验
                                updateExpPane(100)
                                    // 移除此子弹
                                that.parentNode.removeChild(that);
                                // 移除此敌机
                                tmpDiv.parentNode.removeChild(tmpDiv);
                                // 输出爆炸效果图片
                                explode(thisEnemysL, thisEnemysW)
                                return false;
                            }
                        }
                    }
                    if (tmpDiv.offsetTop <= 0) {
                        oBody.removeChild(tmpDiv);
                        clearInterval(timer);
                    } else {
                        tmpDiv.style.top = tmpDiv.offsetTop - 10 + 'px';
                    }
                }, 30);

                // role.offsetLeft
            }, 500);

            updateInfoPane('加载敌机...');
            oEnemies = setInterval(function(nEnemiesLv) {
                var tmpDiv = document.createElement('div');
                tmpDiv.className = 'enemies';
                tmpDiv.style.width = '12%';
                tmpDiv.style.height = '15%';
                tmpDiv.style.background = 'url(./img/enemiesLv1.png) no-repeat 100% 100% / 100% 100%';
                tmpDiv.style.position = 'absolute';
                tmpDiv.style.zIndex = '20';
                tmpDiv.style.left = (parseInt(Math.random() * (nBodyWidth - 81))) + 'px';
                tmpDiv.style.top = '-100px';
                tmpDiv.style.position = 'absolute';
                oBody.appendChild(tmpDiv);

                var timer = setInterval(function() {
                    if ($('#role')[0]) {
                        var that = $('#role')[0],
                            ET = tmpDiv.offsetTop,
                            EB = tmpDiv.offsetTop + tmpDiv.offsetHeight,
                            EL = tmpDiv.offsetLeft,
                            ER = EL + tmpDiv.offsetWidth,
                            MT = that.offsetTop,
                            MB = MT + that.offsetHeight,
                            ML = that.offsetLeft,
                            MR = ML + that.offsetWidth,
                            MW = that.offsetWidth;
                        // console.log(Math.abs(EnemysL-thisBulletL))
                        if (((MB > ET && MB < EB) || (MB > EB && MB < ET)) &&
                            ((MR > EL && ML < ER) || (ML > EL && ML < ER))
                        ) {
                            updateInfoPane('你的战机坠毁了！！');
                            explode(ML, MT)
                                // 清除背景音效，播放坠毁音效
                            playAudio({ explode: true, BGM: false, bullet: false })
                                // alert('炸毁了,游戏结束');
                                // 移除本敌机
                            tmpDiv.parentNode.removeChild(tmpDiv);
                            that.parentNode.removeChild(that);
                            // 清除本机定时器
                            clearInterval(timer);
                            // 清除子弹定时器
                            clearInterval(oBullet);
                            // 清除加载敌机定时器
                            clearInterval(oEnemies);
                            // return false;
                        }
                    }
                    /*敌机超出底部移除dom*/
                    if (tmpDiv.offsetTop >= nBodyHeight) {
                        updateInfoPane('一架飞机逃脱了');
                        oBody.removeChild(tmpDiv);
                        clearInterval(timer);
                    } else {
                        tmpDiv.style.top = tmpDiv.offsetTop + 10 + 'px';
                    }
                }, 30);
            }, 1000);

            // 更新信息板
            function updateInfoPane(str) {
                var oInfoPane = $('#infoPane')[0];
                timer = null;
                timer = setTimeout(function() {
                    // console.log(aInfoPaneFirstP)
                    // if()
                    oInfoPane.removeChild(oInfoPane.getElementsByTagName('p')[0])
                    clearInterval(timer)
                }, 800)
                oInfoPane.innerHTML += '<p>' + str + '</p>'
            }

            function updateExpPane(num) {
                var oInfoPane = $('#exp')[0];
                oRoleInit.exp += 100;
                oInfoPane.innerHTML = '经验值：' + oRoleInit.exp;
            }

            // 击落或者炸毁
            function explode(x, y) {

                var oTmpImg = new Image(),
                    timer = null;

                oTmpImg.src = "img/bang.gif"
                oTmpImg.className = 'explodeEffectImg'
                oBody.appendChild(oTmpImg)

                oTmpImg.style.left = x + "px";
                oTmpImg.style.top = y + "px";

                timer = setTimeout(function() {
                    oBody.removeChild(oTmpImg)
                    clearTimeout(timer)
                }, 400)
            }

            //播放音效
            function playAudio(agrs) {
                // Check for audio element support.
                var oBGM = document.getElementById('bgAudio'),
                    oBulletAudio = document.getElementById('bulletAudio'),
                    oExplode = document.getElementById('explode');

                if (agrs['BGM'] === true) {
                    oBGM.play();
                    oBGM.volume = 0.2;
                }

                if (agrs['BGM'] === false) {
                    oBGM.pause();
                    oBGM.currentTime = 0;
                }

                if (agrs['bullet'] === true) {
                    oBulletAudio.currentTime = 0;
                    oBulletAudio.play();
                }
                if (agrs['bullet'] === false) {
                    oBulletAudio.pause();
                    oBulletAudio.currentTime = 0;
                }
                if (agrs['explode'] === true) {
                    oExplode.currentTime = 0;
                    oExplode.play();
                }
            }
        };
    })();
});
