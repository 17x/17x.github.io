import React from 'react';
import loadLogin from 'bundle-loader?lazy!./login/index';
import loadHome from 'bundle-loader?lazy!./home/index';
import loadFavorites from 'bundle-loader?lazy!./favorites/index';
import loadDetail from 'bundle-loader?lazy!./detail/index';

import Bundle from './global/Bundle';

const Login = props => <Bundle load={loadLogin}>
    {(Login) => <Login {...props} />}
</Bundle>;

const Home = props => <Bundle load={loadHome}>
    {(Home) => <Home {...props} />}
</Bundle>;

const Favorites = props => <Bundle load={loadFavorites}>
    {(Favorites) => <Favorites {...props} />}
</Bundle>;

const Detail = props => <Bundle load={loadDetail}>
    {(Detail) => <Detail {...props} />}
</Bundle>;

let routes = [
    {mod: Home, needAuth: false, srefLink: '/'},
    {mod: Favorites, needAuth: true, srefLink: '/favorites'},
    {mod: Detail, needAuth: false, srefLink: '/detail'},
    {mod: Login, needAuth: false, srefLink: '/login'}
];

export default routes;