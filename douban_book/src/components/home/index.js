import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';

import {Tab, Tabs} from 'material-ui';
import {withStyles} from 'material-ui/styles';

import HomeTab1 from './tab1';
import HomeTab2 from './tab2';

import homeStyles from './styles';
import {setTitle} from '../../actions';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    handlerClick = () => {
    };

    state = ({
        activeTabIndex: 0
    });

    handleChange = (event, activeTabIndex) => {
        this.setState({activeTabIndex});
    };

    componentDidMount() {
        this.props.dispatch(setTitle('Home'));

        axios({
            method: 'GET',
            url: './mock/new/xg.json'
        }).then((res) => this.setState({tab1Data1: res.data}));

        axios({
            method: 'GET',
            url: './mock/new/fxg.json'
        }).then((res) => this.setState({tab1Data2: res.data}));
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

                {homeItems.map((val, index) =>
                    <Tab label={val.text}
                         key={index}
                         className={classes.homeTabStyle
                         + ' '
                         + (activeTabIndex === index ? classes.homeTabStyleActive : '')} />
                )}
            </Tabs>
            <SwipeableViews animateHeight={true}>
                <HomeTab1 tab1Data1={this.state.tab1Data1} tab1Data2={this.state.tab1Data2}>Item One</HomeTab1>
                <HomeTab2>Item Two</HomeTab2>
                <HomeTab2>Item 2</HomeTab2>
                <HomeTab2>Item 3</HomeTab2>
                <HomeTab2>Item 4</HomeTab2>
                <HomeTab2>Item 5</HomeTab2>
            </SwipeableViews>

        </div>;
    }
}

const HomeApp = connect()(Home);

export default withStyles(homeStyles)(HomeApp);