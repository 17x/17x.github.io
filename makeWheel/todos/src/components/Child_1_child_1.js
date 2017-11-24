import React from 'react';
import {connect} from 'react-redux';
import {increment, alertMsg} from '../actions';

let Child_1_child_1 = ({msg, dispatch}, ...args) => {
    //console.log('Child_1_child_1', msg);
    const style = {
        border: '1px solid blue',
        padding: '10px',
        margin: '10px 0'
    };

    return <div style={style}>
        <h3>here is App's child_1's child 1</h3>
        <button type="button"
                onClick={() => {dispatch(increment());}}>
            Increment
        </button>
        <br />
        <button type="button"
                onClick={() => {dispatch(alertMsg(new Date().toLocaleString()));}}>
            alertMsg
        </button>
        <p>ALERT MSG IS : {msg}</p>
    </div>;
};

const mapStateToProps = state => {
    return {
        msg: state.altMsg
    };
};

Child_1_child_1 = connect(mapStateToProps)(Child_1_child_1);

export default Child_1_child_1;