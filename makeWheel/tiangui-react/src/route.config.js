/*
    import {StickyStatesPlugin} from "ui-router-sticky-states";
    let router = new UIRouterReact();
    router.plugin(StickyStatesPlugin);
     router.urlRouterProvider.otherwise(() => '/home');
    import 'whatwg-fetch';
    const data = new FormData();
    data.append('specialId', 4);

    const myInit = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain'
        },
        mode: 'cors',
        body: data
    };

    fetch('http://192.168.1.13:80/ak-sw-tg/pages/m/specialDetail.html', myInit)
        .then(response => {
            return response.json();
        }).then(json => {
            console.log(json);
        }).catch(err => {
            console.log(err);
        });


import React from 'react';
import {UIRouterReact, UIRouter, UIView, servicesPlugin, pushStateLocationPlugin} from '@uirouter/react';

import appStates from './main/states';
import homeStates from './home/states';
import categoryStates from './category/state';
import cityStates from './city/state';
import usercenterStates from './usercenter/state';
import shoppingCartStates from './shoppingCart/state';

/* start route manual */

/*all your need states*/
const router = new UIRouterReact();
const allStates = [appStates, homeStates, categoryStates, cityStates, usercenterStates, shoppingCartStates];
router.plugin(servicesPlugin);
router.plugin(pushStateLocationPlugin);
/*
*  notice ! this need import hashLocationPlugin
* router.plugin(hashLocationPlugin);
*/
//router.urlRouter.otherwise('/home');
allStates.forEach(state => router.stateRegistry.register(state));
router.start();

export default () => (
    <UIRouter router={router}>
        <UIView />
    </UIRouter>
);