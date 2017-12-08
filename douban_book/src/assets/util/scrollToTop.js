export default target => {
    let _timer = null;
    // target's maximum value is (pageHeight - clientHeight)
    target = target > (document.body.offsetHeight - window.innerHeight) ? (document.body.offsetHeight - window.innerHeight) : target;
    clearInterval(_timer);
    let speed = 0;
    _timer = setInterval(function () {
        if (f_scrollTop() !== target) {
            speed = (target - f_scrollTop()) / 3;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            window.scrollTo(0, f_scrollTop() + speed);
        } else {
            clearInterval(_timer);
        }
    }, 30);

    setTimeout(() => {
        clearInterval(_timer);
    }, 800);

    function f_scrollTop() {
        return f_filterResults(
            window.pageYOffset ? window.pageYOffset : 0,
            document.documentElement ? document.documentElement.scrollTop : 0,
            document.body ? document.body.scrollTop : 0
        );
    }

    // determine result
    function f_filterResults(n_win, n_docel, n_body) {
        let n_result = n_win ? n_win : 0;
        if (n_docel && (!n_result || (n_result > n_docel)))
            n_result = n_docel;
        return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
    }

}