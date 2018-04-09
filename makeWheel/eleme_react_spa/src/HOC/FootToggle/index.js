import React, {Component} from 'react';
import {connect} from 'react-redux';
import {showNavFoot, hideNavFoot} from 'actions/NavFooter';

export function hideFootWhileEnter(WrappedComponent) {
    @connect()
    class HideFootWhileEnterComp extends Component {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            this.props.dispatch(hideNavFoot());
        }

        componentWillUnmount() {
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return HideFootWhileEnterComp;
}

export function showFootWhileEnter(WrappedComponent) {
    @connect()
    class HideFootWhileEnterComp extends Component {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            this.props.dispatch(showNavFoot());
        }

        componentWillUnmount() {
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return HideFootWhileEnterComp;
}