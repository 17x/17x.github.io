import React, {Component} from 'react';

const Child_2 = ({count}, args) => {
    return <div>
        <p>here is App's child 2</p>
        <p>Count : {{count}}</p>
    </div>;
};

export default Child_2;