'use strict';

import React from 'react';
import {render} from 'react-dom';
import {UIView} from 'ui-router-react';
import Root from './route.config';

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

render(
    <div>
        <span>navigation</span>
        <Root />
    </div>,
    document.getElementById('tgApp')
);

/*
if (module.hot) {
  module.hot.accept('pages/routes', () => {
    const NewRoot = require('pages/routes').default;

    render(
      <NewRoot />,
      document.getElementById('root')
    );
  });
}
*/