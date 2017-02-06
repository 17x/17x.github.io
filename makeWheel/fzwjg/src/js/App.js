// var myApp = angular.module('myApp', ['ngSanitize','ngAnimate', 'ui.router', 'ui.select','ngTouch']);
var myApp = angular.module('myApp', ['ngAnimate', 'ui.router', 'ngTouch', 'ngCookies', 'angular-carousel', 'ngDialog', 'angularFileUpload']);

// 缓存模板
myApp.run(["$templateCache", function($templateCache) {
    $templateCache.put('templateId1', 'tpls/search.html');
    $templateCache.put('templateId2', 'tpls/category.html');
    $templateCache.put('templateId3', 'tpls/usercenter.html');
    $templateCache.put('templateId4', 'tpls/post.html');
    $templateCache.put('templateId5', 'tpls/city.html');
    $templateCache.put('templateId6', 'tpls/info.html');
    $templateCache.put('templateId7', 'tpls/login.html');
    $templateCache.put('templateId8', 'tpls/reg.html');
    $templateCache.put('templateId9', 'tpls/mypost.html');
    $templateCache.put('templateId10', 'tpls/report.html');
}]);
//开启rem
window.onresize = (function() {
    document.getElementsByTagName('html')[0].style.fontSize = (document.documentElement || document.body).clientWidth / 25 + "px";
    return arguments.callee;
})();