import React from 'react';
import {connect} from 'react-redux';
import {addTodo} from '../actions';

let AddTodo = ({dispatch}) => {
    let input;

    return <div>
        <input type="text" ref={node => {input = node;}} />
        <button type="button" onClick={() => {
            if (!input.value.trim()) return;
            dispatch(addTodo(input.value));
            input.value = '';
            input.focus();
        }}>
            add
        </button>
    </div>;
};

AddTodo = connect()(AddTodo);
export default AddTodo;