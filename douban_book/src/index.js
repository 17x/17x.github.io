import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import App from './route.config';

const renderApp = Component => {
    render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    );
};

renderApp(App);

module.hot && module.hot.accept('./route.config', () => { renderApp(App); });

//REM事件
//const setRootFontSize = () => document.documentElement.style.fontSize = window.innerWidth / 25 + 'px';
// window.addEventListener('load', setRootFontSize);
// window.addEventListener('resize', setRootFontSize);
// window.addEventListener('orientationchange', setRootFontSize);