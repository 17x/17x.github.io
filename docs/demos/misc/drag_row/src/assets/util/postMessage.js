import on from 'utils/on';
import off from 'utils/off';

export default () => new Promise((resolve) => {
    let onMessage = event => {
        /* 只接受父级window的消息 */
        //console.log('event', event);
        if (event.source === window.parent) {
            if (event.data.suc) {
                resolve(event.data);
                off(window, 'message', onMessage);
            } else if (event.data.suc === false) {
                off(window, 'message', onMessage);
            }
        }

    };

    //建立新事件监听
    on(window, 'message', onMessage);

    //调用父级事件
    setTimeout(() => {
        window.parent.mediaPicker({multi: 1});
    }, 0);
});





