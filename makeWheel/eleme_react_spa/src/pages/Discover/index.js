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
class Discover extends Component {
    componentDidMount() {
    }

    render() {
        return <div className="About">
            Discover page
        </div>;
    }
}

export default Discover;