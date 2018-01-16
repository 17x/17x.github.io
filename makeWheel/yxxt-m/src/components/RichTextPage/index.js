import React, {Component} from 'react';
import './style.scss';

class RichTextPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.domRef.innerHTML = this.props.data;
    }

    handleBackClick() {
        this.props.onHide();
    }

    render() {
        return <div className='richTextPage'>
            <header className='richTextPage-header'>
                <a onClick={() => this.handleBackClick()}>关闭</a>
                <h2>详情</h2>
            </header>
            <div ref={dom => this.domRef = dom} className='richTextPage-content'></div>
        </div>;
    }
}

export default RichTextPage;