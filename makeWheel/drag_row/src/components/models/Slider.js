import React, {Component} from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';

class SliderComp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {config, items} = this.props.slide,
            {sliderDot, sliderClass} = this.props.classes,
            slideStyle = {width: '100%', height: '100%'},
            imgStyle = {width: '100%', height: '100%'};

        let settings = {
            className: sliderClass,
            dots: true,
            dotsClass: 'slick-dots ' + sliderDot,
            infinite: true,
            speed: 200,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            swipe: false,
            adaptiveHeight: false,
            ...config
        };
        //console.log(settings);

        return (
            <Slider {...settings}>
                {items.map((val, index) =>
                    <div key={index}
                         style={slideStyle}>
                        <img style={imgStyle}
                             src={val.img}
                             alt="" />
                    </div>
                )}
            </Slider>
        );
    }
}

export default SliderComp;