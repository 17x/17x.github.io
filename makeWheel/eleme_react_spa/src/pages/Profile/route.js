import Loading from 'src/components/Loading';

export default {
    page: 'Profile',
    path: '/profile',
    component: Loadable({
        loader: () => import('./index'),
        loading: Loading
    })
};