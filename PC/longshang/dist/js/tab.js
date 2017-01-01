longshangApp.directive('tab', function() {
    return {
        restrict: 'AE',
        // replace: true,
        scope: {},
        transclude: true,
        controller: function($scope) {
            var boxs = $scope.boxs = []
            $scope.switchBox = function(obj) {
                angular.forEach(boxs, function(box) {
                    box.selected = false;
                })
                obj.selected = true;
            }

            this.addBox = function(obj) {
                if (boxs.length == 0) {
                    $scope.switchBox(obj);
                }
                boxs.push(obj)
            }
        },
        template: '<div class="myTab"><div class="tabHeadCover"><li ng-repeat="i in boxs" class="myTabHead" ng-click="switchBox(i)" ng-class="{active:i.selected}">{{i.title}}</li></div><div class="tabBoxCover" ng-transclude></div></div>'
    }
})


longshangApp.directive('tabbody', function() {
    return {
        restrict: 'AE',
        replace: true,
        scope: {},
        require: '^tab',
        transclude: true,
        template: '<div class="myTabBox" ng-show="selected" ng-transclude></div>',
        link: function(scope, ele, attr, upFoo) {
            scope.title = attr.headtitle
            upFoo.addBox(scope)
        }
    }
})
