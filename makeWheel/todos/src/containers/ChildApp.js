import {connect} from 'react-redux';
import * as actions from '../actions';
import Child_1 from '../components/Child_1';
import Child_2 from '../components/Child_2';

const mapStateToProps = (state, ownProps) => {
    return {
        count: state.counter,
        msg: state.altMsg
    };
};

const Child_1App = connect(
    mapStateToProps
)(Child_1);

const Child_2App = connect(
    mapStateToProps
)(Child_2);

export {Child_1App, Child_2App};
