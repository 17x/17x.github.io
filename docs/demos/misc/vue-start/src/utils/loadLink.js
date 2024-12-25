export default href => new Promise((resolve, reject) => {
    const link = document.createElement('script');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
});