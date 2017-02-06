'use strict';

import React from 'react';
import {render} from 'react-dom';
import Root from './routers/route.jsx'
import './views/layout/style.scss'

render(
	<Root />,
	document.getElementById('container')
);

if (module.hot) {
  module.hot.accept('pages/routes', () => {
    const NewRoot = require('pages/routes').default;

    render(
      <NewRoot />,
      document.getElementById('root')
    );
  });
}
