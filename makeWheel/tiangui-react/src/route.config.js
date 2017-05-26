import React from 'react';
import {UIRouterReact, UIRouter, UIView, servicesPlugin, pushStateLocationPlugin} from 'ui-router-react';

import appStates from './main/states';
import homeStates from './home/states';
import categoryStates from './category/state';
import cityStates from './city/state';
import usercenterStates from './usercenter/state';
import shoppingCartStates from './shoppingCart/state';

const allStates = [appStates, homeStates, categoryStates, cityStates, usercenterStates, shoppingCartStates];

const router = new UIRouterReact();
router.plugin(servicesPlugin);
router.plugin(pushStateLocationPlugin);
allStates.forEach(state => router.stateRegistry.register(state));
router.start();
// router.urlRouterProvider.otherwise(() => '/home');

/*
import {StickyStatesPlugin} from "ui-router-sticky-states";
let router = new UIRouterReact();
router.plugin(StickyStatesPlugin);
*/

/*
    import 'whatwg-fetch';
    const data = new FormData();
    data.append('specialId', 4);

    const myInit = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, *!/!*'
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
*/

export default () => (
    <UIRouter router={router}>
        <UIView />
    </UIRouter>
)