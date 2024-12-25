import typeCheck from './typeCheck';

const css = (dom, style) => {
    for (let i in style) {
        if (style.hasOwnProperty(i)) {
            switch (i) {
                case 'width':
                case 'height':
                case 'top':
                case 'right':
                case 'bottom':
                case 'left':
                case 'borderWidth':
                    const typeofValue = typeCheck(style[i]);

                    switch (typeofValue) {
                        case 'Null':
                        case 'Undefined':
                            break;
                        case 'Number':
                            dom.style[i] = style[i] + 'px';
                            break;
                        case 'String':
                            dom.style[i] = style[i];
                            break;
                        default:
                            throw new Error('unsupported value');
                    }

                    break;

                default:
                    dom.style[i] = style[i];
            }
        }
    }
};

export default css;