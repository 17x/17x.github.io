import {connect} from 'react-redux';
import TodoList from '../components/TodoList';

const mapStateToProps = (state, ownProps) => ({
    todos: state.todos
});

const FilterTodoList = connect(
    mapStateToProps
)(TodoList);

export default FilterTodoList;


