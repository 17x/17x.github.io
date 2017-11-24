export const counter = (count = 0, action) => {
    //console.log('counter: ', count, action);
    switch (action.type) {
        case 'INCREMENT':
            return count += 1;
        case 'DECREMENT':
            return count -= 1;
        case 'CHANGE':
            return action.count;
        default:
            return count;
    }
};