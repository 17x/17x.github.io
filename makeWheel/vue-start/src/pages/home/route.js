let router = {
    path: '/home',
    asyncComponent: () =>import ('./index.vue')
};

export default router;