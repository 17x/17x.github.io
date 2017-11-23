import {connect} from 'react-redux';
import * as actions from '../actions';
import Child_1 from '../components/Child_1';

const mapStateToProps = state => ({
    count: state
});

const mapDispatchToProps = {
    onIncrementClick: actions.increment,
    onDecrementClick: actions.decrement,
    onChangeClick: actions.changeCountTo
};

const Child_1App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Child_1);

export default Child_1App;
