import Loading from 'src/components/Loading';

export default {
    page: 'Order',
    path: '/order',
    authNeed: false,
    component: Loadable({
        loader: () => import('./index'),
        loading: Loading
    })
};