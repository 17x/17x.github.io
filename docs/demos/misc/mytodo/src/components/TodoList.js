import React, {Component} from 'react';
import {toggleTodo, deleteTodo} from '../actions';
import Todo from '../components/Todo';

class TodoList extends Component {
    constructor(props) {
        super(props);
    }

    handleClick(type, id) {
        console.log(type, id);
        switch (type) {
            case 'toggle':
                this.props.dispatch(toggleTodo(id));
                break;
            case 'delete':
                this.props.dispatch(deleteTodo(id));
                break;
        }
    }

    render() {
        console.log(this.props.todos);
        return <ul>
            {
                this.props.todos.map((val, index) =>
                    <Todo key={index}
                          todo={val}
                          handleClick={(type, id) => this.handleClick(type, id)} />
                )
            }
        </ul>;
    }
};

export default TodoList;