import Loading from 'src/components/Loading';

export default {
    page: 'Login',
    path: '/login',
    authNeed: false,
    component: Loadable({
        loader: () => import('./index'),
        loading: Loading
    })
};