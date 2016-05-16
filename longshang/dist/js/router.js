/*页面路由*/
longshangApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('index');

    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: '/longshangjiaoyu/index.html'
                },
                'header@index': {
                    templateUrl: '/longshangjiaoyu/template/header.html'
                },
                'content@index': {
                    templateUrl: '/longshangjiaoyu/template/main.html'
                }
            }
        })
        .state('index.lianheti', {
            url: '/lianhetiDetail',
            views: {
                'content': {
                    templateUrl: '/longshangjiaoyu/lianheti/lianhetiDetail.html'
                },
                'footer': {
                    templateUrl: '/longshangjiaoyu/footer.html'
                }
            }
        })
        .state('index.lianhetiKebiao', {
            url: '/lianhetiKebiao',
            views: {
                'content': {
                    templateUrl: '/longshangjiaoyu/lianheti/lianhetiKebiao.html'
                },
                'footer': {
                    templateUrl: '/longshangjiaoyu/footer.html'
                }
            }
        })
        .state('index.lianhetiTeacherTable', {
            url: 'lianhetiTeacher/lianhetiTeacherTable:ID',
            views: {
                'content': {
                    templateUrl: '/longshangjiaoyu/lianheti/lianhetiTeacher.html'
                },
                'lianhetiTeacherTable@content': {
                    templateUrl: function(obj) {
                        return '/longshangjiaoyu/lianheti/lianhetiTeachers/lianhetiTeacher' + obj.ID + '.html'
                    }

                },
                'footer': {
                    templateUrl: '/longshangjiaoyu/footer.html'
                }
            }
        })
        .state('index.lianhetiStudentTable', {
            url: 'lianhetiTeacher/lianhetiStudentTable:ID',
            views: {
                'content': {
                    templateUrl: '/longshangjiaoyu/lianheti/lianhetiStudent.html'
                },
                'lianhetiStudentTable@content': {
                    templateUrl: function(obj) {
                        return '/longshangjiaoyu/lianheti/lianhetiStudents/lianhetiStudent' + obj.ID + '.html'
                    }

                },
                'footer': {
                    templateUrl: '/longshangjiaoyu/footer.html'
                }
            }
        })
        .state('index.lianhetiInterestGroup', {
            url: '/lianhetiInterestGroup',
            views: {
                'content': {
                    templateUrl: '/longshangjiaoyu/lianheti/lianhetiInterestGroup.html'
                },
                'footer': {
                    templateUrl: '/longshangjiaoyu/footer.html'
                }
            }
        })
        .state('index.lianhetiShipin', {
            url: '/lianhetiShipin',
            views: {
                'content': {
                    templateUrl: '/longshangjiaoyu/lianheti/lianhetiShipin.html'
                },
                'footer': {
                    templateUrl: '/longshangjiaoyu/footer.html'
                }
            }
        })
        .state('index.centerschool', {
            url: '/centerschool',
            views: {
                'content': {
                    templateUrl: '/longshangjiaoyu/zxdandjxd/centerschool.html'
                },
                'footer': {
                    templateUrl: '/longshangjiaoyu/footer.html'
                }
            }
        })
        .state('index.jiaoxuedian', {
            url: '/jiaoxuedian',
            views: {
                'content': {
                    templateUrl: '/longshangjiaoyu/zxdandjxd/jiaoxuedian.html'
                },
                'footer': {
                    templateUrl: '/longshangjiaoyu/footer.html'
                }
            }
        })
});
