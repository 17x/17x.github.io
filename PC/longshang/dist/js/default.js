var longshangApp = angular.module('longshangApp', ['ngSanitize', 'ui.router', 'ui.select'])

// 定义地图全局变量
var myMap = {},
    myOverlay = {},
    tempinfoStatistics = {};

myOverlay.initial = function(point, schoolFullName, num, overlayType) {
    function ComplexCustomOverlay() {
        this._point = point
        this._num = num
        this._schoolFullName = schoolFullName
    }

    ComplexCustomOverlay.prototype = new BMap.Overlay()

    ComplexCustomOverlay.prototype.draw = function() {
        var tmap = this._map
        var pixel = tmap.pointToOverlayPixel(this._point)

        this._div.style.left = pixel.x - 8 + "px"
        this._div.style.top = pixel.y - 29 + "px"
    }

    ComplexCustomOverlay.prototype.initialize = function(map) {
        this._map = map
        var div = this._div = document.createElement("div"),
            tempDiv = document.createElement('div'),
            tempSpan = document.createElement('span');

        if (overlayType !== 4) {
            tempSpan.innerHTML = this._num
        }

        tempSpan.className = 'lianhetiPoint'
        var that = this
        if (overlayType === 3) {
            div.className = 'overlayPoint'
            tempDiv.className = 'cityBriefOnMap schoolBriefOnMap'
            tempDiv.id = 'schoolBriefOnMap'
            tempDiv.style.display = 'none'
            div.onmouseover = function() {
                tempDiv.style.display = 'block'
                div.style.zIndex = 200;
                tempDiv.style.zIndex = -300;
            }
            div.onmouseout = function() {
                tempDiv.style.display = 'none'
                div.style.zIndex = -1;
                tempDiv.style.zIndex = -1;
            }

        } else {
            div.className = 'overlayPoint'
            tempDiv.id = tempDiv.className = 'cityBriefOnMap'
        }

        tempDiv.style.left = (this.offsetWidth - 193) + "px"
        tempDiv.style.bottom = this.offsetHeight + (this.offsetHeight / 2) + 4 + "px"
        tempDiv.style.zIndex = -300
        tempDiv.innerHTML = '<h1>' + that._schoolFullName + '</h1>'
        tempDiv.title = that._schoolFullName

        div.appendChild(tempSpan)
        div.appendChild(tempDiv)

        map.getPanes().labelPane.appendChild(div)

        return div
    }

    return ComplexCustomOverlay
}

longshangApp.controller('longshangAppCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
    $scope.citys = [{
        name: '全部',
        district: ['全部']
    }, {
        name: '咸宁市',
        district: ['全部', '咸安区']
    }]

    $scope.showMapLevel = 1
        // 初始化 '市' 的选择
    $scope.selectedA = { value: $scope.citys[0] }

    // 初始化 '区县' 的选择
    $scope.selectedB = { value: '全部' }

    // 显示统计信息区
    $scope.showStatistics = true

    $scope.currentDistrict = {}
    $scope.currentLianheti = {}
    $scope.currentJiaoxuedian = {}
        /*测试信息*/
    $scope.currentLianheti = oDistrictLevel[0].cityInfo[0].districtInfo[2]
        /**/
    $scope.currentPage = ''
    $scope.whichPage = {}
    $scope.highLight = function(index) {
        if (document.getElementsByClassName('lianhetiPoint')[index]) {
            document.getElementsByClassName('lianhetiPoint')[index].className += ' active'
        }
    }

    $scope.removeHighLight = function(index) {
        if (document.getElementsByClassName('lianhetiPoint')[index]) {
            document.getElementsByClassName('lianhetiPoint')[index].className = 'lianhetiPoint'

        }
    }

    $scope.setCurrentLianheti = function(sName) {
        for (var i = 0; i < $scope.currentDistrict.districtInfo.length; i++) {
            if ($scope.currentDistrict.districtInfo[i].schoolName === sName) {
                $scope.currentLianheti = $scope.currentDistrict.districtInfo[i]
            }
        }
    }

    $scope.setCurrentJiaoxuedian = function(index) {
        $scope.currentJiaoxuedian = $scope.currentLianheti.schoolInfo.jiaoxuedian[index]
    }

    function updateFilterValue(city, dAndc) {
        // 如果地图已经加载完毕，在再次写入覆盖层前清除之前的覆盖层。
        if (myMap.loaded) {
            myMap.clearOverlays()
        }
        console.log()
            // 清空数据
        tempinfoStatistics = $scope.infoStatistics
        var infoStatistics = $scope.infoStatistics = {
                fenxiao: 0,
                lianheti: 0,
                jiaoshi: 0,
                xuesheng: 0,
                xueke: [],
                zhiboke: 0
            },
            oFilterValue = $scope.oFilterValue = [],
            param = []
            // console.log(tempinfoStatistics)

        // 显示统计信息区
        $scope.showStatistics = true
            // 隐藏区县级的联合体列表
        $scope.showSchool = false

        // 如果选择了全部城市
        if (city === '全部') {
            statAndFilter(1)
        } else {
            // 如果选择了某一个市('全部'除外) 且选择了全部的区县
            if (dAndc === '全部') {
                $scope.showStatistics = true
                statAndFilter(2)
            } else {
                // 选择了某个市，并且区县非'全部'
                infoStatistics = {}
                $scope.showStatistics = false
                $scope.showSchool = true
                statAndFilter(3)
            }
        }

        function statAndFilter(level) {
            for (var x = 0; x < oDistrictLevel.length; x++) {
                // 添加所有市的地图覆盖层

                // 遍历市信息
                if (level === 1) {
                    if (myMap.loaded) {
                        var myCompOverlay = new(myOverlay.initial(new BMap.Point(oDistrictLevel[x].coordinate[0], oDistrictLevel[x].coordinate[1]), oDistrictLevel[x].cityName, x + 1))
                        myMap.addOverlay(myCompOverlay)
                    }
                    oFilterValue[x] = {
                        fenxiao: 0,
                        jiaoxuedian: 0,
                        jiaoshi: 0,
                        xuesheng: 0,
                        xueke: [],
                        zhiboke: 0,
                        sName: ''
                    }
                    oFilterValue[x].sName = oDistrictLevel[x].cityName
                    param = oDistrictLevel
                }
                if (level === 2 || level === 3) {
                    if (oDistrictLevel[x].cityName === city) {
                        param.push(oDistrictLevel[x])
                    }
                }
            }

            for (var i = 0; i < param.length; i++) {
                for (var j = 0; j < param[i].cityInfo.length; j++) {
                    infoStatistics.lianheti += param[i].cityInfo[j].districtInfo.length
                    if (level === 2) {
                        // 添加当前市所有区县的地图覆盖层
                        var myCompOverlay = new(myOverlay.initial(new BMap.Point(param[i].cityInfo[j].coordinate[0], param[i].cityInfo[j].coordinate[1]), param[i].cityInfo[j].districtName, i + 1))
                        myMap.addOverlay(myCompOverlay)

                        oFilterValue[j] = {
                            fenxiao: 0,
                            jiaoxuedian: 0,
                            jiaoshi: 0,
                            xuesheng: 0,
                            xueke: [],
                            zhiboke: 0,
                            sName: ''
                        }
                    }
                    if (param[i].cityInfo[j].districtName == dAndc) {
                        $scope.currentDistrict = param[i].cityInfo[j]
                    }
                    // 遍历市下辖所有区县
                    for (var k = 0; k < param[i].cityInfo[j].districtInfo.length; k++) {

                        var currentLianhetiInfo = param[i].cityInfo[j].districtInfo[k].schoolInfo

                        if (level === 1 || level === 2) {
                            infoStatistics.fenxiao += currentLianhetiInfo.fenxiao
                            infoStatistics.jiaoshi += currentLianhetiInfo.jiaoshi
                            infoStatistics.xuesheng += currentLianhetiInfo.xuesheng
                            infoStatistics.zhiboke += currentLianhetiInfo.zhiboke

                            for (var v = 0; v < currentLianhetiInfo.xueke.length; v++) {
                                infoStatistics.xueke.push(currentLianhetiInfo.xueke[v])
                            }
                            infoStatistics.xueke = array_unique_o(infoStatistics.xueke)
                        }

                        if (level === 1) {
                            oFilterValue[i].fenxiao += currentLianhetiInfo.fenxiao
                            oFilterValue[i].jiaoxuedian += currentLianhetiInfo.jiaoxuedian.length
                            oFilterValue[i].jiaoshi += currentLianhetiInfo.jiaoshi
                            oFilterValue[i].xuesheng += currentLianhetiInfo.xuesheng
                            oFilterValue[i].zhiboke += currentLianhetiInfo.zhiboke

                            for (var v = 0; v < currentLianhetiInfo.xueke.length; v++) {
                                oFilterValue[i].xueke.push(currentLianhetiInfo.xueke[v])
                            }
                        }

                        if (level === 2) {
                            oFilterValue[j].sName = param[i].cityInfo[j].districtName

                            oFilterValue[j].fenxiao += currentLianhetiInfo.fenxiao
                            oFilterValue[j].jiaoxuedian += currentLianhetiInfo.jiaoxuedian.length
                            oFilterValue[j].jiaoshi += currentLianhetiInfo.jiaoshi
                            oFilterValue[j].xuesheng += currentLianhetiInfo.xuesheng
                            oFilterValue[j].zhiboke += currentLianhetiInfo.zhiboke
                            oFilterValue[j].xueke = oFilterValue[j].xueke.concat(param[i].cityInfo[j].districtInfo[k].schoolInfo.xueke)
                        }

                        if (level === 3) {
                            var myCompOverlay = new(myOverlay.initial(
                                new BMap.Point(
                                    param[i].cityInfo[j].districtInfo[k].coordinate[0],
                                    param[i].cityInfo[j].districtInfo[k].coordinate[1]
                                ),
                                param[i].cityInfo[j].districtInfo[k].schoolName,
                                k + 1, 3
                            ))

                            myMap.addOverlay(myCompOverlay)

                            for (var v = 0; v < param[i].cityInfo[j].districtInfo.length; v++) {
                                oFilterValue[v] = {
                                    jiaoxuedian: 0,
                                    xuesheng: 0,
                                    xueke: {},
                                    zhiboke: 0,
                                    sName: [],
                                    schoolDetailUrl: ''
                                }
                                oFilterValue[v].xuesheng += param[i].cityInfo[j].districtInfo[v].schoolInfo.xuesheng
                                oFilterValue[v].zhiboke += param[i].cityInfo[j].districtInfo[v].schoolInfo.zhiboke
                                oFilterValue[v].sName = param[i].cityInfo[j].districtInfo[v].schoolName
                                oFilterValue[v].xueke = param[i].cityInfo[j].districtInfo[v].schoolInfo.xueke
                                oFilterValue[v].schoolDetailUrl = param[i].cityInfo[j].districtInfo[v].schoolDetailUrl
                                oFilterValue[v].jiaoxuedian = param[i].cityInfo[j].districtInfo[v].schoolInfo.jiaoxuedian
                            }

                        }
                    }
                    // 区县级遍历结束，所有学科去重后获取长度
                    if (level === 2) {
                        oFilterValue[j].xueke = (array_unique_o(oFilterValue[j].xueke)).length
                    }
                }
                // 市级遍历结束，所有学科去重后获取长度                
                if (level === 1) {
                    oFilterValue[i].xueke = (array_unique_o(oFilterValue[i].xueke)).length
                }
            }
            // 统计区域学科去重后获取长度
            if (level === 1 || level === 2) {
                infoStatistics.xueke = infoStatistics.xueke.length
            }
            if (level === 3) {
                $scope.infoStatistics = tempinfoStatistics
                    // console.log(infoStatistics)
            }
            //数组去重
            function array_unique_o(arr) {
                var tmp = new Array() //声明一个空数组
                for (var i in arr) //i在传进来的数组中
                {
                    if (tmp.indexOf(arr[i]) == -1) //push判定 indexOf查找tmp中是否已经有了此元素，没有才push.
                    {
                        tmp.push(arr[i]) //push
                    }
                }
                return tmp //返回push完成的数组        
            }
        }
    }

    $scope.$watch('selectedA', function(newValue, oldValue) {
        $scope.selectedB.value = "全部"
        updateFilterValue($scope.selectedA.value.name, $scope.selectedB.value)
    }, true)

    $scope.$watch('selectedB', function(newValue, oldValue) {
        updateFilterValue($scope.selectedA.value.name, $scope.selectedB.value)
    }, true)

}])

longshangApp.filter('trustHtml', function($sce) {
    return function(input) {
        return $sce.trustAsHtml(input)
    }
})

/*地图指令*/
longshangApp.directive('baidumap', function() {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        scope: {
            currentLianheti: '=lianheti'
        },
        template: '<div id="mapCover" ng-transclude></div>',
        link: function(scope, ele, attr, upFoo) {
            myMap = new BMap.Map("mapCover")
                // 初始化定位，定义初始化缩放等级
            myMap.centerAndZoom(new BMap.Point(114.326667, 29.849003), 11)
                // 开启缩放
            myMap.enableScrollWheelZoom(true)

            var navigationControl = new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_LEFT,
                type: BMAP_NAVIGATION_CONTROL_LARGE,
                enableGeolocation: true
            })
            myMap.addControl(navigationControl)

            // 设置地图风格
            // myMap.setMapStyle({ style: 'googlelite' });

            if (attr.status !== '全部' && typeof attr.status === 'string') {
                var param = oDistrictLevel
                for (var i = 0; i < param.length; i++) {
                    for (var j = 0; j < param[i].cityInfo.length; j++) {
                        for (var k = 0; k < param[i].cityInfo[j].districtInfo.length; k++) {
                            var myCompOverlay = new(myOverlay.initial(
                                new BMap.Point(
                                    param[i].cityInfo[j].districtInfo[k].coordinate[0],
                                    param[i].cityInfo[j].districtInfo[k].coordinate[1]
                                ),
                                param[i].cityInfo[j].districtInfo[k].schoolName,
                                k + 1, 3
                            ))

                            myMap.addOverlay(myCompOverlay)
                        }
                    }
                }

            } else {
                for (var i = 0; i < oDistrictLevel.length; i++) {
                    var myCompOverlay = new(myOverlay.initial(new BMap.Point(oDistrictLevel[i].coordinate[0], oDistrictLevel[i].coordinate[1]), oDistrictLevel[i].cityName, i + 1, 1))
                    myMap.addOverlay(myCompOverlay)
                }

                // 联合体细节页面
                if (attr.lianheti) {
                    myMap.clearOverlays()
                    myMap.centerAndZoom(new BMap.Point(scope.currentLianheti.coordinate[0], scope.currentLianheti.coordinate[1]), 10)

                    var myCompOverlay = new(myOverlay.initial(
                        new BMap.Point(scope.currentLianheti.coordinate[0],
                            scope.currentLianheti.coordinate[1]),
                        scope.currentLianheti.schoolName, 4, 4
                    ))
                    myMap.addOverlay(myCompOverlay)

                    for (var i = 0; i < scope.currentLianheti.schoolInfo.jiaoxuedian.length; i++) {
                        var curJiaoxuedian = scope.currentLianheti.schoolInfo.jiaoxuedian[i]
                        var myCompOverlay = new(myOverlay.initial(new BMap.Point(curJiaoxuedian.coordinate[0], curJiaoxuedian.coordinate[1]), curJiaoxuedian.jiaoxuedianName, 4, 4))
                        myMap.addOverlay(myCompOverlay)
                    }
                }
            }
        }
    }
})
