import React, {Component} from 'react';

import AddTodo from './AddTodo';
import FilterApp from '../containers/FilterTodoList';
import Footer from '../components/Footer';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const style = {fontWeight: 700};
        return <div style={style}>
            <h1>my App112</h1>
            <AddTodo />
            <p>
                <span>name </span>
                <span>state </span>
                <span>delete </span>
            </p>
            <FilterApp />
            <Footer />
        </div>;
    }
}

export default App;
