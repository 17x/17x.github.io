import VueRouter from 'vue-router';
import homeRoute from './pages/home/route';
import aboutRoute from './pages/about/route';

let routers = [
    homeRoute,
    aboutRoute
];

/*routers.map(val => {
    // val.component = view(val.path);
    val.component = () => import('./pages' + val.path + '/index.vue');
});*/

console.log(routers);

export default new VueRouter({
    mode: 'hash',
    // base: __dirname,
    routers
});