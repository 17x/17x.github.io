import Loading from 'src/components/Loading';

export default {
    page: 'Discover',
    path: '/discover',
    authNeed: false,
    component: Loadable({
        loader: () => import('./index'),
        loading: Loading
    })
};