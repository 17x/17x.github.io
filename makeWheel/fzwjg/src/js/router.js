myApp.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(false);
    // $locationProvider.hashPrefix()
    $urlRouterProvider.otherwise('/home');

    /*定义index abstract*/
    $stateProvider
        .state('index', {
            abstract: true,
            views: {
                'header@index': { templateUrl: 'tpls/header.html' },
                'footer@index': { templateUrl: 'tpls/footer.html' },
                'content@index': {
                    templateUrl: 'tpls/main.html'
                }
            }
        })
        /*home*/
        .state('index.home', {
            url: '/home',
            'content@index': {
                templateUrl: 'tpls/main.html'
            }
        })
        /*search*/
        .state('index.search', {
            url: '/search?:keywords:catid',
            views: {
                'content@index': {
                    controller: 'searchCtrl',
                    templateUrl: 'tpls/search.html'
                }
            }
        })
        /*category*/
        .state('index.category', {
            url: '/category',
            views: {
                'content@index': {
                    controller: 'categoryCtrl',
                    templateUrl: 'tpls/category.html'
                }
            }
        })
        /*usercenter*/
        .state('index.usercenter', {
            url: '/usercenter',
            views: {
                'content@index': {
                    controller: 'usercenterCtrl',
                    templateUrl: 'tpls/usercenter.html'
                }
            }
        })
        /*post*/
        .state('index.post', {
            url: '/post',
            views: {
                'content@index': {
                    controller: 'postCtrl',
                    templateUrl: 'tpls/post.html'
                }
            }
        })
        /*info*/
        .state('index.info', {
            url: '/info?infoid',
            views: {
                'content@index': {
                    controller: 'infoCtrl',
                    templateUrl: 'tpls/info.html'
                }
            }
        })
        /*login*/
        .state('index.login', {
            url: '/login',
            views: {
                'content@index': {
                    controller: 'loginCtrl',
                    templateUrl: 'tpls/login.html'
                }
            }
        })
        /*register*/
        .state('index.register', {
            url: '/register',
            views: {
                'content@index': {
                    controller: 'regCtrl',
                    templateUrl: 'tpls/reg.html'
                }
            }
        })
        /*report*/
        .state('index.report', {
            url: '/report?infoid',
            views: {
                'content@index': {
                    controller: 'reportCtrl',
                    templateUrl: 'tpls/report.html'
                }
            }
        })
        /*mypost*/
        .state('index.mypost', {
            url: '/mypost',
            views: {
                'content@index': {
                    templateUrl: 'tpls/mypost.html'
                }
            }
        })
         /*myfavor*/
        .state('index.myfavor', {
            url: '/mypost',
            views: {
                'content@index': {
                    templateUrl: 'tpls/myfavor.html'
                }
            }
        })
         /*view history*/
        .state('index.history', {
            url: '/history',
            views: {
                'content@index': {
                    templateUrl: 'tpls/history.html'
                }
            }
        })
        /*usersetting*/
        .state('index.usersetting', {
            url: '/usersetting',
            views: {
                'content@index': {
                    templateUrl: 'tpls/usersetting.html'
                }
            }
        })
        /*contactus*/
        .state('index.contactus', {
            url: '/contactus',
            views: {
                'content@index': {
                    templateUrl: 'tpls/contactus.html'
                }
            }
        })
        /*feedback*/
        .state('index.feedback', {
            url: '/feedback',
            views: {
                'content@index': {
                    templateUrl: 'tpls/feedback.html'
                }
            }
        });
}]);
