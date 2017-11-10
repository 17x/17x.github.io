import React, {Component} from 'react';
import {UISrefActive, UISref, UIView} from '@uirouter/react';
import Button from 'material-ui/Button';
class favorites extends Component {
    constructor(props) {
        super(props);
    }

    state = ({});

    componentDidMount() {

    }

    render() {
        return <div className="favorites">
            <Button raised style={this.styles}>hello favoritesState!</Button>
        </div>;
    }
}

export default favorites;