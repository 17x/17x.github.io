import React, {Component} from 'react';
import ReactSwipe from 'react-swipe';
import PropTypes from 'prop-types';
import {propTypes} from 'react-decoration';

@propTypes({
    carouselList: PropTypes.array.isRequired
})
export default class Carousel extends Component {
    render() {
        return <ReactSwipe className="carousel" swipeOptions={{continuous: false}}>
            {
                this.props.carouselList.map((val, index) =>
                    <img key={index} src={val.image_path} alt=""/>
                )
            }
        </ReactSwipe>;

    }
}