import React from 'react';

const Todo = (props) => {
    const style = {marginRight: '5px'};
    const styleBlue = {color: 'blue'};
    const styleCursor = {cursor: 'pointer'};
    const styleChild = {'&': {fontSize: '20px'}};
    return <li>
        <span style={{...style, ...styleChild}}>{props.todo.text}</span>
        <span style={{...style, ...styleBlue, ...styleCursor}} onClick={
            () => props.handleClick('toggle', props.todo.id)
        }>
            {props.todo.complete ? 'active' : 'complete'}
        </span>
        <span style={{...style, ...styleCursor}} onClick={
            () => props.handleClick('delete', props.todo.id)
        }>delete</span>
    </li>;
};

export default Todo;