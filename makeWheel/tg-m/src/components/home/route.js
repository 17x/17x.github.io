import Home from './index';
import React, {Component} from 'react';
import HomeTab1  from './homeTab1';
import HomeTab2  from './homeTab2';

const homeState = [
    {
        name: 'home',
        url: '/home',
        sticky: true,
        redirectTo: 'home.tab1',
        views: {
            '': {
                component: Home
            }
        }
    },
    {
        name: 'home.tab1',
        url: '/1',
        sticky: true,
        views: {
            'home': {
                component: HomeTab1
            }
        }
    },
    {
        name: 'home.tab2',
        url: '/2',
        sticky: true,
        views: {
            'home': {
                component: HomeTab2
            }
        }
    },
    {
        name: 'home.tab3',
        url: '/3',
        sticky: true,
        views: {
            'home': {
                component: () => (<div>HomeTab3</div>)
            }
        }
    },
    {
        name: 'home.tab4',
        url: '/4',
        sticky: true,
        views: {
            'home': {
                component: () => (<div>HomeTab4</div>)
            }
        }
    },
    {
        name: 'home.tab5',
        url: '/5',
        sticky: true,
        views: {
            'home': {
                component: () => (<div>HomeTab5</div>)
            }
        }
    }
];

export default homeState;