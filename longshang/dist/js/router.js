/*页面路由*/
longshangApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('index');

    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'index.html'
                },
                'header@index': {
                    templateUrl: 'template/header.html'
                },
                'content@index': {
                    templateUrl: 'template/main.html',
                    controller: function($rootScope, $scope) {
                        $scope.whichPage.ishome = true
                    }
                },
                'footer@index': {
                    templateUrl: 'template/footer.html'
                }
            }
        })
        .state('index.lianheti', {
            url: '/lianheti',
            views: {
                'content': {
                    templateUrl: 'template/lianheti/lianhetiDetail.html',
                    controller: function($rootScope, $scope) {
                        $scope.whichPage.ishome = false
                        $scope.whichPage.lianhetiDetail = true
                    }
                }
            }
        })
        .state('index.lianhetiKebiao', {
            url: '/lianheti/lianhetiKebiao:{jid}',
            views: {
                'content': {
                    templateUrl: 'template/lianheti/lianhetiKebiao.html',
                    controller: function($rootScope, $scope) {
                        $scope.whichPage.ishome = false
                        $scope.whichPage.lianhetiDetail = true
                    }
                },
                'kebiao@content': {
                    templateUrl: function(obj) {
                        return 'dist/img/lianhetiImg/' + obj.jid + '/lianhetikb.html'
                    }
                }
            }
        })
        .state('index.lianhetiTeacher', {
            url: '/lianheti/lianhetiTeachers:id',
            views: {
                'content': {
                    templateUrl: 'template/lianheti/lianhetiTeacher.html'
                },
                'lianhetiTeacherTable@content': {
                    templateUrl: function(obj) {
                        return 'template/lianheti/lianhetiteachers/lianhetiteacher' + obj.id + '.html'
                    }
                }
            }
        })
        .state('index.lianhetiStudent', {
            url: '/lianheti/lianhetistudents/lianhetiStudentTable:id',
            views: {
                'content': {
                    templateUrl: 'template/lianheti/lianhetiStudent.html'
                },
                'lianhetiStudentTable@content': {
                    templateUrl: function(obj) {
                        return 'template/lianheti/lianhetistudents/lianhetistudent' + obj.id + '.html'
                    }

                }
            }
        })
        .state('index.lianhetiInterestGroup', {
            url: '/lianheti/lianhetiInterestGroup',
            views: {
                'content': {
                    templateUrl: 'template/lianheti/lianhetiInterestGroup.html'
                }
            }
        })
        .state('index.lianhetiShipin', {
            url: '/lianheti/lianhetiShipin',
            views: {
                'content': {
                    templateUrl: 'template/lianheti/lianhetiShipin.html'
                }
            }
        })
        .state('index.centerschool', {
            url: '/lianheti/centerschool:id',
            views: {
                'content': {
                    templateUrl: 'template/zxdandjxd/centerschool.html'
                },
                'teacher@content': {
                    templateUrl: function(obj) {
                        return 'dist/img/lianhetiImg/' + obj.id + '/zxdjs.html'
                    }
                }/*,
                'kebiao@content': {
                    templateUrl: function(obj) {
                        return 'dist/img/lianhetiImg/' + obj.id + '/zxdkb.htm'
                    }
                }*/
            }
        })
        .state('index.jiaoxuedian', {
            url: '/lianheti/jiaoxuedian:{jid}:{jxdid}',
            views: {
                'content': {
                    templateUrl: 'template/zxdandjxd/jiaoxuedian.html'
                },
                'teacher@content': {
                    templateUrl: function(obj) {
                        return 'dist/img/lianhetiImg/' + obj.jid + '/jxdjs' + obj.jxdid + '.html'
                    }
                },
                'kebiao@content': {
                    templateUrl: function(obj) {
                        return 'dist/img/lianhetiImg/' + obj.jid + '/jxdkb' + obj.jxdid + '.htm'
                    }
                }
            }
        })
});
