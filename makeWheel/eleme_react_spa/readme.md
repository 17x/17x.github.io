### http2:
refer:
https://www.polymer-project.org/2.0/toolbox/prpl#app-entrypoint

### 考虑过的 iframe 与 shadow-dom(polyfill)
### service work

### IndexedDB

### check webp support in browser

```
function canUseWebP() {
    var elem = document.createElement('canvas');

    if (!!(elem.getContext && elem.getContext('2d'))) {
        // was able or not to get WebP representation
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }
    else {
        // very old browser like IE 8, canvas not supported
        return false;
    }
}
```