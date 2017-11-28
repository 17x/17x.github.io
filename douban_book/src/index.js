import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import App from './components/App';

import reducers from './reducers';

let store = createStore(reducers);

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