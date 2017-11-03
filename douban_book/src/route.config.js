import React, {Component} from 'react';
import {UIRouter, UIView, hashLocationPlugin} from '@uirouter/react';
import axios from 'axios';

import AppBar from  'material-ui/AppBar';
import {green} from 'material-ui/colors';

/*custom style*/
import './assets/publicStyle/normalize.scss';
import './assets/publicStyle/base.scss';
import './assets/publicStyle/public.scss';

/*axios defaults*/
axios.defaults.baseURL = 'http://192.168.1.13:80/ak-sw-tg/pages/m/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

import homeState from './components/home/route';
// import userState from './components/user/route';

let states = [];
states = states.concat(homeState);

const configRouter = router => {
    //console.log(router.urlService.listen());
    // console.log(router.stateService.current);
    // default to home
    router.urlRouter.otherwise('/home');

    //transition watch
    router.transitionService.onEnter({}, (trans, state) => {
        // ...
        //console.log(trans, state);
    });
};

class App extends Component {
    render() {
        return (
            <UIRouter plugins={[hashLocationPlugin]}
                      states={states}
                      config={configRouter}>
                <div>
                    <AppBar position="static"
                            style={{backgroundColor: green[500]}} />
                    <UIView />
                </div>
            </UIRouter>
        );
    };
}

export default App;