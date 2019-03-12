import Vue from 'vue';
import {LoadingBar} from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import iviewModules from './iview'
import Util from 'util';
import App from './app.vue';
import GlobalNavigation from './components/GlobalNavigation.vue'

// style
Vue.use(VueRouter);
Vue.use(iviewModules);
// Vue.component('LoadingBar', LoadingBar);
Vue.component('GlobalNavigation', GlobalNavigation);

// router configs
const RouterConfig = {
  mode: 'hash',
  routes: Routers
};

const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  LoadingBar.start();
  // Util.title(to.meta.title);
  next();
});

router.afterEach((to, from, next) => {
  LoadingBar.finish();
  window.scrollTo(0, 0);
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
