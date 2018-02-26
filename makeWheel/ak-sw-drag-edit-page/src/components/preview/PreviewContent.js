import React, {Component} from 'react';
import PreviewContentItem from './PreviewContentItem';
import FooterItem from '../models/FooterItem';

export default class PreviewContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {template} = this.props;
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