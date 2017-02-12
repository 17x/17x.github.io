require({
    baseUrl: './js/',
    paths: {
        jquery: 'http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min',
        modulea: 'modulea'
    }
});

define(['jquery', 'modulea'], function($, modulea) {
    $('body p').html(1 + '+' + 2 + '=' + modulea.add(1, 2));
    modulea.moduleb.modulec.print(99)
});
