import Loading from 'src/components/Loading';

export default {
    page: 'About',
    path: '/about',
    authNeed: false,
    component: Loadable({
        loader: () => import('./index'),
        loading: Loading
    })
};