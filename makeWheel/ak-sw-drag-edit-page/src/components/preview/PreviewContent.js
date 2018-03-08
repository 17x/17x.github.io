import React, {Component} from 'react';
import PreviewContentItem from './PreviewContentItem';
import FooterItem from '../models/FooterItem';
import PropTypes from 'prop-types';
import {propTypes} from 'react-decoration';

@propTypes({
    template: PropTypes.object.isRequired
})
export default class PreviewContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.props.template);
        const template = this.props.template.data;
        const footWidth = (100 / template.footList.length) + '%';
        //console.log(template);
        return <div className="preview-viewport">
            <div className="preview-viewport-content">
                {
                    template.viewportList.map((val, index) => <PreviewContentItem key={index} attr={val} />)
                }
            </div>
            <div className="preview-viewport-footer">
                {template.footList.map((val, index) =>
                    <FooterItem key={index} attr={{...val, width: footWidth}} />
                )}
            </div>
            <div className="preview-viewport-mask">

            </div>
        </div>;
    }
}