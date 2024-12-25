import React, {Component} from 'react';
import update from 'immutability-helper';
import './style.scss';

export default class Navigation extends Component {
    state = ({
        navList: [
            {text: 'home', alias: 'index'},
            {text: 'settings', alias: 'settings'},
            {text: 'about', alias: 'about'}
        ]
    });

    componentDidMount() {
        let {navList} = this.state,
            curPageIndexOfList = NaN,
            curPage = location.pathname.replace('/', '');

        //in home page
        if (curPage.length <= 0) {
            curPageIndexOfList = 0;
        } else {
            // other pages
            curPage = curPage.split('.')[0];
            curPageIndexOfList = navList.findIndex((val) => val.alias === curPage);

        }

        // console.log(curPageIndexOfList, curPage);

        this.setState({
            navList: update(
                navList, {[curPageIndexOfList]: {isActive: {$set: true}}}
            )
        });

    }

    render() {
        return <div className='navigation'>
            <ul>
                {
                    this.state.navList.map(
                        (val, index) => <li key={index} className={val.isActive ? 'active' : ''}>
                            <a href={`./${val.alias}.html`}>{val.text}</a>
                        </li>
                    )
                }
            </ul>
        </div>;
    }
}