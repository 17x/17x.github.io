import React from 'react';
import IncrementBtn from '../components/IncrementBtn';
import DecrementBtn from '../components/DecrementBtn';
import ChangeBtn from '../components/ChangeBtn';
import Child_1_child_1 from '../components/Child_1_child_1';
import {increment, decrement, changeCountTo} from '../actions';

const Child_1 = ({count, dispatch}) => {
    //console.log('Child_1', dispatch);
    const style = {
        border: '1px solid green',
        padding: '20px',
        marginBottom: '20px'
    };

    return (<div style={style}>
        <h2>Here is App's child 1</h2>
        <p>Count : {count}</p>
        <IncrementBtn onClick={() => dispatch(increment())} />
        <DecrementBtn onClick={() => dispatch(decrement())} />
        <ChangeBtn onClick={(a) => dispatch(changeCountTo(a))} />
        <Child_1_child_1 />
    </div>);
};

export default Child_1;