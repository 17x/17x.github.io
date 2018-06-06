export default (obj, eventName, func, isBubble = false) => {
    obj.addEventListener(eventName, func, isBubble);
};