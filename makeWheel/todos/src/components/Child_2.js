import React from 'react';
import IncrementBtn from '../components/IncrementBtn';
import DecrementBtn from '../components/DecrementBtn';
import ChangeBtn from '../components/ChangeBtn';
import {changeCountTo, decrement, increment} from '../actions';

const Child_2 = ({count, dispatch}) => {
    const style = {
        border: '1px solid green',
        padding: '20px',
        marginBottom: '20px'
    };

    return (<div style={style}>
        <h2>Here is App's child 2</h2>
        <p>Count : {count}</p>
        <IncrementBtn onClick={() => dispatch(increment())} />
        <DecrementBtn onClick={() => dispatch(decrement())} />
        <ChangeBtn onClick={(a) => dispatch(changeCountTo(a))} />
    </div>);
};

export default Child_2;