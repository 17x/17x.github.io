import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import App from './components/App';

import reducers from './reducers';

let store = (process.env.NODE_ENV === 'production')
    ? createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    : createStore(reducers);

console.log(process.env.NODE_ENV);

const renderApp = Component => {
    render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

renderApp(App);

module.hot && module.hot.accept('./components/App', () => { renderApp(App); });