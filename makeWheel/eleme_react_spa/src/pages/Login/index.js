import React, {Component} from 'react';
import {connect} from 'react-redux';
import {propTypes} from 'react-decoration';
import {showNavFoot, hideNavFoot} from 'actions/NavFooter';

// todo

// write a HOC to implement : while enter Component hide the footer
// while leave Component show the footer

// write a HOC to implement for all private route
const mapStateToProps = ({ShowNavHead}) => ({ShowNavHead});
@connect(mapStateToProps)
@propTypes({
    dispatch: PropTypes.func.isRequired
})
export default class Login extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.props.dispatch(showNavFoot());
    }

    componentDidMount() {
        this.props.dispatch(hideNavFoot());
    }

    render() {
        return <div className="Login">
            Login page
        </div>;
    }
}