import React from 'react';
import {connect} from 'react-redux';
import {addTodo} from '../actions';

let AddTodo = ({dispatch}) => {
    let input;
    return <div>
        <input type="text" ref={
            node => input = node
        } />
        <button type="button" onClick={
            () => {
                dispatch(addTodo(input.value));
            }
        }>Add a todo
        </button>
    </div>;
};
AddTodo = connect()(AddTodo);
export default AddTodo;