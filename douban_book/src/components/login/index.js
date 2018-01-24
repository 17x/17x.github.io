import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';

import {setTitle} from '../../actions';
import GlobalHeaderSecond from '../global/GlobalHeaderSecond';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    state = {};

    handleClick = event => {
    };

    componentDidMount() {
        this.props.dispatch(setTitle('Login'));
    }

    render() {
        return <div className="login">
            <GlobalHeaderSecond />
            <Button raised>hello LoginApp !</Button>
            <p style={{height: 2000}}>LoginApp area</p>
        </div>;
    }
}

const LoginApp = connect()(Login);

// export default withStyles(homeStyles)(HomeApp);

export default LoginApp;