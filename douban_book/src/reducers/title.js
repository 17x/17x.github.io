export default (title = 'Home', action) => {
    switch (action.type) {
        case 'SET_TITLE':
            return action.text;
        default:
            return title;
    }
}