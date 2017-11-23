import React from 'react';
import IncrementBtn from '../components/IncrementBtn';
import DecrementBtn from '../components/DecrementBtn';
import ChangeBtn from '../components/ChangeBtn';

const Child_1 = ({count,onIncrementClick,onDecrementClick,onChangeClick}) => {
    console.log('count is', count);
    return (<div>
        <p>Here is App's child 1</p>
        <p>Count : {count}</p>
        <IncrementBtn onClick={()=>onIncrementClick()}/>
        <DecrementBtn onClick={()=>onDecrementClick()}/>
        <ChangeBtn onClick={()=>onChangeClick(998)}/>
    </div>);
};

export default Child_1;