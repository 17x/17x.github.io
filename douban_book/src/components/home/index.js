import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
// import {UISrefActive, UISref, UIView} from '@uirouter/react';
// import qs from 'qs';
// import {green} from 'material-ui/colors';
import Button from 'material-ui/Button';
import {Tabs, Tab} from 'material-ui';
import {withStyles} from 'material-ui/styles';

import HomeTab1 from './tab1';
import homeStyles from './styles';
import {setTitle} from '../../actions';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    handlerClick = () => {
        // console.log(this)
        // this.props.dispatch(action);
    };

    state = ({
        homeMenuList: [],
        activeTabIndex: 0
    });

    handleChange = (event, activeTabIndex) => {
        this.setState({activeTabIndex});
    };

    componentDidMount() {
        this.props.dispatch(setTitle('Home'));

        axios({
            method: 'GET',
            url: 'http://192.168.1.13:8090/mock/new/xg.json'
        }).then((res) => {
            //console.log(res);
            this.setState({tab1Data: res.data.data});
        });
    }

    render() {
        const homeItems = [
                {text: '新书'},
                {text: '热门'},
                {text: '推荐'},
                {text: '分类'},
                {text: '标签'},
                {text: '发现'}
            ],
            {activeTabIndex} = this.state,
            {classes} = this.props;

        return <div className={'home ' + classes.homeStyle}>
            <Tabs fullWidth={true}
                  scrollButtons="auto"
                  value={activeTabIndex}
                  className={classes.homeTabsStyle}
                  onChange={this.handleChange}>

                {homeItems.map((val, index) => <Tab label={val.text}
                                                    key={index}
                                                    className={classes.homeTabStyle
                                                    + ' '
                                                    + (activeTabIndex === index ? classes.homeTabStyleActive : '')} />
                )}
            </Tabs>
            {activeTabIndex === 0 && <HomeTab1 tab1Data={this.state.tab1Data}>Item One</HomeTab1>}
            {activeTabIndex === 1 && <HomeTab1>Item Two</HomeTab1>}
            {activeTabIndex === 2 && <HomeTab1>Item 2</HomeTab1>}
            {activeTabIndex === 3 && <HomeTab1>Item 3</HomeTab1>}
            {activeTabIndex === 4 && <HomeTab1>Item 4</HomeTab1>}
            {activeTabIndex === 5 && <HomeTab1>Item 5</HomeTab1>}
            <Button raised onClick={this.handlerClick}>increment</Button>

        </div>;
    }
}

const HomeApp = connect()(Home);

export default withStyles(homeStyles)(HomeApp);