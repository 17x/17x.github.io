import React from 'react';

const Todo = (props) => {
    console.log('todo', props);
    const style = {
        color: 'blue'
    }, style2 = {
        cursor: 'pointer'
    };

    return <li>
        <span>{props.todo.text}</span>
        {
            props.todo.complete ?
                <span style={style} onClick={() => props.handleClick('toggle', props.todo.id)}> active</span> :
                <span style={style} onClick={() => props.handleClick('toggle', props.todo.id)}> complete</span>
        }
        <span style={style2} onClick={() => props.handleClick('delete', props.todo.id)}> &times;</span>
    </li>;
};

export default Todo;