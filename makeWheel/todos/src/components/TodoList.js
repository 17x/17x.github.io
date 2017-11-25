import React, {Component} from 'react';
import Todo from './Todo';
import {toggleTodo, deleteTodo} from '../actions';

class TodoList extends Component {
    constructor(props) {
        super(props);
    }

    handleClick(type, id) {
        switch (type) {
            case 'toggle':
                this.props.dispatch(toggleTodo(id));
                break;
            case 'delete':
                this.props.dispatch(deleteTodo(id));
                break;
            default:
                throw new Error('Need type and id');
        }
    }

    render() {
        console.log(this.props);
        return <ul id="TodoList">
            {this.props.todos.map((val, index) =>
                <Todo key={index} todo={val} handleClick={(type, id) => this.handleClick(type, id)} />
            )}
        </ul>;
    }
}

export default TodoList;