import Loading from 'components/Loading';
import Loadable from 'react-loadable';
import {aboutRoute} from './pages/About';
import {discoverRoute} from './pages/Discover';

let routers = [
    aboutRoute,
    discoverRoute
].map(val => ({
        ...val,
        component: Loadable({
            loader: () => import(`./pages/${val.page}`),
            loading: Loading,
            delay: 100
        })
    })
);

// console.log(routers);

export default routers;