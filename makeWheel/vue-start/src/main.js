import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

let app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
});

let app2 = new Vue({
    el: '#app-2',
    data: {
        message: 'You loaded this page on ' + new Date().toLocaleString()
    }
});