import React, {Component} from 'react';
import {showNavFoot, hideNavFoot} from 'actions/NavFooter';

export function hideFootWhileEnter(WrappedComponent) {
    return class extends Component {
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
    };

}

export function showFootWhileEnter(WrappedComponent) {
    return class extends Component {
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
    };
}