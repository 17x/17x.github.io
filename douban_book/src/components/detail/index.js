import React, {Component} from 'react';

import Button from 'material-ui/Button';
import {connect} from 'react-redux';

import {setTitle} from '../../actions';

class Detail extends Component {
    constructor(props) {
        super(props);
    }

    state = ({});

    componentDidMount() {
        this.props.dispatch(setTitle('Detail'));
    }

    render() {
        //console.log(this.props);
        return <div className="favorites">
            <Button raised>hello Detail State!</Button>
            <p style={{height: 2000}}>120</p>
        </div>;
    }
}

const DetailApp = connect()(Detail);

// export default withStyles(homeStyles)(HomeApp);

export default DetailApp;