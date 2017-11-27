export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                {
                    id: action.id,
                    text: action.text,
                    complete: action.complete
                },
                ...state
            ];
        case 'TOGGLE_TODO':
            return state.map(val => val.id === action.id
                ? {...val, complete: !val.complete}
                : val
            );
        case 'DELETE_TODO':
            console.log(action.id);
            return state.filter(val => val.id !== action.id);
        default:
            return state;
    }
};