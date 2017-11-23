export  const counter = (count=0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return count++;
        case 'DECREMENT':
            return count--;
        case 'CHANGE':
            return action.count;
        default:return count;
    }
};