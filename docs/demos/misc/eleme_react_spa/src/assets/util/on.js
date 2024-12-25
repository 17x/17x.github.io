export default (dom, eventName, func, isBubble = false) => {
    dom.addEventListener(eventName, func, isBubble);
};