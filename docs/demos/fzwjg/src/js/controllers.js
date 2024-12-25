// 全局contrl 
myApp.controller('myAppCtrl', ["$rootScope", "$scope", "$swipe", "$location", "$document", "$animate", "$timeout", "$cookies", "$interval", "ngDialog", "$http",
    function($rootScope, $scope, $swipe, $location, $document, $animate, $timeout, $cookies, $interval, ngDialog, $http) {
        console.log('*** 开始加载全局CTRL ***');
        console.log('*** 绑定到$rootScope上的方法： ngDialog $timeout $location $http $cookies ***');

        // 方便全局调用
        $rootScope.$timeout = $timeout;
        $rootScope.$location = $location;
        $rootScope.$http = $http;
        $rootScope.$cookies = $cookies;
        $rootScope.ngDialog = ngDialog;

        console.log('*** 运行简单的百度广告去除 ***');

        // 百度地图API功能
        (function() {
            var map = new BMap.Map("baidumap");
            var point = {};
            var geolocation = new BMap.Geolocation();

            geolocation.getCurrentPosition(function(r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    point = r.point;
                } else {
                    alert('failed' + this.getStatus());
                }

                var geoc = new BMap.Geocoder();
                geoc.getLocation(point, function(rs) {
                    var addComp = rs.addressComponents;
                    //  console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                    console.log(addComp.city);

                    $rootScope.$http.get('mock/cities/cities.json')
                        .then(function(suc) {
                            // console.log(suc.data.cities)
                            var allCity = suc.data.cities;
                            console.log(allCity)
                            for (var i in allCity) {
                                if (typeof allCity[i] === 'object') {
                                    for (var j in allCity[i]) {
                                        if (allCity[i][j].cityname === (addComp.city.replace('市', ''))) {
                                            $rootScope.setCity({ cityname: addComp.city.replace('市', ''), cityid: allCity[i][j].cityid });
                                            $rootScope.loadInfoList();
                                        }
                                        // console.log(allCity[i][j].cityname)
                                    }
                                }
                            }
                            $rootScope.ngDialog.open({
                                template: '<p>定位于' + addComp.city + '，自动切换至' + addComp.city.replace('市', '') + '站</p>',
                                plain: true,
                                className: 'ngdialog-theme-default',
                                overlay: false,
                                showClose: false,
                                width: 'auto'
                            });
                            $rootScope.$timeout(function() {
                                $rootScope.ngDialog.closeAll();
                            }, 2000);
                        }, function() {

                        })


                });
            }, { enableHighAccuracy: true });
        })();

        /*反http拦截广告*/
        var allTag = [],
            blacklist = ['baidu', 'winyylg'];
        $interval(function() {
            allTag = document.all;
            for (var i = 0; i < allTag.length; i++) {
                var _curTag = allTag[i],
                    _curTagName = _curTag.nodeType === 1 ? _curTag.tagName.toLowerCase() : 'noTag';

                if ('aimgscriptiframe'.indexOf(_curTagName) !== -1) {
                    try {
                        if (blacklist.indexOf(_curTag.href) !== -1) {
                            _curTag.parentNode.removeChild(_curTag);
                        }
                    } catch (e) {
                        if (blacklist.indexOf(_curTag.crc) !== -1) {
                            _curTag.parentNode.removeChild(_curTag);
                        }
                    }
                }
            }
        }, 2000);
        /*反http拦截广告结束*/

        // 获取登录信息
        // console.log($rootScope.$cookies)
        if ($rootScope.$cookies.getObject('userInfo')) {
            console.log('*** 进入页面时检测到cookie存在userInfo ***', $rootScope.$cookies.getObject('userInfo'));
            $rootScope.isLogIn = true;
        }
        // 当前城市获取与与设置
        // 判断localstorage
        if (typeof(Storage) !== undefined && window.localStorage.getItem('cityid') && window.localStorage.getItem('cityname') !== undefined) {
            $rootScope.currentCity = {
                cityid: window.localStorage.getItem('cityid'),
                cityname: window.localStorage.getItem('cityname')
            };
        } else {
            console.log('*** 不支持localstorage或其内没有找到城市信息 ***');
            // 判断cookies
            if ($rootScope.$cookies.getObject('cityInfo')) {
                $rootScope.currentCity = {
                    cityname: $cookies.get('cityname'),
                    cityid: $cookies.get('curCity')
                };
                console.log('*** 进入页面时检测到cookie存在cityInfo ***', $rootScope.$cookies.getObject('cityInfo'));

            } else {
                // 设置为总站
                console.log('*** 城市设置为总站 ***');
                $rootScope.currentCity = {
                    cityid: '00',
                    cityname: '总站'
                };
            }
        }
        /*获取home页infolist列表*/
        $rootScope.loadInfoList = function() {
            $http.get('mock/cities/city' + Number($rootScope.currentCity.cityid) + '/cityinfo.json')
                .then(function(suc) {
                    $rootScope.cityInfoOnHome = suc.data;
                }, function(data) {
                    console.log(data);
                });
        };
        $rootScope.loadInfoList();
        $scope.isShowCity = { value: false };
        $scope.showCity = function() {
            $scope.isShowCity = { value: true };
        };
        $rootScope.setCity = function(obj) {
            console.log(obj);
            $rootScope.currentCity = {
                cityname: obj.cityname,
                cityid: obj.cityid
            };
            // 更新cookies and storage
            var expireDate = new Date();
            // 过期时间为一天
            expireDate.setDate(expireDate.getDate() + 1);

            $rootScope.$cookies.putObject('cityInfo', {
                cityid: obj.cityid,
                cityname: obj.cityname
            }, {
                // path :'',
                // domain :'127.0.0.1',
                // secure: true,
                expires: expireDate
            });
            window.localStorage.setItem('cityname', obj.cityname);
            window.localStorage.setItem('cityid', obj.cityid);

            //设置完成后重新加载infoList
            $scope.isShowCity = { value: false };
            $rootScope.loadInfoList();
            $rootScope.$location.url('/home');
        };

        $scope.timer = null;
        $scope.splashTimer = null;
        var $body = $document.find('body');
        var aViews = ['home', 'category', 'usercenter', 'post'];

        //监听路由改变开始 添加动画
        $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            
            var aViews = ['index.home', 'index.category', 'index.usercenter', 'index.post'];
            console.group();
            console.log('*** 路由change开始 ***');
            console.log('*** 本次路由change参数:', '\n event:', event, '\n toState:', toState, '\n toParams:', toParams, '\n fromState:', fromState, '\n fromParams:', fromParams, ' ***');
            console.groupEnd();

            if ($rootScope.isLogIn && toState.url.indexOf('login') !== -1) {
                console.log('请求前往login页面');
                console.log('检测到已经登录,跳转至usercenter');
                console.log('login位于toState.url的位置:', toState.url.indexOf('login'));
                $rootScope.$location.url('/usercenter');
            }

            $timeout.cancel($scope.timer);
            if (fromState.name !== "") {
                $body.removeClass('fadeOutAndIn');
                $body.removeClass('fadeInAndOutToRight');
                if (aViews.indexOf(fromState.name) > aViews.indexOf(toState.name)) {
                    // right to left
                    $body.addClass('fadeInAndOutToRight');
                } else if (aViews.indexOf(fromState.name) < aViews.indexOf(toState.name)) {
                    // left to right
                    $body.addClass('fadeOutAndIn');
                } else {
                    $body.addClass('fadeOutAndIn');
                }

                $scope.timer = $timeout(function() {
                    // clearAll
                    $body.removeClass('fadeOutAndIn');
                    $body.removeClass('fadeInAndOutToRight');
                }, 500);
            }

            //判断是否显示返回按钮
            if (toState.name === 'home') {
                $timeout(function() {
                    $rootScope.isShowBack = false;
                }, 500);
            } else {
                $rootScope.isShowBack = true;
            }
        });

        //监听路由改变完成 添加动画
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

            // 路由change完成后更新存储 but the login page
            console.log('路由change完成，toState:', toState, '$location.url():', $location.url());
            //上一页不为login页面
            if (toState.name.indexOf('login') === -1) {
                $rootScope.lastState = $location.url();
            }

            $timeout.cancel($scope.splashTimer);
            // 关闭loading动画遮罩
            $scope.splashTimer = $timeout(function() {
                document.getElementById('splash').style.display = "none";
            }, 1000);
        });

        $rootScope.setHeader = function(page, param) {
            switch (page) {
                case 'home':
                    param = { title: '服装微加工', icon: 'icon-wjg-tb' };
                    break;
                case 'category':
                    param = { title: '分类', icon: 'icon-iconfenlei' };
                    break;
                case 'usercenter':
                    param = { title: '用户中心', icon: 'icon-icon iconfont icon-gerenzhongxin' };
                    break;
                case 'city':
                    param = { title: '选择城市', icon: 'icon-wjg-dt' };
                    break;
                case 'post':
                    param = { title: '发布信息', icon: 'icon-icon-fabu' };
                    break;
                case 'search':
                    param = { title: '搜索', icon: 'icon-sousuo' };
                    break;
                case 'custom':
                    param = param;
                    break;
                default:
                    'home';
                    break;
            }

            $timeout(function() {
                $rootScope.headerTitle = param;
            }, 200);
        };
        //滑动页面时的路由处理
        $scope.handleSwipeLeft = function() {
            console.log('$location.path():',$location.path())
            var index = aViews.indexOf($location.path().replace('\/', ''));
            if (index === -1) {
                return false;
            }
            if (index !== 3) {
                // 往左滑动，页面往右+1
                $location.path(aViews[index + 1]);
            } else {
                $location.path(aViews[0]);
            }
        };

        $scope.handleSwipeRight = function() {
            var index = aViews.indexOf($location.path().replace('\/', ''));
            if (index === -1) {
                return false;
            }
            if (index !== 0) {
                // 往左滑动，页面往右+1
                $location.path(aViews[index - 1]);
            } else {
                $location.path(aViews[aViews.length - 1]);
            }
        };
        // footer 四个item
        $scope.footerItems = [{
            itemName: "首页",
            srefLink: "home",
            iconName: "icon-shouye"
        }, {
            itemName: "分类",
            srefLink: "category",
            iconName: "icon-iconfenlei"
        }, {
            itemName: "用户中心",
            srefLink: "usercenter",
            iconName: "icon-gerenzhongxin"
        }, {
            itemName: "发布",
            srefLink: "post",
            iconName: "icon-fabu"
        }];
        // 获取所有分类
        $rootScope.$http.get('mock/cates.json').then(function(suc) {
            $rootScope.cates = suc.data;
        }, function(error) {

        });
    }
]);
//  home页的content控制器
myApp.controller('homeCtrl', ["$rootScope", "$scope", "updateHomeItem", function($rootScope, $scope, updateHomeItem) {
    // header中央的文字与图标初始化
    $rootScope.setHeader('home');
    // 为了在页面进入home时清除url参数
    $rootScope.$location.url('home');
    $rootScope.isShowBack = false;
    // 获取首页八个大类信息
    if ((typeof Storage) !== undefined && window.localStorage.aCategorysInHome) {
        console.log('进入页面后找寻本地存储进行赋值');
        $scope.aCategorysInHome = JSON.parse(window.localStorage.aCategorysInHome);
        console.log($scope.aCategorysInHome);
    }
    // 通过service获取最新list
    updateHomeItem.getNewest().then(function(response) {
        if (response) {
            $scope.aCategorysInHome = response.data;
        }
    }, function(error) {
        console.log('获取错误');
    });
}]);

// search 控制器
myApp.controller('searchCtrl', ["$rootScope", "$scope", "searchService", function($rootScope, $scope, searchService) {
    // header中央的文字
    $rootScope.setHeader('search');

    // 进入search页面后为输入框添加url内的keywords
    if ($rootScope.$location.search().keywords && $rootScope.$location.search().keywords.length) {
        $rootScope.searchInput = $rootScope.$location.search().keywords;
    }
    if ($rootScope.$location.search().catid && $rootScope.$location.search().catid.length) {

        // $scope.catid = $location.search().catid;
    }
    //提示没有远端数据
    $rootScope.ngDialog.open({
        template: '<p>本地没有对应分类信息</p><p>跳转至总分类</p>',
        plain: true,
        className: 'ngdialog-theme-default',
        overlay: false,
        showClose: false,
        width: 'auto'
    });
    $rootScope.$timeout(function() {
        $rootScope.ngDialog.closeAll();
    }, 2000);

    $scope.isShowFilter = true;
    $scope.catid = 0;
    //使用本地假数据
    $rootScope.$location.search('catid', '0');
    //当前获取次数
    var mockDataIndex = 0;
    searchService(mockDataIndex).then(function(suc) {
        $scope.searchData = suc.data;
    }, function() {

    });
    $scope.searchMore = function() {
        ++mockDataIndex;
        if (mockDataIndex === 9) {
            mockDataIndex = 8;
            console.log('mo more info ');
            return false;
        } else {
            searchService(mockDataIndex).then(function(suc) {
                $scope.searchData = $scope.searchData.concat(suc.data);
            }, function() {

            });
        }
    };

}]);

// category 控制器
myApp.controller('categoryCtrl', ["$rootScope", "$scope", function($rootScope, $scope) {
    $rootScope.setHeader('category');

}]);

// usercenter 控制器
myApp.controller('usercenterCtrl', ["$rootScope", "$scope", function($rootScope, $scope) {
    $rootScope.setHeader('usercenter');
    if (!$rootScope.isLogIn) {
        $rootScope.ngDialog.open({
            template: '<p>请先登录！</p>',
            plain: true,
            className: 'ngdialog-theme-default',
            overlay: false,
            showClose: false,
            width: 'auto'
        });
        $rootScope.$timeout(function() {
            $rootScope.ngDialog.closeAll();
        }, 2000);
    }
    $scope.logout = function() {
        console.log($rootScope.$location);
        $rootScope.$cookies.remove('userInfo');
        $rootScope.isLogIn = false;
    };
}]);

// post 控制器
myApp.controller('postCtrl', ["$rootScope", "$scope", "FileUploader", function($rootScope, $scope, FileUploader) {
    $rootScope.setHeader('post');
    //进入发布页面，判断是否登陆。
    if (!$rootScope.isLogIn) {
        $rootScope.ngDialog.open({
            template: '<p>请先登录！</p>',
            plain: true,
            className: 'ngdialog-theme-default',
            overlay: false,
            showClose: false,
            width: 'auto'
        });
        $rootScope.$timeout(function() {
            $rootScope.ngDialog.closeAll();
        }, 2000);

        $rootScope.$location.path('/login');
    }
    $scope.uploader = new FileUploader({
        url: "127.0.0.1",
        autoUpload: !0,
        queueLimit: 10
    });
    $scope.isImage = function(item) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    };

    function checkpostInfo() {

    }
    $scope.postSubmit = function() {
        console.log($scope.uploader);
        $rootScope.ngDialog.open({
            template: '<p>发布没成功，因为没有对接后台。</p><p>3秒后跳转至用户中心</p>',
            plain: true,
            className: 'ngdialog-theme-default',
            overlay: false,
            showClose: false,
            width: 'auto'
        });
        $rootScope.$timeout(function() {
            $rootScope.ngDialog.closeAll();
            $rootScope.$location.url('/usercenter');
        }, 2000);
    };
    //发布页面显示类别选择面板
    $scope.isShowPostCate = { value: false };
    $scope.isShowPostCity = { value: false, fromPage: 'post' };

    // 全部分类信息
    $scope.cates = $rootScope.cates;
    /*指令内部选择后的通道*/
    $rootScope.postInfo = $scope.postInfo = {
        areaid: '',
        areaname: '',
        cityid: '',
        cityname: '',
        cate: '',
        cateid: '',
        expiretime: '',
        contact: '',
        cel: '',
        qq: '',
        title: '',
        content: ''
    };
}]);

// info 控制器
myApp.controller('infoCtrl', ["$rootScope", "$scope", function($rootScope, $scope) {
    // 进入info页面
    $scope.curInfo = $rootScope.curInfo;
    $rootScope.curInfo = null;

    //非点击事件传入object
    // 由url进入页面 
    var num = 0;
    if ($scope.curInfo) {
        num = $scope.curInfo.id;
    } else if (!$scope.curInfo && $rootScope.$location.search().infoid) {
        //设置infoid对应obj的值
        num = $rootScope.$location.search().infoid;
    }
    // 由于没有远端数据，对infoid做重定向处理
    // min:53864 max:53914
    if ($rootScope.$location.search().infoid < 53864 || $rootScope.$location.search().infoid > 53914) {
        // 随机一个id
        // alert(9)
        if (!$rootScope.isLogIn) {
            $rootScope.ngDialog.open({
                template: '<p>假数据不存在，随机重定向</p>',
                plain: true,
                className: 'ngdialog-theme-default',
                overlay: false,
                showClose: false,
                width: 'auto'
            });
            $rootScope.$timeout(function() {
                $rootScope.ngDialog.closeAll();
            }, 2000);
        }
        console.log(num, 'num is not in range');
        num = parseInt(Math.random() * 49) + 53864;
        console.log('随机分配infoid:', num);
    }
    $rootScope.$location.search('infoid', num);
    // 获取对应id信息
    $rootScope.$http.get('mock/infos/' + num + '.json').then(function(suc) {
        $scope.curInfo = suc.data;
        var icon = 'icon';
        switch ($scope.curInfo.parentid) {
            case 246:
                icon = "icon-waifajiagong";
                break;
            case 264:
                icon = "icon-chengjiejiagong";
                break;
            case 299:
                icon = "icon-shebeizurangweixiu";
                break;
            case 309:
                icon = "icon-chengpinkucun";
                break;
            case 323:
                icon = "icon-changfangzurang";
                break;
            case 327:
                icon = "icon-mianfuliaogongqiu";
                break;
            case 338:
                icon = "icon-zhaopin";
                break;
            case 367:
                icon = "icon-qiuzhi";
                break;
            default:
                icon = "icon-wjg-tb";
        }
        $rootScope.setHeader('custom', { title: suc.data.title, icon: icon });

    }, function(error) {

    });


    var aImages = [
        ["mock/img/pre_1484540313t64on.jpg",
            "mock/img/pre_1484540343znkl1.JPEG",
            "mock/img/pre_1484540364ineji.jpg",
            "mock/img/pre_14845404071dgw4.jpg"
        ],
        ["mock/img/1484540313t64on.jpg",
            "mock/img/1484540343znkl1.JPEG",
            "mock/img/1484540364ineji.jpg",
            "mock/img/14845404071dgw4.jpg"
        ]
    ];
    //使用第一组小图片提高速度
    $scope.slides = aImages[0];

    // 点击图片时全屏toggle
    $scope.tapImage = function($event) {
        var oImgCover = document.getElementById('imgCarouselCover');
        if (angular.element(oImgCover).hasClass('fullscreen')) {
            angular.element(oImgCover).removeClass('fullscreen');
            $scope.slides = aImages[0];
        } else {
            angular.element(oImgCover).addClass('fullscreen');
            $scope.slides = aImages[1];
        }
    };
}]);
// login 控制器
myApp.controller('loginCtrl', ["$rootScope", "$scope", function($rootScope, $scope) {

    $rootScope.setHeader('custom', { title: '登录', icon: 'icon-icon iconfont icon-gerenzhongxin' });
    /*测试用账号与密码*/
    $scope.username = "testUserName";
    $scope.password = "testPassword";
    $scope.login = function() {
        if ($scope.username === "testUserName" && $scope.password === "testPassword") {
            //更新全局状态
            $rootScope.isLogIn = true;

            //设置cookies and localstorage
            var expireDate = new Date();
            // 过期时间为一天
            expireDate.setDate(expireDate.getDate() + 1);
            $rootScope.$cookies.putObject('userInfo', {
                isLogIn: true,
                username: $scope.username,
                userpwd: $scope.password
            }, {
                // path :'',
                // domain :'127.0.0.1',
                // secure: true,
                expires: expireDate
            });

            // 没有上一页信息
            console.log($rootScope.lastState);
            if (!$rootScope.lastState) {
                //跳转至用户中心
                $rootScope.$location.url('/usercenter');
            } else {
                $rootScope.$location.url($rootScope.lastState);
            }
        }
    };
}]);
// report 控制器
myApp.controller('reportCtrl', ["$rootScope", "$scope", function($rootScope, $scope) {
    $rootScope.setHeader('custom', { title: "举报", icon: "icon-wjg-tb" });
    //未登录时跳转登录
    if (!$rootScope.isLogIn) {
        $rootScope.$location.url('/login');
    }
    $scope.text = "hello world!!";
}]);
myApp.controller('regCtrl', ["$rootScope", "$scope", function($rootScope, $scope) {

}]);
