function renderNumArrayToDom(dom,arr) {
    let sHtml = ''
    arr.map(val => {
        sHtml += `<span style="height:${val}px">${val}</span>`
    });

    dom.innerHTML = sHtml;
}