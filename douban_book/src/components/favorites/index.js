import React, {Component} from 'react';
import {UISrefActive, UISref, UIView} from '@uirouter/react';

import Button from 'material-ui/Button';
import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles/index';

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
        console.log(this.props);
        return <div className="favorites">
            <Button raised>hello favoritesState!</Button>
        </div>;
    }
}

const FavoritesApp = connect()(Favorites);

// export default withStyles(homeStyles)(HomeApp);

export default FavoritesApp;