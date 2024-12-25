'use strict';

import React from 'react';
import {render} from 'react-dom';
import Root from './routers/route';
import './views/layout/style.scss';
import './views/layout/fonts/iconfont.css';

let env = process.env.NODE_ENV,
    renderApp = null;

if (env === 'production') {
    renderApp = Component => {
        render(
            <Component />,
            document.getElementById('root')
        );
    };
} else if (env === 'development') {
    renderApp = Component => {
        render(
            <AppContainer>
                <Component />
            </AppContainer>,
            document.getElementById('root')
        );
    };
}

renderApp(App);

module.hot && env === 'development' && module.hot.accept('./App', () => { renderApp(App); });

const setRootFontSize = () => {
    document.documentElement.style.fontSize = innerWidth / 25 + 'px';
};

window.addEventListener('load', setRootFontSize);
window.addEventListener('orientationchange', setRootFontSize);
