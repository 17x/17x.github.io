import React, {Component} from 'react';
import {connect} from 'react-redux';
import {propTypes} from 'react-decoration';
import {Redirect} from 'react-router';
import {logIn} from 'actions/Authentication';
import PropTypes from 'prop-types';
import {hideFootWhileEnter} from 'HOC/FootToggle';

const mapStateToProps = ({ShowNavHead, Authentication}) => ({ShowNavHead, Authentication});
@connect(mapStateToProps)
@propTypes({
    Authentication: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
})
@hideFootWhileEnter
export default class Login extends Component {
    constructor(props) {
        super(props);
        console.log(this);
    }

    state = ({
        btnClicked: false
    });

    handleSubmitLogin = (event) => {
        event.preventDefault();
        this.setState({btnClicked: true});

        // todo  saveLoginData();
        this.props.dispatch(logIn({authData: {nickName: 'yeliangchen'}}));
    };

    /*componentDidMount() {
        this.props.dispatch(hideNavFoot());
    }*/

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}};
        const {isAuthenticated} = this.props.Authentication;

        // console.log('login render');
        // console.log(isAuthenticated);

        const {btnClicked} = this.state;
        if (isAuthenticated) {
            return <Redirect to={from} />;
        }

        return <div className="login">
            Login page
            <br />
            <form onSubmit={this.handleSubmitLogin}>
                <input type="text" name='userName' />
                <input type="text" name='pwd' />
                <input type='submit'
                       disabled={btnClicked}
                       value={btnClicked ? 'waiting' : 'log in'} />
            </form>
        </div>;
    }
}