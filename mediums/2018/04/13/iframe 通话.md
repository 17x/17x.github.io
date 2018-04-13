### 

```
import on from 'utils/on';
import off from 'utils/off';

export default () => new Promise((resolve) => {
    let onMessage = event => {
        /* 只接受父级window的消息 */

        if (event.source === window.parent) {
            if (event.data.suc) {
                resolve(event.data);
                //父级传回成功
                off(window, 'message', onMessage);
            } else if (event.data.suc === false) {
                //父级传回失败
                off(window, 'message', onMessage);
            }
        }

    };

    //建立新事件监听
    on(window, 'message', onMessage);

    //调用父级事件
    //延时处理父级iframe js报错导致本处promise reject
    setTimeout(() => {
        window.parent.mediaPicker({multi: 1});
    }, 0);
});

```



