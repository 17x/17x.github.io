/*searchBar*/
myApp.directive('city', ['$rootScope', "$anchorScroll", function($rootScope, $anchorScroll) {
    return {
        restrict: 'AE',
        // replace: true,
        scope: {
            isshowcity: '=',
            postinfo: '=',
            setcity: '&'
        },
        templateUrl: 'tpls/city.html',
        controller: ['$scope', '$rootScope', function($scope, $rootScope) {
            this.isshowcity = $scope.isshowcity;
            this.city = $scope.city = $rootScope.currentCity;
            this.postinfo = $scope.postinfo;

            $scope.isshowarea = false;
            console.log('开启地区选择面板');

            //在post页面打开
            if ($scope.isshowcity.fromPage === 'post') {
                console.log('从post开启city指令');
                if ($rootScope.currentCity.cityid === '00') {
                    console.log('当前city为总站');

                    $rootScope.$http.get('mock/cities/cities.json')
                        .then(function(suc) {
                            $scope.cities = suc.data;
                        }, function(error) {});
                    var _this = this;
                    $scope.setcity = function(city) {
                        if (city.cityid === '00') {
                            return false;
                        }
                        console.log('选择了一个city：', city);
                        _this.city = $scope.city = city;
                        console.log('此时的city：', $scope.city);
                        $scope.isshowarea = true;
                    };
                } else {

                    // 已经选择了（非总站）城市
                    //隐藏省市区选择块，显示区选择块
                    $scope.isshowarea = true;
                }

            } else {
                // 获取城市列表
                $rootScope.$http.get('mock/cities/cities.json')
                    .then(function(suc) {
                        $scope.cities = suc.data;
                    }, function(error) {});
                // 当前为总站
                // 用户点击head内的city选择
                // 绑定全局城市设定函数
                $scope.setcity = $rootScope.setCity;

            }
            //选择省份跳至对应区域
            $scope.scrollTo = function(e) {
                $anchorScroll.yOffset = 44;
                $anchorScroll('province' + e);
            };
            /**/
        }]
    };
}]);
myApp.directive('postarea', ['$rootScope', function($rootScope) {
    return {
        restrict: 'AE',
        scope: {},
        require: '^city',
        template: '<div class="cities area">请选择<span ng-bind="city.cityname"></span>下的区：scope<ul><li ng-repeat="area in areas"><a ng-click=setArea(area)>{{area.areaname}}</a></li></ul></div>',
        link: function(scope, ele, attrs, upCtrl) {
            scope.city = upCtrl.city;
            console.log('加载了postarea');
            console.log('此时的post city', scope.city);
            console.log(upCtrl);

            //无区数据的城市 105 唐山 206 大连
            // 直接返回此城市名 关闭postcity
            if (scope.city.cityid === '105' || scope.city.cityid === '206') {
                alert('105 唐山 206 大连两个城市没有数据');
                upCtrl.postinfo.cityid = scope.city.cityid;
                upCtrl.postinfo.cityname = scope.city.cityname;
                upCtrl.postinfo.areaname = scope.city.cityname;
                upCtrl.isshowcity.value = false;
            }
            $rootScope.$http.get('mock/cities/city' + Number(scope.city.cityid) + '/allarea.json')
                .then(function(suc) {
                    scope.areas = suc.data.areas;
                    console.log(suc.data.areas);
                }, function(error) {});

            scope.setArea = function(area) {
                console.log(area);
                console.log(upCtrl.isshowcity);
                console.log('选择了一个area，关闭city选择面板');

                upCtrl.postinfo.cityid = scope.city.cityid;
                upCtrl.postinfo.cityname = scope.city.cityname;
                upCtrl.postinfo.areaid = area.areaid;
                upCtrl.postinfo.areaname = area.areaname;

                console.log(upCtrl.postinfo);
                upCtrl.isshowcity.value = false;
            };
        }
    };
}]);
/*searchBar*/
myApp.directive('searchBar', ['$rootScope', function($rootScope) {
    return {
        restrict: 'AE',
        require: '?search',
        replace: true,
        templateUrl: 'tpls/searchbar.html',
        link: function(scope, ele, attrs, upCtrl) {
            //serach input初始化
            $rootScope.searchInput = '';
        }
    };
}]);

//首页的热门信息与最新信息指令
myApp.directive('infolist', ['$http', '$q', '$rootScope', function($http, $q, $rootScope) {
    return {
        restrict: 'AE',
        replace: false,
        scope: {
            cityinfoonhome: '='
        },
        templateUrl: 'tpls/infolistonhome.html',
        link: function(scope) {
            console.log(scope.cityInfoOnHome);
        }
    };
}]);
/*上传图片缩略显示*/
myApp.directive('ngThumb', ['$window', function($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function(scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({ width: width, height: height });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
}]);

/*post页面的cate选择*/
myApp.directive('catechoose', function() {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            postinfo: '=',
            closehandle: '='
        },
        transclude: true,
        template: '<div ng-transclude></div>',
        controller: ["$scope", function($scope) {
            console.log('*** 打开post页面的分类选择面板指令', '*** ');
            console.log('*** 此时表单信息为', $scope.postinfo, '***');

            var panes = [];
            var doms = [];
            var nHeadHeight = 0 ;

            this.addPane = function(pane) {
                pane.isShowChildren = false;
                panes.push(pane);
            };
            this.addDom = function(dom) {
                doms.push(dom);
                nHeadHeight = doms[0][0].offsetHeight - 2;
            };


            this.switchPane = function(obj) {
                /*关闭所有面板*/
                var _index = panes.indexOf(obj);
                console.log('处理开始：下标为', _index, obj.isShowChildren);
                angular.forEach(panes, function(pane, index, a) {
                    /*如果遍历至非当前点击对象下标*/
                    /*或者当前点击对象为打开状态*/
                    /*重置其面板为关闭高度*/
                    if (index !== _index || obj.isShowChildren === true) {
                        pane.isShowChildren = false;
                        
                        doms[index][0].style.height = nHeadHeight +"px";
                    } else {
                        /*设为开启状态*/
                        obj.isShowChildren = true;
                        /*获取其子元素ul的高度并与head高度相加*/
                        doms[_index][0].style.height = doms[_index].find('ul')[0].offsetHeight + nHeadHeight + 'px';
                    }
                });
                // console.log('处理完毕：下标为', _index, obj.isShowChildren);
            };

            /*点击赋值关闭指令*/
            this.setCate = function(cate) {
                console.log("点击了一个分类", cate);
                /*赋值*/
                $scope.postinfo.cate = cate.catname;
                $scope.postinfo.catid = cate.catid;
                console.log('*** 此时表单信息为', $scope.postinfo, '***');
                /*关闭指令*/
                console.log('*** 关闭分类选择面板指令 ***');
                $scope.closehandle.value = false;
            };
        }]
    };
});

myApp.directive('catechoosepane', ['$rootScope', function($rootScope) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        require: '^catechoose',
        scope: {
            cate: '='
        },
        link: function(scope, ele, attr, upCtrl) {
            /*向上级指令传入scope与ele*/
            upCtrl.addPane(scope);
            upCtrl.addDom(ele);
            /*开启switch通道*/
            scope.switchPane = upCtrl.switchPane;

            scope.setCate = upCtrl.setCate;

        },
        template: '<div class="cates"><div class="catesHead" ng-click="switchPane(this)"><h1>{{cate.catname}}</h1><p>{{pane.isShowChildren}}</p></div><ul><li ng-repeat="a in cate.children"><a ng-click="setCate(a)">{{a.catname}}</a></li></ul></div>'
    };
}]);
/*post页面的cate选择 end*/
