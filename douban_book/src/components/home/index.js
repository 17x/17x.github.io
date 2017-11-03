import React, {Component} from 'react';
import {UISrefActive, UISref, UIView} from '@uirouter/react';
import axios from 'axios';
import qs from 'qs';

import Button from 'material-ui/Button';
import {green} from 'material-ui/colors';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    state = ({
        homeMenuList: []
    });

    styles = {
        backgroundColor: green[500],
        color: '#fff'
    };

    componentDidMount() {
        //console.log('HOME componentDidMount');
        /*axios.post('getMenuByType.html', qs.stringify({id: 3}))
            .then(resp => {
                this.setState({
                    homeMenuList: resp.data.object
                });
            });*/
    }

    render() {
        return <div className="home">
            <Button raised style={this.styles}>hello world!</Button>
        </div>;
    }
}

export default Home;