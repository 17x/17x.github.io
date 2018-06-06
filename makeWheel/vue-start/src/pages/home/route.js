import VueRouter from 'vue-router';

let router = {
    path: '/',
    component: import('./index.vue'),
    children: [
        {
            path: '1'
        }, {
            path: '2'
        }, {
            path: '3'
        }, {
            path: '4'
        }, {
            path: '5'
        }
    ]
};

export default router;