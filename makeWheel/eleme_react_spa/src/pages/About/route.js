import Loadable from 'react-loadable';
import Loading from 'components/Loading';

export default {
    page: 'About',
    path: '/about',
    component: Loadable({
        loader: () => import('./index.js'),
        loading: Loading
    })
};