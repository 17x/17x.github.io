import React, {Component} from 'react';

import Button from 'material-ui/Button';
import {connect} from 'react-redux';

import {setTitle} from '../../actions';

class Favorites extends Component {
    constructor(props) {
        super(props);
    }

    state = ({});

    componentDidMount() {
        this.props.dispatch(setTitle('Favorites'));
    }

    render() {
        //console.log(this.props);
        return <div className="favorites">
            <Button raised>hello favorites State!</Button>
            <p style={{height: 2000}}>120</p>

        </div>;
    }
}

const FavoritesApp = connect()(Favorites);

// export default withStyles(homeStyles)(HomeApp);

export default FavoritesApp;