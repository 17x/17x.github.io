import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({component: Component, authenticated, ...rest}) => (
    <Route {...rest} render={
        props => {
            console.log(props,authenticated);
            // console.log(rest);
            return (
                authenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }} />
                )
            );
        }
    } />
);

const mapStateToProps = ({authenticated}) => ({authenticated});
const PrivateRouteComp = connect(mapStateToProps)(PrivateRoute);
export default PrivateRouteComp;