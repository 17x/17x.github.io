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
            // {sliderDot, sliderClass} = this.props.classes,
            slideStyle = {width: '100%', height: '100%'},
            imgStyle = {width: '100%', height: '100%'};

        let settings = {
            // className: sliderClass,
            dots: true,
            easing:'linear',
            cssEase:'linear',
            // dotsClass: 'slick-dots ' + sliderDot,
            // useCSS: false,
            swipeToSlide: true,
            speed: 200,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            // swipe: false,
            adaptiveHeight: false,
            ...config
        };
        //console.log(settings);

        return (
            <Slider {...settings}>
                {items.map((val, index) =>
                    <a key={index}
                       href={val.url ? val.url : uns}
                       style={slideStyle}>
                        <img style={imgStyle}
                             src={val.img}
                             alt="" />
                    </a>
                )}
            </Slider>
        );
    }
}

export default SliderComp;