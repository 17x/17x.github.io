import React, {Component} from 'react';
import {Route, Redirect} from 'react-router';
import {propTypes} from 'react-decoration';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

@withRouter
@connect(({Authentication}) => ({Authentication}))
@propTypes({
    Authentication: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    PrivateComponent: PropTypes.func.isRequired
})
export default class PrivateRoute extends Component {
    render() {
        const {path, Authentication, PrivateComponent} = this.props;
        const AUTHENTICATED = Authentication.isAuthenticated;

        // console.log('PrivateRoute  :  ', this);
        return <Route path={path}
                      render={props =>
                          AUTHENTICATED
                              ? <PrivateComponent {...props} />
                              : <Redirect to={{
                                  pathname: '/login',
                                  state: {from: props.location}
                              }} />

                      }
        />;
    }
}