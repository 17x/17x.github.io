import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import App from './components/App';
import reducers from './reducers';

let env = process.env.NODE_ENV,
    renderApp = null,
    store = null;

if (env === 'production') {
    store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    renderApp = Component => {
        render(
            <Provider store={store}>
                <Component />
            </Provider>,
            document.getElementById('root')
        );
    };
} else if (env === 'development') {
    store = createStore(reducers);
    renderApp = Component => {
        render(
            <AppContainer>
                <Provider store={store}>
                    <Component />
                </Provider>
            </AppContainer>,
            document.getElementById('root')
        );
    };
}

renderApp(App);
/*window.onbeforeunload = function (e) {
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = '请确定?';
    }

    // For Safari
    return '确定要离开当前页面吗?';
};*/
module.hot && env === 'development' && module.hot.accept('./components/App', () => { renderApp(App); });