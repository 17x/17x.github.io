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

import GlobalHeader from '../global/GlobalHeader';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    handlerClick = () => {};

    state = ({
        activeTabIndex: 0
    });

    handleChange = (event, activeTabIndex) => {
        this.setState({activeTabIndex});
    };

    handleSwipeChangeIndex = (...args) => {
        // console.log(args);
        this.setState({activeTabIndex: args[0]});
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
                {text: 'Latest'},
                {text: 'Trending'},
                {text: 'recommend'},
                {text: 'Category'},
                {text: 'Tags'},
                {text: 'Explore'}
            ],
            {activeTabIndex, tab1Data1, tab1Data2} = this.state,
            {classes} = this.props;

        return <div className={'home ' + classes.homeStyle}>
            <GlobalHeader />
            <Tabs fullWidth={true}
                  scrollButtons="auto"
                  scrollable={true}
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
            <SwipeableViews
                index={activeTabIndex}
                onChangeIndex={(index, indexLatest, meta) => this.handleSwipeChangeIndex(index, indexLatest, meta)}
                ignoreNativeScroll
                animateHeight>
                <HomeTab1 tab1Data1={tab1Data1} tab1Data2={tab1Data2} />
                <HomeTab2 className={classes.swipeAbleViews}>Item 2</HomeTab2>
                <HomeTab2 className={classes.swipeAbleViews}>Item 3</HomeTab2>
                <HomeTab2 className={classes.swipeAbleViews}>Item 4</HomeTab2>
                <HomeTab2 className={classes.swipeAbleViews}>Item 5</HomeTab2>
                <HomeTab2 className={classes.swipeAbleViews}>Item 6</HomeTab2>
            </SwipeableViews>

        </div>;
    }
}

const HomeApp = connect()(Home);

export default withStyles(homeStyles)(HomeApp);