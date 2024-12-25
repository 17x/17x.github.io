import React, {Component} from 'react';
import './style.scss';

class RichTextPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.domRef.innerHTML = this.props.data.detail;
    }

    handleBackClick() {
        this.props.onHide();
    }

    render() {
        return <div className='richTextPage'>
            <header className='richTextPage-header'>
                <a onClick={() => this.handleBackClick()}>返回</a>
                <h2 className='textEllipsis'>{this.props.data.title}</h2>
            </header>
            <div ref={dom => this.domRef = dom} className='richTextPage-content'></div>
        </div>;
    }
}

export default RichTextPage;