```bash
function loadScript(src) {
 return new Promise(function(resolve, reject) {
   const script = document.createElement('script');
   script.async = true;
   script.src = src;
   script.onload = resolve;
   script.onerror = reject;
   document.head.appendChild(script);
 });
}

// Lazy load the polyfill if necessary.
if (!supportsShadowDOMV1) {
  loadScript('/bower_components/shadydom/shadydom.min.js')
    .then(e => loadScript('/bower_components/shadycss/shadycss.min.js'))
    .then(e => {
      // Polyfills loaded.
    });
} else {
  // Native shadow dom v1 support. Go to go!
}
```