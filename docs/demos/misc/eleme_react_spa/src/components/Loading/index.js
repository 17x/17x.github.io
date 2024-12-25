import React, {Component} from 'react';

export default class Loading extends Component {
    render() {
        if (this.props.error) {
            return <div>Error!</div>;
        } else if (this.props.pastDelay) {
            return <div>Loading...</div>;
        } else {
            return null;
        }
    }
}