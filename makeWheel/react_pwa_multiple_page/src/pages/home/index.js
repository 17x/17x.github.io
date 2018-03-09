import React from 'react';
import {render} from 'react-dom';
// import {AppContainer} from 'react-hot-loader';

import App from './App';

render(
    <App />,
    document.getElementById('root')
);

let env = process.env.NODE_ENV,
    renderApp = null;
/*

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

module.hot && env === 'development' && module.hot.accept('./App', () => { renderApp(App); });
*/
