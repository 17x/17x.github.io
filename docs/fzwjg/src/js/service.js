myApp.service('updateHomeItem', ['$http', '$q', function($http, $q) {
    //获取最新list
    this.getNewest = function() {
        var d = $q.defer();
        $http({
                method: 'get',
                url: 'mock/aCategorysInHome.json'
            })
            .then(function(suc) {
                d.resolve(suc);
            }, function(faild) {
                d.reject("error");
            });

        return d.promise;
    };
}]);

myApp.service('searchService', ['$http', '$q', function($http, $q) {
    return function(mockDataIndex) {
        var d = $q.defer();

        $http.get('mock/search/cate' + mockDataIndex + '.json')
            .then(function(suc) {
                d.resolve(suc);
            }, function() {
                d.reject("error");
            })            
        return d.promise;
    }
}]);
