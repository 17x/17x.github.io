import React, {Component} from 'react';

import Button from 'material-ui/Button';
import {connect} from 'react-redux';

import {setTitle} from '../../actions';
import GlobalHeaderSecond from '../global/GlobalHeaderSecond';

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

        /*  let {transition} = this.props;

          // access the state we navigated from
          let prevState = transition.from();
          let prevParams = transition.params('from');

          // navigate to the state
          transition.router.stateService.go(prevState, prevParams);
          */
        return <div className="favorites">
            <GlobalHeaderSecond customizeArea={
                <div>manager</div>
            }>

            </GlobalHeaderSecond>
            <Button raised>hello favorites State!</Button>
            <p style={{height: 2000}}>120</p>

        </div>;
    }
}

const FavoritesApp = connect()(Favorites);

// export default withStyles(homeStyles)(HomeApp);

export default FavoritesApp;