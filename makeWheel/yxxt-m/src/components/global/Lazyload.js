import React, {Component} from 'react';
import on from 'utils/on';
import off from 'utils/off';

class LazyLoad extends Component {
    constructor(props) {
        super(props);
        this.handleScrollLazyLoad = this.handleScrollLazyLoad.bind(this);
    }

    state = {
        inViewport: false,
        domRef: null
    };

    handleScrollLazyLoad() {
        if ((this.props.container.offsetHeight - this.domRef.getBoundingClientRect().top) > 0) {
            this.setState({inViewport: true});
            off(window, 'scroll', this.handleScrollLazyLoad, true);
        }
    }

    componentDidMount() {
        on(window, 'scroll', this.handleScrollLazyLoad, true);
        //首次运行
        this.handleScrollLazyLoad();
    }

    componentWillUnmount() {
        off(window, 'scroll', this.handleScrollLazyLoad, true);
    }

    render() {
        return (
            <div ref={dom => this.domRef = dom} className='lazyLoad-container'>
                {this.state.inViewport && this.props.children}
            </div>
        );
    }
}

export default LazyLoad;