import React, {Component} from 'react';
import {propTypes} from 'react-decoration';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Carousel from 'components/Global/Carousel';
import {showFootWhileEnter} from 'HOC/FootToggle';
import elemeImage_hash from 'utils/elemeImage_hash.js';
import './style.scss';

@connect()
@propTypes({
    dispatch: PropTypes.func.isRequired
})
@showFootWhileEnter
export default class Home extends Component {
    state = ({
        dataLoaded: false,
        carouselList: [],
        sections: [],
        restaurants: []
    });

    componentDidMount() {
        // todo 添加功能 1000 延迟骨架图消失
        axios.get('./mock/home/banner.json').then(resp => {
            // console.log(resp);
            const curMap = resp.data[0].entries.map(val => ({
                // console.log(elemeImage_hash(val.image_hash));
                ...val,
                image_path: elemeImage_hash(val.image_hash)
            }));

            this.setState({
                dataLoaded: true,
                carouselList: curMap
            });
        });

        axios.get('./mock/home/entries.json').then(resp => {
            this.setState({
                dataLoaded: true,
                sections: resp.data
            });
        });

        axios.get('./mock/home/restaurants.json').then(resp => {
            this.setState({
                dataLoaded: true,
                restaurants: resp.data
            });
        });
        console.log('componentDidMount');
    }

    render() {
        // skeleton
        if (!this.state.dataLoaded) {
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
        const {carouselList} = this.state;

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
            <p>
                searchBox
            </p>
            {carouselList.length > 0 && <Carousel carouselList={carouselList}/>}
            Home Page
        </div>;
    }
}