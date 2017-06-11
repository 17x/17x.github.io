import Home from '../home/Home';
import HomeTab1 from '../home/home-tab-1';
import HomeTab2 from '../home/home-tab-2';
import HomeTab3 from '../home/home-tab-3';
import HomeTab4 from '../home/home-tab-4';
import HomeTab5 from '../home/home-tab-5';

const homeStates = {
    parent: 'app',
    name: 'home',
    redirectTo: 'tab1',
    url: '/home',
    component: Home
};

const tab1 = {
    parent: 'home',
    name: 'tab1',
    url: '/1',
    component: HomeTab1
};
const tab2 = {
    parent: 'home',
    name: 'tab2',
    url: '/2',
    component: HomeTab2
};
const tab3 = {
    parent: 'home',
    name: 'tab3',
    url: '/3',
    component: HomeTab3
};
const tab4 = {
    parent: 'home',
    name: 'tab4',
    url: '/4',
    component: HomeTab4
};
const tab5 = {
    parent: 'home',
    name: 'tab5',
    url: '/5',
    component: HomeTab5
};
//123+6
export default [homeStates, tab1, tab2, tab3, tab4, tab5];