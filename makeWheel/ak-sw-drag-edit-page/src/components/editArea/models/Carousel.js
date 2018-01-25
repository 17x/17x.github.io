import React, {Component} from 'react';
import {connect} from 'react-redux';

import Model from './Model';

const basicStyle = ({
    display: 'block',
    width: 320,
    height: 160,
    border: '2px solid #dfdfdf',
    cursor: 'move',
    backgroundColor: '#fff',
    zIndex: 1000
});

class Carousel extends Model {
    constructor(props) {
        super(props);
    }

    state = ({
        modelType: 'carousel',
        classList: [],
        //应用样式
        applyStyle: {
            ...basicStyle,
            width: '100%'
        },
        // 显示样式
        styles: {
            ...basicStyle,
            lineHeight: '160px'
        },
        additionProps: {
            carousel: {
                config: {
                    dots: false
                },
                items: [
                    {
                        img: 'http://photo.wxyxpt.net/7b911ed757f55886213de40f90d3a232?p=0',
                        url: 'https://www.bing.com',
                        isRichTextPage: false,
                        richPageId: ''
                    },
                    {
                        img: 'http://photo.wxyxpt.net/1ef2551ffe667f69f1f3d7b317591ad9?p=0',
                        url: 'https://www.google.com',
                        isRichTextPage: false,
                        richPageId: ''
                    },
                    {
                        img: 'http://photo.wxyxpt.net/aab7a687e2f6e3a2e2c0e3ae489b21c7?p=0',
                        url: 'https://www.google.com',
                        isRichTextPage: false,
                        richPageId: ''
                    },
                    {
                        img: 'http://photo.wxyxpt.net/bd07d5e2e9ebb1b798bb4baacc2014a4?p=0',
                        url: 'https://www.google.com',
                        isRichTextPage: false,
                        richPageId: ''
                    }
                ]
            }
        }
    });

    componentDidMount() {}

    render() {
        return <a ref={model => this.domRef = model}
                  data-pseudo-title='模板-轮播图'
                  style={this.state.styles}
                  onMouseDown={(e) => this.handleMouseDown(e)}
                  onClick={(e) => {e.preventDefault();}}
                  className={this.state.classList.join(' ')}>
        </a>;
    }
}

const mapStateToProps = ({viewportList}) => ({viewportList});
let CarouselComp = connect(mapStateToProps)(Carousel);

export default CarouselComp;