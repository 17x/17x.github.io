### angular-router_event
```bash
 //$routeChangeStart
    //$routeChangeSuccess
    //$locationChangeSuccess
    //$locationChangeStart
    //$stateChangeStart
    //$stateChangeSuccess
    //$viewContentLoading
    //$viewContentLoaded

    // $scope.myanimate = false
    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

    });

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        /*console.group()
            console.log('event;', event)
            console.log('toState;', toState)
            console.log('toParams;', toParams)
            console.log('fromState;', fromState)
            console.log('fromParams;', fromParams)
        console.groupEnd()*/
    });
```