/*
    name : pull-up-update (上拉加载更多)
    date : 2017-03-07   
    version : 0.1.0  
    author : Yahone
*/

angular.module('ngPullUpdate', [])
    .directive('pullUpUpdate', ['$timeout', '$interval', function($timeout, $interval) {
        return {
            restrict: 'AE',
            priority: 10000,
            controller: ['$scope', function($scope) {

            }],
            link: function(scope, element, attr) {
                //console.log(attr);
                /*将指令打造成能滚动的样子 - -!! */
                /*高度为自定义*/
                element.css({
                    "display": "block",
                    "width": "100%"/*,
                    "overflowY": "scroll"*/
                });
                var _timer = $interval(function() {
                    if (scope.isLastPage !== undefined) {
                        $interval.cancel(_timer);
                        /*如果已经是最后一页*/
                        if (scope.isLastPage) {
                            //console.log('已经是最后一页了');
                            return false;
                        }
                        // console.log('上拉刷新内部 scope.isLastPage:', scope.isLastPage);
                        var raw = element[0];
                        raw.insertAdjacentHTML('beforeend', '<div id="loadMore" style="display:none;width: 100%;background-color: #fff;text-align: center;height: 3rem;"><img src="img/public/loading.gif" style="width: 2rem;display: inline-block;margin:0.5rem 0.5rem 0 0 ;" alt="" /><p style="display: inline-block;overflow: hidden;height: 2rem;line-height: 2rem;"><span>加载中......</span></p></div>');
                        var oLoading = document.getElementById('loadMore');

                        element.on('scroll', showLoading);
                        scope.$watch('isLastPage', function(newVal, oldVal) {
                            // //console.log('oldVal:', oldVal, 'newVal:', newVal);
                            if (newVal) {
                                element.off('scroll', showLoading);
                                oLoading.style.display = 'none';
                                $timeout(function() {
                                    oLoading.style.display = 'none';
                                }, 3000);
                            }
                        });

                        /*延时tag 三秒一次*/
                        var _tag = false;

                        /*显示加载中*/
                        function showLoading(event) {
                            // //console.log(raw.scrollTop ,raw.offsetHeight,raw.scrollHeight);
                            if (_tag) {
                                return false;
                            }
                            if ((raw.scrollTop + raw.offsetHeight + 50) >= raw.scrollHeight) {
                                //console.log('滚动到底部，开始向上传递事件');
                                _tag = true;

                                oLoading.style.display = 'block';
                                scope.$apply(attr.scrolly);

                                $timeout(function() {
                                    oLoading.style.display = 'none';
                                }, 1000);

                                $timeout(function() {
                                    _tag = false;
                                }, 3000);
                            }
                        }
                    }
                }, 1000);


            }
        };
    }]);
