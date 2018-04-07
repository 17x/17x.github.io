import React from 'react';
import {render} from 'react-dom';
import {hot} from 'react-hot-loader';
import {createStore} from 'redux';
import {HashRouter  as Router} from 'react-router-dom';
import App from './App';
import reducers from './reducers';
const store = createStore(reducers);

/*axios.get('mock/ladies_outerwear.json').then(resp => {});*/

render(
    <Router>
        <App store={store}/>
    </Router>,
    document.getElementById('root')
);

export default hot(module)(App);
