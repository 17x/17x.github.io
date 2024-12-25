import React, {Component} from 'react';
import AddTodo from './AddTodo';
import FilterTodoList from '../container/FilterTodoList';
import FilterTodo from './FilterTodo';

class App extends Component {
    constructor(porps) {
        super(porps);
    }

    render() {
        return <div>
            <h1>TODO APP</h1>
            <AddTodo />
            <FilterTodoList />
            <FilterTodo />
        </div>;
    }
}

export default App;