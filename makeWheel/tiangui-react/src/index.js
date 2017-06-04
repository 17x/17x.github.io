'use strict';

import React from 'react';
import {render} from 'react-dom';
import {UIView} from 'ui-router-react';
import Root from './route.config';
import { AppContainer } from 'react-hot-loader';

render(
  <AppContainer>
    <Root/>
  </AppContainer>,
  document.getElementById('tgApp')
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./route.config', () => {
    const NextApp = require('./route.config').default;

    render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.getElementById('tgApp')
    );
  });
}

/*
// import styles
import './styles/index.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
*/

/*REM事件*/
const setRootFontSize = () => document.documentElement.style.fontSize = window.innerWidth / 25 + 'px';
window.addEventListener('load', setRootFontSize);
window.addEventListener('resize', setRootFontSize);
window.addEventListener('orientationchange', setRootFontSize);

/*干掉微信顶部提供信息*/
document.body.addEventListener('touchmove', () => {
    event.preventDefault();
}, false);