export default (dom, eventName, func, isBubble = false) => {
    dom.removeEventListener(eventName, func, isBubble);
};