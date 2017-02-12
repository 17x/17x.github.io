'use strict';

import React from 'react'; 
import {render} from 'react-dom';
import Root from './routers/route.jsx'
import './views/layout/style.scss'
import './views/layout/fonts/iconfont.css'

window.addEventListener('load', function() {
	   document.documentElement.style.fontSize = innerWidth / 25 + 'px'
	   var e = document.createEvent('Event');
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