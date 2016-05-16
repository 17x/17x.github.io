/*页面路由*/
longshangApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('index');

    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: '../../index.html'
                },
                'header@index': {
                    templateUrl: '../../template/header.html'
                },
                'content@index': {
                    templateUrl: '../../template/main.html'
                }
            }
        })
        .state('index.lianheti', {
            url: '/lianhetiDetail',
            views: {
                'content': {
                    templateUrl: '../../template/lianheti/lianhetiDetail.html'
                },
                'footer': {
                    templateUrl: '../../template/footer.html'
                }
            }
        })
        .state('index.lianhetiKebiao', {
            url: '/lianhetiKebiao',
            views: {
                'content': {
                    templateUrl: '../../template/lianheti/lianhetiKebiao.html'
                },
                'footer': {
                    templateUrl: '../../template/footer.html'
                }
            }
        })
        .state('index.lianhetiTeacherTable', {
            url: 'lianhetiTeacher/lianhetiTeacherTable:ID',
            views: {
                'content': {
                    templateUrl: '../../template/lianheti/lianhetiTeacher.html'
                },
                'lianhetiTeacherTable@content': {
                    templateUrl: function(obj) {
                        return '../../template/lianheti/lianhetiTeachers/lianhetiTeacher' + obj.ID + '.html'
                    }

                },
                'footer': {
                    templateUrl: '../../template/footer.html'
                }
            }
        })
        .state('index.lianhetiStudentTable', {
            url: 'lianhetiTeacher/lianhetiStudentTable:ID',
            views: {
                'content': {
                    templateUrl: '../../template/lianheti/lianhetiStudent.html'
                },
                'lianhetiStudentTable@content': {
                    templateUrl: function(obj) {
                        return '../../template/lianheti/lianhetiStudents/lianhetiStudent' + obj.ID + '.html'
                    }

                },
                'footer': {
                    templateUrl: '../../template/footer.html'
                }
            }
        })
        .state('index.lianhetiInterestGroup', {
            url: '/lianhetiInterestGroup',
            views: {
                'content': {
                    templateUrl: '../../template/lianheti/lianhetiInterestGroup.html'
                },
                'footer': {
                    templateUrl: '../../template/footer.html'
                }
            }
        })
        .state('index.lianhetiShipin', {
            url: '/lianhetiShipin',
            views: {
                'content': {
                    templateUrl: '../../template/lianheti/lianhetiShipin.html'
                },
                'footer': {
                    templateUrl: '../../template/footer.html'
                }
            }
        })
        .state('index.centerschool', {
            url: '/centerschool',
            views: {
                'content': {
                    templateUrl: '../../template/zxdandjxd/centerschool.html'
                },
                'footer': {
                    templateUrl: '../../template/footer.html'
                }
            }
        })
        .state('index.jiaoxuedian', {
            url: '/jiaoxuedian',
            views: {
                'content': {
                    templateUrl: '../../template/zxdandjxd/jiaoxuedian.html'
                },
                'footer': {
                    templateUrl: '../../template/footer.html'
                }
            }
        })
});
