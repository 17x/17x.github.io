'use strict';

import React from 'react'; 
import {render} from 'react-dom';
import Root from './routers/route.jsx'
import './views/layout/style.scss'
import './views/layout/fonts/iconfont.css'

/*window.onload = window.onresize = function() {
    document.getElementsByTagName('html')[0].style.fontSize = (document.documentElement || document.body).clientWidth / 25 + "px";
    // return arguments.callee;
};*/
const innerWidth = window.innerWidth;
window.addEventListener('load', function() {
	   document.documentElement.style.fontSize = innerWidth / 25 + 'px'
	   // window.unit = 100 * innerWidth / 320;
	   var e = document.createEvent('Event');
	   // e.initEvent('adjustReady', true, true);
	   // window.dispatchEvent(e);
});

window.addEventListener('orientationchange', function() {
    document.documentElement.style.fontSize = innerWidth / 25 + 'px'
});

render(
	<Root />,
	document.getElementById('container')
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