import Loading from 'src/components/Loading';

export default {
    page: 'Login',
    path: '/login',
    component: Loadable({
        loader: () => import('./index'),
        loading: Loading
    })
};