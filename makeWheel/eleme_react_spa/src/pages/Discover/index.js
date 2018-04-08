import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const mapStateToProps = ({ShowNavHead}) => ({ShowNavHead});
// @withRouter
@connect(mapStateToProps)
class Discover extends Component {
    render() {
        return <div className="About">
            Discover page
        </div>;
    }
}

export default Discover;