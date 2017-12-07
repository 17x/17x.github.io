import React, {Component} from 'react';
import {UISrefActive, UISref, UIView} from '@uirouter/react';
import axios from 'axios';
import qs from 'qs';

import Button from 'material-ui/Button';
import {green} from 'material-ui/colors';
import {Tabs, Tab} from 'material-ui';
import {connect} from 'react-redux';

import {withStyles} from 'material-ui/styles';

function TabContainer({children, dir}) {
    return (
        <div dir={dir} style={{padding: 8 * 3}}>
            {children}
        </div>
    );
}

const styles = theme => ({
    flex: {
        flex: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    active: {
        backgroundColor: '#dfdfdf'
    }
});

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

    styles = {
        backgroundColor: green[500],
        color: '#fff'
    };
    handleChange = (event, activeTabIndex) => {
        this.setState({activeTabIndex});
    };

    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://192.168.1.13:8090/mock/new/xg.json'
        }).then(function (res) {
            console.log(res.data);
        });
    }

    render() {

        const homeItems = [{text: '新书'}, {text: '热门'}, {text: '推荐'}, {text: '分类'}, {text: '标签'}, {text: '发现'}];
        const {activeTabIndex,classes} = this.state;
        console.log(classes);
        const homeItemsStyle = {
            width: '12.4%'
        };
        return <div className="home">

            <Tabs fullWidth={true}
                  scrollButtons="auto"
                  value={activeTabIndex}
                  onChange={this.handleChange}>
                {homeItems.map((val, index) =>
                    <Tab label={val.text} key={index} style={homeItemsStyle} />
                )}
            </Tabs>
            {activeTabIndex === 0 && <TabContainer>Item One</TabContainer>}
            {activeTabIndex === 1 && <TabContainer>Item Two</TabContainer>}
            {activeTabIndex === 2 && <TabContainer>Item 2</TabContainer>}
            {activeTabIndex === 3 && <TabContainer>Item 3</TabContainer>}
            {activeTabIndex === 4 && <TabContainer>Item 4</TabContainer>}
            {activeTabIndex === 5 && <TabContainer>Item 5</TabContainer>}
            <Button raised style={this.styles} onClick={this.handlerClick}>increment</Button>

        </div>;
    }
}

const filterHome = connect()(Home);

export default withStyles(styles)(Home);