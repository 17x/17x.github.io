###  angular project in ie issue , when http return data , the view not update (partly)

``` bash
    .config([
    '$httpProvider', function ($httpProvider) {
        // Initialize get if not there
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        // Enables Request.IsAjaxRequest() in ASP.NET MVC
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

        // Disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    }
])
```

#### refer:
[http://benjii.me/2014/07/ie-is-caching-my-angular-requests-to-asp-net-mvc/](http://benjii.me/2014/07/ie-is-caching-my-angular-requests-to-asp-net-mvc/)

[http://www.c-sharpcorner.com/blogs/angular-js-caching-issue-with-internet-explorer](http://www.c-sharpcorner.com/blogs/angular-js-caching-issue-with-internet-explorer)


[https://stackoverflow.com/questions/16098430/angular-ie-caching-issue-for-http](https://stackoverflow.com/questions/16098430/angular-ie-caching-issue-for-http)