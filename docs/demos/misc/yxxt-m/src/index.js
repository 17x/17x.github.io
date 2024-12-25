import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import App from './components/App';

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
// document.onselectstart = () => false;

module.hot && env === 'development' && module.hot.accept('./components/App', () => { renderApp(App); });