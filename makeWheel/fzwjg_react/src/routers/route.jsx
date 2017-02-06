import React from 'react'
import { Router,Route,Link, hashHistory,IndexRoute,Redirect } from 'react-router'

import App from '../components/App.jsx'

// Enter and Leave Hooks
function alt(){
    console.log(999)
}

function errorLoading(err) {
  console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
  return (module) => cb(null, module.default);
}

export default () => <Router history={hashHistory} >
    <Route path="/" getComponent={ function(location, cb){System.import('../components/App.jsx').then(loadRoute(cb)).catch(errorLoading)}}>
        <IndexRoute getComponent={ function(location, cb){System.import('../views/home/index.jsx').then(loadRoute(cb)).catch(errorLoading)}}>            
        </IndexRoute>
        <Route path="/about" getComponent={function(location, cb){System.import('../views/about/index.jsx').then(loadRoute(cb)).catch(errorLoading)}}/>
        <Route path="/contact" getComponent={function(location, cb){System.import('../views/contact/index.jsx').then(loadRoute(cb)).catch(errorLoading)}}/>
    </Route>
</Router>;
