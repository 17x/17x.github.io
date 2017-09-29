import React, {Component} from 'react';
import Category from './';

const categoryState = {
    name: 'category',
    url: '/category',
    sticky: true,
    views: {
        '': {
            component: Category
        }
    }
};

export default categoryState;