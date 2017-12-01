import React, {Component} from 'react';
import {UISrefActive, UISref, UIView} from '@uirouter/react';
import axios from 'axios';
import qs from 'qs';

import Button from 'material-ui/Button';
import {green} from 'material-ui/colors';

import {connect} from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    handlerClick = () => {
        // console.log(this)
        // this.props.dispatch(action);
    };

    state = ({
        homeMenuList: []
    });

    styles = {
        backgroundColor: green[500],
        color: '#fff'
    };

    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:8090/mock/new/xg.json'
        }).then(function (res) {
            console.log(res.data);
        });
    }

    render() {
        return <div className="home">
            <Button raised style={this.styles} onClick={this.handlerClick}>increment</Button>
            home
        </div>;
    }
}

const filterHome = connect()(Home);

export default filterHome;