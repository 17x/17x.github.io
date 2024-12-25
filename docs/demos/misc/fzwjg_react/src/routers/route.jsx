import React from 'react';
import { Router,Route,Link, hashHistory,IndexRoute,Redirect } from 'react-router';

// Enter and Leave Hooks
function alt(){
    console.log(999);
}

function errorLoading(err) {
  console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
  return (module) => cb(null, module.default);
}

export default () => <Router history={hashHistory} >
    <Route path="/" getComponent={ function(location, cb){System.import('../components/App.jsx').then(loadRoute(cb)).catch(errorLoading);}}>
        <IndexRoute getComponent={ function(location, cb){System.import('../views/home.jsx').then(loadRoute(cb)).catch(errorLoading);}}>
        </IndexRoute>
        <Route path="/category" getComponent={function(location, cb){System.import('../views/category.jsx').then(loadRoute(cb)).catch(errorLoading);}}/>
        <Route path="/usercenter" getComponent={function(location, cb){System.import('../views/usercenter.jsx').then(loadRoute(cb)).catch(errorLoading);}}/>
        <Route path="/post" getComponent={function(location, cb){System.import('../views/post.jsx').then(loadRoute(cb)).catch(errorLoading);}}/>
    </Route>
</Router>;
