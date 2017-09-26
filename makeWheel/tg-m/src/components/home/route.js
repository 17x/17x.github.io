import Home from './index';
import React, {Component} from 'react';
import HomeTab1  from './homeTab1';

const homeState = [
    {
        name: 'home',
        url: '/home',
        sticky: true,
        redirectTo: 'home.tab1',
        views: {
            'home': {
                component: Home
            }
        }
    },
    {
        name: 'home.tab1',
        url: '/1',
        sticky: true,
        views: {
            'homeTab1': {
                component: HomeTab1
            }
        }
    },
    {
        name: 'home.tab2',
        url: '/2',
        sticky: true,
        views: {
            'homeTab2': {
                component: () => (<div>HomeTab2</div>)
            }
        }
    },
    {
        name: 'home.tab3',
        url: '/3',
        sticky: true,
        views: {
            'homeTab3': {
                component: () => (<div>HomeTab3</div>)
            }
        }
    },
    {
        name: 'home.tab4',
        url: '/4',
        sticky: true,
        views: {
            'homeTab4': {
                component: () => (<div>HomeTab4</div>)
            }
        }
    },
    {
        name: 'home.tab5',
        url: '/5',
        sticky: true,
        views: {
            'homeTab5': {
                component: () => (<div>HomeTab5</div>)
            }
        }
    }
];

export default homeState;