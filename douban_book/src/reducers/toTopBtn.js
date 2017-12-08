export default (scroll_to_top_button = false, action) => {
    switch (action.type) {
        case 'SHOW_TO_TOP_BUTTON':
            return true;
        case 'HIDE_TO_TOP_BUTTON':
            return false;
        default:
            return scroll_to_top_button;
    }
}