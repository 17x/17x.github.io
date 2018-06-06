export default (obj, eventName, func, isBubble = false) => {
    obj.removeEventListener(eventName, func, isBubble);
};