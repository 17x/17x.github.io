import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import App from './App.vue';
import handleBeforeBootstrapApp from './service/handleBeforeBootstrapApp';
import setREM from './utils/setREM';
import on from './utils/on';
import routes from './routes';

on(window, 'load', () => setREM());
on(window, 'resize', () => setREM());
on(window, 'orientationchange', () => setREM());
window.log = console.log;
axios.defaults.withCrediental = true;

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes
});

Vue.use(VueRouter);

let vm = new Vue({
    router,
    data: {
        msg: 'hello vue'
    },
    methods: {
        greetings: function (str) {
            log(str);
        }
    },
    components: {App}
});

const renderApp = () => vm.$mount('#app');
handleBeforeBootstrapApp(renderApp);