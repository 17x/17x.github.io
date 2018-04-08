import Loading from 'src/components/Loading';

export default {
    page: 'Discover',
    path: '/discover',
    component: Loadable({
        loader: () => import('./index'),
        loading: Loading
    })
};