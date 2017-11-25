import {connect} from 'react-redux';
import TodoList from '../components/TodoList';

const filterTodos = (todos, filter) => {
    // console.log(todos, filter);
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter(val => val.complete);
        case 'SHOW_COMPLETE':
            return todos.filter(val => !val.complete);
        default:
            return 'error';
    }
};

const mapStateToProps = (state, ownProps) => ({
    todos: filterTodos(state.todos, state.filter)
});

const FilterTodoList = connect(
    mapStateToProps
)(TodoList);

export default FilterTodoList;


