export default (el, selector) => {
    if (!document.documentElement.contains(el)) return null;

    if (!Element.prototype.matches)
        Element.prototype.matches = Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;

    do {
        if (el.matches(selector)) return el;
        el = el.parentElement || el.parentNode;

    } while (el !== null && el.nodeType === 1);

    return null;
};