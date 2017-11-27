import TodoList from '../components/TodoList';
import {connect} from 'react-redux';

const filterTodo = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter(val => val.complete);
        case 'SHOW_COMPLETE':
            return todos.filter(val => !val.complete);
    }
};

const mapStateToProps = (state) => ({
    todos: filterTodo(state.todos, state.filter)
});

let FilterTodoList = connect(mapStateToProps)(TodoList);
export default FilterTodoList;