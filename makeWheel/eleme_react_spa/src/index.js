import React from 'react';
import {render} from 'react-dom';
import {hot} from 'react-hot-loader';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import App from './App';
import reducers from './reducers';

/*axios.get('mock/ladies_outerwear.json').then(resp => {});*/

(function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js');
    }
})();

axios.defaults.withCredentials = true;

render(
    <Provider store={createStore(reducers)}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);

export default hot(module)(App);
