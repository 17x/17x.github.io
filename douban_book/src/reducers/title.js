export default (title = 'home', action) => {
    switch (action.type) {
        case 'CHANGE_TITILE':
            return !action.title;
        default:
            return title;
    }
}