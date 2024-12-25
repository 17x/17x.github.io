import React, {Component} from 'react';
import {connect} from 'react-redux';
import {propTypes} from 'react-decoration';
import PropTypes from 'prop-types';
import {showFootWhileEnter} from 'HOC/FootToggle';

@connect()
@propTypes({
    dispatch: PropTypes.func.isRequired
})
@showFootWhileEnter
export default class Order extends Component {
    componentDidMount() {
    }

    render() {
        return <div className="Order">
            Order page
        </div>;
    }
}