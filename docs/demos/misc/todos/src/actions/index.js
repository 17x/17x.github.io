let todoId = 0;

export const addTodo = text => ({
    type: 'ADD_TODO',
    id: todoId++,
    complete: false,
    text
});

export const deleteTodo = id => ({
    type: 'DELETE_TODO',
    id
});

export const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id
});

export const filterTodo = filter => ({
    type: 'FILTER_TODO',
    filter
});
