import React, {Component} from 'react';
import {propTypes} from 'react-decoration';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {showFootWhileEnter} from 'HOC/FootToggle';

@connect()
@propTypes({
    dispatch: PropTypes.func.isRequired
})
@showFootWhileEnter
export default class Profile extends Component {
    componentDidMount() {
    }

    render() {
        return <div className="Profile">
            Profile page
        </div>;
    }
}