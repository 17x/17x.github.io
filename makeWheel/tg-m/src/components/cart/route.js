import React, {Component} from 'react';
import Cart from './';

const cartState = {
    name: 'cart',
    url: '/cart',
    sticky: true,
    views: {
        'cart': {
            component: Cart
        }
    }
};

export default cartState;