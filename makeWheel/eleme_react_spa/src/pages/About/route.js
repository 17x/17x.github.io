import Loading from 'src/components/Loading';

export default {
    page: 'About',
    path: '/about',
    component: Loadable({
        loader: () => import('./index'),
        loading: Loading
    })
};