import React, {Component} from 'react';
import {propTypes} from 'react-decoration';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {showFootWhileEnter} from 'HOC/FootToggle';
import './style.scss';

@connect()
@propTypes({
    dispatch: PropTypes.func.isRequired
})
@showFootWhileEnter
export default class Home extends Component {

    componentDidMount() {
        axios.get('./mock/home/homeData.json').then(resp => {
            console.log(resp);
        });
    }

    render() {
        const dataLoaded = this.state;

        // skeleton
        if (!dataLoaded) {
            return <div id="home" className="skeleton">
                <header></header>
                <section>
                    {
                        new Array(2).fill([1, 2, 3, 4, 5]).map((val, index) => <div key={index}>
                            {
                                val.map((val2, index2) => <div key={index2}></div>)
                            }
                        </div>)
                    }
                </section>
                <div className="spinner"></div>
            </div>;
        }

        return <div id="home">
            <header>
                <div>
                    <div>
                        <i className="material-icons md-48">place</i>
                        <span>上海市人民政府</span>
                        <i className="material-icons md-24">arrow_drop_down</i>
                    </div>
                </div>
            </header>
            Home Page
        </div>;
    }
}