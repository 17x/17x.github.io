import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import App from './App.vue';
import handleBeforeBootstrapApp from './service/handleBeforeBootstrapApp';
import setREM from './utils/setREM';
import on from './utils/on';
import router from './routes';

/*axios default set*/
axios.defaults.withCrediental = true;

/*vue mount*/
Vue.use(VueRouter);
const vm = new Vue({router, render: h => h(App)}).$mount('#app');
// const renderApp = () => vm.$mount('#app');
// renderApp();
// handleBeforeBootstrapApp(renderApp);

/*rem font size set*/
on(window, 'load', () => setREM());
on(window, 'resize', () => setREM());
on(window, 'orientationchange', () => setREM());
window.log = console.log;